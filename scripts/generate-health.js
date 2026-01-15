const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const pkg = require('../package.json');

let commit = null;
try {
  commit = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  commit = null;
}

const out = {
  status: 'ok',
  timestamp: new Date().toISOString(),
  service: pkg.name || 'x-book-smart-publisher',
  version: pkg.version || null,
  commit: commit
};

const outDir = path.resolve(__dirname, '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'health.json'), JSON.stringify(out, null, 2));
console.log('Generated dist/health.json', out);
