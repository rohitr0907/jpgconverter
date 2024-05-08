import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import axios from 'axios'

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

  const handleUploadAndDownload = () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('https://jpgconverter.azurewebsites.net/convert', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob' // Tell Axios to expect a blob response
    })
    .then(response => {
      // Create object URL for blob
      const url = URL.createObjectURL(response.data);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted_image.jpg');
      // Simulate click on the link to trigger download
      document.body.appendChild(link);
      link.click();
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Error downloading image:', error);
    });
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
