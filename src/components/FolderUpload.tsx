import React, { useState, useRef, ChangeEvent, useEffect } from 'react';

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

// TypeScript interface for component props
interface FolderUploadComponentProps {
  onFolderSelect?: (files: FileList | null) => void;
}

// This component is specifically configured for Vite + React + TypeScript
const FolderUploadComponent: React.FC<FolderUploadComponentProps> = ({ onFolderSelect }) => {
  // State with proper typing
  const [selectedFolder, setSelectedFolder] = useState<FileList | null>(null);
  const [folderName, setFolderName] = useState<string>('');
  const [fileCount, setFileCount] = useState<number>(0);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

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

    // Reset the file input using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Call the callback if provided
    if (onFolderSelect) {
      onFolderSelect(null);
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


  useEffect(()=> {
    console.log(fileTree)
  }, [fileTree])

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

          <button
            type="button"
            onClick={handleRemoveFolder}
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Remove Folder
          </button>
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
            Click to select a folder to upload
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

export default FolderUploadComponent;