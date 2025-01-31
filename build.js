// build.js
const fs = require('fs');
const path = require('path');

// Define source and destination directories
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Create the dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy files from src to dist
fs.readdirSync(srcDir).forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(distDir, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file} to ${distDir}`);
});

console.log('Build completed!');