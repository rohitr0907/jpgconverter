import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

export default function BoxBasic() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadAndDownload = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await axios.post('https://jpgconverter.azurewebsites.net/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'file.jpg');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Box component="section" sx={{ p: 4, display: "flex", flexDirection: "column", boxShadow: "2", margin: "auto", width: "600px", height: '400px ', textAlign: "center", marginTop: "150px", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", flexGrow: 1 }}>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: "bold", mb: 1 }}>Convert Images to JPG</Typography>
          <Typography variant='body1' sx={{ fontWeight: 500 }}>Transform PNG, GIF, TIF, or to JPG format.</Typography>
          <Typography variant='body2' sx={{ mb: 9, fontWeight: 500 }}>Convert images to JPG online at once.</Typography>
        </Box>
        <Box>
          <Button variant="contained" size="large" onClick={handleUploadButtonClick} sx={{ mt: 1, bgcolor: "CE1717" }}>Upload Images</Button>
          <Typography variant='body2' sx={{ mb: 1 }}>or drop images here</Typography>
          <input type="file" ref={fileInputRef} onChange={handleInputChange} style={{ display: "none" }} />
          <Button variant="contained" size="large" onClick={handleUploadAndDownload} disabled={!selectedFile} sx={{ mt: 1 }}>Convert & Download</Button>
        </Box>
      </Box>
    </Box>
  );
}
