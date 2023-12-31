import React from 'react';


interface ImageUploadProps {
    selectedFile: File | null;
    fileSelectedHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileUploadHandler: () => void;
  }
  


function ImageUpload({ selectedFile, fileSelectedHandler, fileUploadHandler }: ImageUploadProps) {
  return (
    <div className='imageupload'>
      {selectedFile && (
        <img
          className="user-image"
          src={URL.createObjectURL(selectedFile)}
          alt="Profile"
        />
      )}
        <input className='file' title='imgSelect' type="file" onChange={fileSelectedHandler} />
      <button className="uploadImg" onClick={fileUploadHandler}>
        Upload Image
      </button>
    </div>
  );
}

export default ImageUpload;
