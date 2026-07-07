const fs = require('fs');
const path = require('path');

function replaceCurrency(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceCurrency(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // replace dollar signs that are followed by numbers or placed in known price UI
      // such as `$${` (template literal with dollar sign) or `$0.00`
      let newContent = content.replace(/\$(?=\d|{)/g, '₹');
      // also replace literal strings like ">$0.00<"
      newContent = newContent.replace(/>\$(.*?)</g, '>₹$1<');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated currency in ${fullPath}`);
      }
    }
  }
}

replaceCurrency(path.join(process.cwd(), 'src'));
