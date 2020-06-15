function getFormattedDate(publishedAt) {
  const date = new Date(publishedAt);
  const month = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][date.getMonth()];

  return `${month} ${date.getFullYear()}`;
}

module.exports = {
  getFormattedDate,
};
