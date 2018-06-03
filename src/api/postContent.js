const Content = require('../lib/Content');

async function postContent(req, res) {
  const { alias, text } = req.body;

  if (! alias || ! text) {
    return res.status(400).json({
      error: true,
      message: 'Missing alias and/or text',
    });
  }

  const content = await Content.upsert(alias, text);
  if (! content) {
    return res.status(400).json({
      error: true,
      message: 'Could not post that content.',
    });
  }

  return res.json({
    success: true,
    data: {
      content,
    },
  })
}

module.exports = postContent;
