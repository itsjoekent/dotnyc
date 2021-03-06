const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

(async function() {
  console.log('watching for changes...');

  const contentDirectory = path.join(__dirname, '../../content');
  const srcDirectory = path.join(__dirname, '../../src');

  function onChange(trigger) {
    try {
      console.log(`${trigger} change detected...`);
      const output = execSync('npm run build:html:local', { stdio: 'inherit' });
    } catch (error) {
      console.error(error);
    }
  }

  fs.watch(contentDirectory, { recursive: true }, () => onChange('content'));
  fs.watch(srcDirectory, { recursive: true }, () => onChange('src'));
})();
