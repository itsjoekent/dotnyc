const fs = require('fs').promises;
const path = require('path');
const template = require('./template');
const { nav, style } = require('./commonHtml');

function getFormattedDate(publishedAt) {
  const date = new Date(publishedAt);
  const month = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
  ][date.getMonth()];

  return `${month} ${date.getFullYear()}`;
}

module.exports = async (posts) => {
  try {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    const html = template({
      html: `
        ${nav}
        <main class="archive">
          <div class="archive__container">
            <h1 class="archive__title">Read my ramblings.</h1>
            ${sortedPosts.map((post) => `
              <div class="archive-item">
                <div class="archive-item__photo">
                  ${post.cover ? `<img src="${post.cover}" alt="${post.coverAlt}" />` : ''}
                </div>
                <div class="archive-item__details">
                  <a class="archive-item__title" href="${post.path}">${post.title}</a>
                  <p class="archive-item__description">${post.description}</p>
                  <span class="archive-item__published">${getFormattedDate(post.publishedAt)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </main>
      `,
      head: `
        <link rel="stylesheet" href="/dist/archive.css" />
        ${style}
      `,
    });

    const htmlDirectory = path.join(__dirname, '../../www/archive');

    try { await fs.mkdir(htmlDirectory); } catch (error) {}

    await fs.writeFile(path.join(htmlDirectory, 'index.html'), html);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};
