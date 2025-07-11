const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// Serve /gallery folder
app.use('/gallery', express.static(path.join(__dirname, 'gallery')));

// API to get all media files
app.get('/gallery-data', (req, res) => {
  const galleryPath = path.join(__dirname, 'gallery');

  fs.readdir(galleryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read gallery folder' });
    }
    // Send only files (ignore folders)
    const mediaFiles = files.filter(file => !fs.lstatSync(path.join(galleryPath, file)).isDirectory());
    res.json(mediaFiles);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
