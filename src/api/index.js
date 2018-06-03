const express = require('express');
const router = express.Router();

const auth = require('./auth');
const postContent = require('./postContent');
const getContent = require('./getContent');

/**
 * Wrap an async api function in a special try/catch
 * that also handles sending error responses.
 *
 * @param  {Function} fn Async route function
 * @return {Function}    Wrapped route function
 */
function catchApiErrors(fn) {
  return function(req, res) {
    return fn(req, res).catch((err) => {
      console.error(err);

      const errorResponse = {
        error: true,
        message: 'Dammit my site had an error. But I promise this thing still works better than the MTA.',
      };

      if (process.env.NODE_ENV === 'development') {
        errorResponse.nodeError = err;
      }

      res.status(500).json(errorResponse);
    });
  }
}

router.get('/', (req, res) => {
  res.json({ ok: true });
});

router.get('/content/:alias', catchApiErrors(getContent));
router.post('/content', auth, catchApiErrors(postContent));

module.exports = router;
