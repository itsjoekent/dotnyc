async function renderer(req, res) {
  res.send('glo0b');
}

module.exports = renderer;

// 1. parse index file from assets
// 2. inject custom meta elements based on path
// 3. inject content based on path
// 4. return markup in response
