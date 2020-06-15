const fs = require('fs').promises;
const path = require('path');
const template = require('./template');
const { getFormattedDate } = require('./utils');

module.exports = async (posts) => {
  try {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    const rawHomeHtml = await fs.readFile(path.join(__dirname, '../html/home.html'), 'utf-8');

    const formattedHomeHtml = rawHomeHtml
      .replace('<!-- BLOG LINKS -->', sortedPosts.map((post) => `
        <li class="blog-entry">
          <span class="blog-entry__publish-date">${getFormattedDate(post.publishedAt)}</span>
          <a href="${post.path}">
            <p class="blog-entry__title">${post.title}</p>
            <p class="blog-entry__description">${post.description}</p>
          </a>
        </li>
      `).join(''));

    const html = template({
      html: formattedHomeHtml,
      head: `
        <link rel="stylesheet" href="/dist/home.css" />
      `,
      disableNav: true,
      disableFooter: true,
    });

    const filePath = path.join(__dirname, '../../www/index.html');
    await fs.writeFile(filePath, html);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};
