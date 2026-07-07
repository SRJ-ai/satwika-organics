const fs = require('fs');
const path = require('path');

function fixTemplateLiterals(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fixTemplateLiterals(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix broken template literals from the previous script
      let newContent = content.replace(/₹\{/g, '${');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Fixed template literals in ${fullPath}`);
      }
    }
  }
}

fixTemplateLiterals(path.join(process.cwd(), 'src'));
