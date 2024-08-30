import React from "react";
import FileUpload from "../file-upload/FileUpload";

const ReachOutLayout: React.FC = () => {
  return (
    <div>
      <FileUpload onFileSelect={(file) => console.log(file)} />
    </div>
  );
};

export default ReachOutLayout;
