import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

// Extend the HTMLInputElement interface to include directory attributes
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // Add non-standard directory attributes
    directory?: string;
    webkitdirectory?: string;
  }
}

// Type extension for File to include webkitRelativePath
interface FileWithPath extends File {
  webkitRelativePath: string;
}

// Tree structure interfaces
interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children: FileNode[];
  level: number;
}

interface IPFSUploadResult {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

// TypeScript interface for component props
interface FolderUploadComponentProps {
  onFolderSelect?: (files: FileList | null) => void;
  onIPFSUpload?: (result: IPFSUploadResult | null) => void;
  pinataJWT?: string; // Pinata JWT token
}

// This component is specifically configured for Vite + React + TypeScript with IPFS support
const IPFSFolderUploadComponent: React.FC<FolderUploadComponentProps> = ({ 
  onFolderSelect, 
  onIPFSUpload,
  pinataJWT 
}) => {
  // State with proper typing
  const [selectedFolder, setSelectedFolder] = useState<FileList | null>(null);
  const [folderName, setFolderName] = useState<string>('');
  const [fileCount, setFileCount] = useState<number>(0);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [ipfsResult, setIpfsResult] = useState<IPFSUploadResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Ref with proper typing
  const fileInputRef = useRef<HTMLInputElement>(null);

  const buildFileTree = (files: FileList): FileNode[] => {
    // Create the root node object that will hold all root level files/folders
    const rootDirs: { [key: string]: FileNode } = {};

    // Process each file to build the tree
    Array.from(files).forEach((file) => {
      const path = (file as FileWithPath).webkitRelativePath;
      const pathParts = path.split('/');

      // Skip empty files or paths
      if (pathParts.length === 0) return;

      // Get root directory name
      const rootDirName = pathParts[0];

      // Initialize the root directory if it doesn't exist
      if (!rootDirs[rootDirName]) {
        rootDirs[rootDirName] = {
          name: rootDirName,
          path: rootDirName,
          isDirectory: true,
          children: [],
          level: 0
        };
      }

      // If this is a file directly in the root directory
      if (pathParts.length === 2) {
        const fileName = pathParts[1];
        rootDirs[rootDirName].children.push({
          name: fileName,
          path: path,
          isDirectory: false,
          children: [],
          level: 1
        });
        return;
      }

      // Handle nested directories and files
      let currentNode = rootDirs[rootDirName];
      let currentPath = rootDirName;

      // Start from index 1 (skip the root dir) and go up to the second last element (which is the file)
      for (let i = 1; i < pathParts.length - 1; i++) {
        const dirName = pathParts[i];
        currentPath = `${currentPath}/${dirName}`;

        // Find if this directory already exists in the current node's children
        let dirNode = currentNode.children.find(child =>
          child.isDirectory && child.name === dirName
        );

        // If not, create it
        if (!dirNode) {
          dirNode = {
            name: dirName,
            path: currentPath,
            isDirectory: true,
            children: [],
            level: i
          };
          currentNode.children.push(dirNode);
        }

        // Move to this directory for the next iteration
        currentNode = dirNode;
      }

      // Add the file to the last directory
      const fileName = pathParts[pathParts.length - 1];
      if (fileName) {
        currentNode.children.push({
          name: fileName,
          path: path,
          isDirectory: false,
          children: [],
          level: pathParts.length - 1
        });
      }
    });

    // Sort the tree: directories first, then files, both alphabetically
    const sortTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      }).map(node => {
        if (node.children.length > 0) {
          node.children = sortTree(node.children);
        }
        return node;
      });
    };

    // Convert the root object to a sorted array of FileNodes
    return sortTree(Object.values(rootDirs));
  };

  const handleFolderChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    
    // Reset upload states
    setIsUploading(false);
    setUploadProgress(0);
    setIpfsResult(null);
    setUploadError(null);

    if (files && files.length > 0) {
      // Get folder name from the path of the first file
      // Use type assertion to access webkitRelativePath
      const path = (files[0] as FileWithPath).webkitRelativePath;
      const folderName = path.split('/')[0];

      // Build the file tree
      const tree = buildFileTree(files);

      setSelectedFolder(files);
      setFolderName(folderName);
      setFileCount(files.length);
      setFileTree(tree);

      // Call the callback if provided
      if (onFolderSelect) {
        onFolderSelect(files);
      }
    }
  };

  const handleRemoveFolder = (): void => {
    setSelectedFolder(null);
    setFolderName('');
    setFileCount(0);
    setFileTree([]);
    setIsUploading(false);
    setUploadProgress(0);
    setIpfsResult(null);
    setUploadError(null);

    // Reset the file input using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Call the callback if provided
    if (onFolderSelect) {
      onFolderSelect(null);
    }
    if (onIPFSUpload) {
      onIPFSUpload(null);
    }
  };

  const uploadToIPFS = async (): Promise<void> => {
    if (!selectedFolder || !pinataJWT) {
      setUploadError('No folder selected or missing Pinata JWT token');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Create a FormData instance to send the files
      const formData = new FormData();
      
      // Append metadata
      const metadata = JSON.stringify({
        name: folderName,
        keyvalues: {
          uploadDate: new Date().toISOString(),
          fileCount: fileCount
        }
      });
      formData.append('pinataMetadata', metadata);
      
      // Optional pinata options
      const options = JSON.stringify({
        cidVersion: 1,
        wrapWithDirectory: true
      });
      formData.append('pinataOptions', options);
      
      // Append all files to formData with their relative paths
      Array.from(selectedFolder).forEach((file, index) => {
        const filePath = (file as FileWithPath).webkitRelativePath;
        // Ensure all files are under the same root folder name
        formData.append('file', file, filePath);
        
        // Update progress
        const progress = Math.round(((index + 1) / fileCount) * 90); // Cap at 90% for network time
        setUploadProgress(progress);
      });
      
      // Make the upload request to Pinata
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${pinataJWT}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            // Calculate progress for larger files during upload
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(Math.min(progress, 99)); // Cap at 99% until complete
            }
          }
        }
      );
      
      // Update state with the result
      setIpfsResult(response.data);
      setUploadProgress(100);
      
      // Call the callback if provided
      if (onIPFSUpload) {
        onIPFSUpload(response.data);
      }
    } catch (error) {
      console.error('IPFS upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  // Recursively render the file tree
  const renderFileTree = (nodes: FileNode[]): JSX.Element[] => {
    return nodes.map((node) => (
      <div key={node.path} className="file-tree-item">
        <div
          className={`flex items-center py-1 hover:bg-gray-100 rounded px-1 ${node.isDirectory ? 'font-medium' : ''}`}
          style={{ paddingLeft: `${node.level * 12}px` }}
        >
          {node.isDirectory ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          )}
          <span className="truncate text-sm" title={node.path}>
            {node.name}
          </span>
        </div>
        {node.children.length > 0 && renderFileTree(node.children)}
      </div>
    ));
  };

  return (
    <div className="border-4 border-dashed border-gray-200 rounded-xl p-6 text-center mb-5 hover:border-primary/40 transition-colors">
      {selectedFolder ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-primary mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <p className="text-gray-700 font-medium mb-1">{folderName}</p>
          <p className="text-gray-500 mb-2">{fileCount} files selected</p>

          {/* IPFS Upload Status */}
          {ipfsResult && (
            <div className="mb-3 p-3 bg-green-50 rounded-lg text-left">
              <p className="font-medium text-green-700">Successfully uploaded to IPFS!</p>
              <p className="text-sm text-green-600 break-all">
                <span className="font-medium">IPFS Hash:</span> {ipfsResult.IpfsHash}
              </p>
              <p className="text-sm text-green-600">
                <span className="font-medium">Size:</span> {(ipfsResult.PinSize / 1024).toFixed(2)} KB
              </p>
              <p className="text-sm text-green-600">
                <a 
                  href={`https://gateway.pinata.cloud/ipfs/${ipfsResult.IpfsHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on IPFS Gateway
                </a>
              </p>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="mb-3 p-3 bg-red-50 rounded-lg text-left">
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          )}

          {/* Scrollable file tree */}
          <div className="border rounded-md bg-gray-50 max-h-60 overflow-y-auto my-3 text-left">
            <div className="p-2">
              {fileTree.length > 0 ? (
                renderFileTree(fileTree)
              ) : (
                <p className="text-gray-500 text-sm p-2">Loading file structure...</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 justify-center">
            {!isUploading && !ipfsResult && (
              <button
                type="button"
                onClick={uploadToIPFS}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                disabled={!pinataJWT}
              >
                Upload to IPFS
              </button>
            )}
            <button
              type="button"
              onClick={handleRemoveFolder}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              disabled={isUploading}
            >
              {ipfsResult ? 'Select Another Folder' : 'Remove Folder'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <p className="text-gray-500 mb-4">
            Click to select a folder to upload to IPFS
          </p>
          <input
            type="file"
            // Using the webkitdirectory attribute for browser compatibility
            webkitdirectory=""
            // The directory attribute is non-standard but added for broader support
            directory=""
            multiple
            onChange={handleFolderChange}
            required
            className="hidden"
            id="folder-upload"
            name="folder-upload"
            ref={fileInputRef}
          />
          <label htmlFor="folder-upload">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-white px-5 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Select Folder
            </button>
          </label>
        </div>
      )}
    </div>
  );
};

export default IPFSFolderUploadComponent;