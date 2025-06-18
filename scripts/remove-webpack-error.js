const fs = require('fs');
const path = require('path');

const targetDir = path.resolve('node_modules/.pnpm');
const contentToRemove =
  /if\s*\(!\(compilation\s+instanceof\s+Compilation\)\)\s*{\s*throw\s+new\s+TypeError\s*\(\s*"The 'compilation' argument must be an instance of Compilation"\s*\);\s*}/gm;

function processDirectory(dirPath) {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (
      entry.isDirectory() &&
      (entry.name.startsWith('webpack') || fullPath.includes('webpack'))
    ) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name === 'ModuleFederationPlugin.js') {
      processFile(fullPath);
    }
  });
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    if (contentToRemove.test(content)) {
      const newContent = content.replace(contentToRemove, '');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Successfully removed webpack error: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error while processing file ${filePath}:`, err.message);
  }
}

processDirectory(targetDir);
