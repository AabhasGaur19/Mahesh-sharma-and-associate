// src/routes/uploadRoutes.js
const express = require('express');
const { uploadFile } = require('../api/uploadApi');
// const { parseCauselist } = require('../utils/parseCauselist');
const parseCauselist = require('../utils/parseCauselist');

const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Add error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error('Multer error:', err);
    return res.status(400).json({ error: err.message });
  }
  next();
};

router.post('/upload', (req, res, next) => {
  console.log('Upload route hit');
  uploadFile(req, res, (err) => {
    if (err) {
      console.error('Multer upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  console.log('Processing uploaded file...');
  console.log('req.file:', req.file);
  
  if (!req.file) {
    console.error('No file uploaded or invalid file type');
    return res.status(400).json({ error: 'No file uploaded or invalid file type' });
  }

  try {
    const filePath = path.join(__dirname, '../../Uploads', req.file.filename);
    console.log(`Processing file at: ${filePath}`);
    
    // Check if file exists
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!fileExists) {
      console.error(`File not found at: ${filePath}`);
      return res.status(500).json({ error: 'Uploaded file not found' });
    }
    
    const htmlContent = await fs.readFile(filePath, 'utf-8');
    console.log('File read successfully, content length:', htmlContent.length);
    
    const extractedData = parseCauselist(htmlContent);
    console.log('Extracted data count:', extractedData.length);
    
    // Keep file for debugging if no data found
    if (extractedData.length === 0) {
      console.log('No data extracted, keeping file for debugging');
      // Don't delete the file so we can inspect it
    } else {
      // Clean up file
      await fs.unlink(filePath).catch(err => console.error(`Failed to delete file: ${err.message}`));
    }
    
    res.json({ 
      message: extractedData.length > 0 ? 'File processed successfully' : 'File processed but no case data found',
      data: extractedData,
      fileInfo: {
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      debug: {
        contentLength: htmlContent.length,
        hasTable: htmlContent.includes('<table'),
        hasCourt: htmlContent.toLowerCase().includes('court'),
        preview: htmlContent.substring(0, 500)
      }
    });
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to process file: ' + error.message });
  }
});

// Debug endpoint to view HTML structure
router.get('/debug/:filename', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../Uploads', req.params.filename);
    const htmlContent = await fs.readFile(filePath, 'utf-8');
    
    res.json({
      filename: req.params.filename,
      contentLength: htmlContent.length,
      preview: htmlContent.substring(0, 1000),
      hasTable: htmlContent.includes('<table'),
      hasCourt: htmlContent.toLowerCase().includes('court'),
      fullContent: htmlContent // Be careful with large files
    });
  } catch (error) {
    res.status(404).json({ error: 'File not found or cannot be read' });
  }
});

module.exports = router;
