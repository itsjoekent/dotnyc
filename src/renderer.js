const fs = require('fs');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, '/assets/index.html'));

async function renderer(req, res) {
  // res.send('glo0b');
  res.set('Content-Type', 'text/html');
  res.send(new Buffer(page));
}

module.exports = renderer;

// 1. parse index file from assets
// 2. inject custom meta elements based on path
// 3. inject content based on path
// 4. return markup in response
