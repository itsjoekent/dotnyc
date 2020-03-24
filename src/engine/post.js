const template = require('./template');

module.exports = ({ html, ...meta }) => template({
  ...meta,
  head: `
    <link rel="stylesheet" href="/dist/post.css" />
    <link rel="stylesheet" href="/dist/layout.css" />
  `,
  html: `
    <nav>
      <a href="/" aria-label="Back home">
        <img src="/assets/arrow.png" alt="Arrow pointing left" />
        <span>Back home</span>
      </a>
    </nav>
    <main class="post">
      <h1>${meta.title}</h1>
      <div class="post__byline">
        <p>by Joe Kent</p>
        <span>${meta.publishedAt}</span>
      </div>
      <div class="post__content">
        ${html}
      </div>
    </main>
    <footer>
      <div class="footer__cta">
        <p>follow me on twitter, <i>for a treat.</i></p>
        <a href="https://twitter.com/itsjoekent">follow me</a>
      </div>
    </footer>
  `,
});
