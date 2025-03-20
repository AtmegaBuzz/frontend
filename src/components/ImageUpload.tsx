import { SetStateAction } from 'jotai';
import React, { useState, ChangeEvent, Dispatch } from 'react';

interface ImageUploadProps {
  onImageSelect?: Dispatch<SetStateAction<File | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imagePreview = e.target?.result as string;
        setCustomImage(selectedFile);
        setCustomImagePreview(imagePreview);
        
        // Call the callback if provided
        if (onImageSelect) {
          onImageSelect(selectedFile);
        }
      };
      
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setCustomImage(null);
    setCustomImagePreview(null);
    
    // Call the callback if provided
    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  return (
    <div className="border-4 border-dashed border-gray-200 rounded-xl p-6 text-center mb-5 hover:border-primary/40 transition-colors">
      {customImagePreview ? (
        <div>
          <img
            src={customImagePreview}
            alt="Preview"
            className="max-w-[200px] max-h-[200px] mb-2 mx-auto rounded-lg border-2 border-gray-100"
          />
          <p className="text-gray-700">{customImage?.name}</p>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Remove Image
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            name="image-upload"
          />
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500 mb-4">
            Drag & drop your image here, or click to browse
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="hidden"
            id="image-upload"
            name="image-upload"
          />
          <label htmlFor="image-upload">
            <button
              type="button"
              onClick={() =>
                document.getElementById("image-upload")?.click()
              }
              className="bg-primary text-white px-5 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Upload Image
            </button>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;