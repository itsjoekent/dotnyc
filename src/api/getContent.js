const Content = require('../lib/Content');

async function getContent(req, res) {
  const { alias } = req.params;
  const content = await Content.findByAlias(alias);

  if (! content) {
    return res.status(404).json({
      error: true,
      message: 'Content not found',
    });
  }

  return res.json({
    success: true,
    data: {
      content,
    },
  });
}

module.exports = getContent;
