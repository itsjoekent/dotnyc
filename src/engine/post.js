const template = require('./template');
const { getFormattedDate } = require('./utils');

module.exports = ({ html, ...meta }) => template({
  ...meta,
  head: `
    <link rel="stylesheet" href="/dist/post.css" />
  `,
  html: `
    <main class="post">
      <h1 class="post__title">${meta.title}</h1>
      ${!!meta.publishedAt ? `
        <div class="post__byline">
          <p>by Joe Kent, ${getFormattedDate(meta.publishedAt)}</p>
        </div>
      `: ''}
      <div class="post__content">
        ${html}
      </div>
    </main>
  `,
  footer: `
    <script src="/dist/playlist.js"></script>
  `,
});
