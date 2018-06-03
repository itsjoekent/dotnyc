const { WRITE_KEY } = process.env;

function auth(req, res, next) {
  const { key } = req.body;

  if (WRITE_KEY !== key) {
    return res.status(401).json({
      error: true,
      message: 'nice try.',
    });
  }

  next();
}

module.exports = auth;
