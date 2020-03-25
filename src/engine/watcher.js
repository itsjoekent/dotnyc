const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

(async function() {
  console.log('watching for changes...');

  const contentDirectory = path.join(__dirname, '../../content');
  const srcDirectory = path.join(__dirname, '../../src');

  function onChange(trigger) {
    console.log(`${trigger} change detected...`);
    const output = execSync('npm run build:html');
    console.log(output.toString('utf8'));
  }

  fs.watch(contentDirectory, { recursive: true }, () => onChange('content'));
  fs.watch(srcDirectory, { recursive: true }, () => onChange('src'));
})();
