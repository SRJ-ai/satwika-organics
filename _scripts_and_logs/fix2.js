const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      const regex = /ease:\s*([\"'][a-zA-Z]+[\"'])(?! as const)/g;
      if (regex.test(content)) {
        content = content.replace(regex, 'ease: $1 as const');
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed ease typings in ' + fullPath);
      }
    }
  }
}
walk('./src');
