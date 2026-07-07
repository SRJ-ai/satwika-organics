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
      if (content.includes('type: "spring"')) {
        content = content.replace(/type: "spring"/g, 'type: "spring" as const');
        changed = true;
      }
      if (content.includes("type: 'spring'")) {
        content = content.replace(/type: 'spring'/g, 'type: "spring" as const');
        changed = true;
      }
      if (content.includes('type: "tween"')) {
        content = content.replace(/type: "tween"/g, 'type: "tween" as const');
        changed = true;
      }
      if (content.includes("type: 'tween'")) {
        content = content.replace(/type: 'tween'/g, 'type: "tween" as const');
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed ' + fullPath);
      }
    }
  }
}
walk('./src');
