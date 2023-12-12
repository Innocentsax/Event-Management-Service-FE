import React, { useState } from 'react';
import { CloudinaryUploadWidget } from 'react-cloudinary-uploader';
import cloudinaryConfig from '../cloudinary-config';

const unsignedUploadPreset = 'yltvhbf7';

function FileUpload() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleResponse = (response) => {
    console.log(response.secure_url); 
    setUploadedImageUrl(response.secure_url);
  };

  return (
    <div>
      <CloudinaryUploadWidget
        cloudName={cloudinaryConfig.cloud_name}
        apiKey={cloudinaryConfig.api_key}
        uploadPreset={unsignedUploadPreset}
        accepts="image"
        folder="your-folder-name"
        onUploadSuccess={handleResponse}
      />

      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">
            {uploadedImageUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
