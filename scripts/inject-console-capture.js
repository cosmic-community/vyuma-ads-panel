const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    } else if (content.includes('<body>')) {
      content = content.replace('<body>', `<body>\n  ${scriptTag}`);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Injected console capture script into ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findHtmlFiles(fullPath, files);
    } else if (stat.isFile() && item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const buildDir = path.join(process.cwd(), '.next');
if (fs.existsSync(buildDir)) {
  const htmlFiles = findHtmlFiles(buildDir);
  htmlFiles.forEach(injectScript);
  console.log(`✅ Console capture script injection complete (${htmlFiles.length} files)`);
} else {
  console.log('Build directory not found. Run this script after building.');
}