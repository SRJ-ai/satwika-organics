const fs = require('fs');
const path = require('path');

const replacements = [
  { file: 'src/app/(public)/cart/page.tsx', regex: /✕/g, replace: 'X' },
  { file: 'src/app/(public)/cart/page.tsx', regex: /🎉/g, replace: '' },
  { file: 'src/app/(public)/catalog/page.tsx', regex: /🔍/g, replace: '' },
  { file: 'src/app/(public)/checkout/page.tsx', regex: /📦|💳|✓/g, replace: '' },
  { file: 'src/app/(public)/checkout/success/page.tsx', regex: /🎉/g, replace: '' },
  { file: 'src/app/(public)/product/[id]/page.tsx', regex: /🛡|🚚/g, replace: '' },
  { file: 'src/app/admin/layout.tsx', regex: /🌿/g, replace: '' },
  { file: 'src/app/admin/products/page.tsx', regex: /🥥|🌿|🍯|🥬|🌶|📦/g, replace: '' },
  { file: 'src/app/customer/layout.tsx', regex: /🌿/g, replace: '' },
  { file: 'src/app/customer/orders/page.tsx', regex: /✅|🚚|⏳|📦/g, replace: '' },
  { file: 'src/components/layout/footer.tsx', regex: /🌿/g, replace: '' },
];

replacements.forEach(({ file, regex, replace }) => {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (regex.test(content)) {
      content = content.replace(regex, replace);
      fs.writeFileSync(fullPath, content);
      console.log(`Removed emojis in ${file}`);
    }
  }
});
