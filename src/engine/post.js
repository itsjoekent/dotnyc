const template = require('./template');
const { nav, style } = require('./commonHtml');

module.exports = ({ html, ...meta }) => template({
  ...meta,
  head: `
    <link rel="stylesheet" href="/dist/post.css" />
    ${style}
  `,
  html: `
    ${nav}
    <main class="post">
      <h1 class="post__title">${meta.title}</h1>
      <div class="post__byline">
        <p>by Joe Kent</p>
        <span>${meta.publishedAt}</span>
      </div>
      <div class="post__content">
        ${html}
      </div>
    </main>
  `,
});
