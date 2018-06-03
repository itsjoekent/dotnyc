/**
 * Wrap an async function in a catch statement.
 *
 * @param  {Function} fn Actual function to call
 * @return {Function}
 */
function catchErrors(fn) {
  return function(...args) {
    return fn(...args).catch((err) => {
      if (typeof err === 'object') {
        console.error(err.stack);
      } else if (err) {
        console.error(err);
      } else {
        console.error('error without message thrown');
        console.trace();
      }
    });
  }
}
