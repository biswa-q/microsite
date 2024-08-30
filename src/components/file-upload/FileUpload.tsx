import React, { useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
  };

  const submit = () => {};

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 rounded-lg">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {!selectedFile ? (
        <label
          htmlFor="file-upload"
          className="cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Choose a file
        </label>
      ) : (
        <div className="flex flex-col items-center">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
          )}
          <p className="text-gray-600">{selectedFile.name}</p>
          <div className="flex justify-end w-full mt-[24px]">
            <button
              onClick={handleFileDelete}
              className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition mr-[24px]"
            >
              Delete File
            </button>
            <button
              onClick={submit}
              className="mt-2 py-2 px-4 bg-[#111] text-white rounded  transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
