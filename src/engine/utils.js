function getFormattedDate(publishedAt) {
  const date = new Date(publishedAt);
  const month = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
  ][date.getMonth()];

  return `${month} ${date.getFullYear()}`;
}

module.exports = {
  getFormattedDate,
};
