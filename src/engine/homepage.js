const fs = require('fs').promises;
const path = require('path');
const template = require('./template');
const { getFormattedDate } = require('./utils');

module.exports = async (posts) => {
  try {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    const html = template({
      html: `
        <main class="home">
          <div class="home__photo">
            <span class="sr-only">Photo of me at an election day event standing in front of Elizabeth Warren.</span>
          </div>
          <div class="home__content">
            <div class="home__bio">
              <h1 class="sr-only">About Me</h1>
              <p class="home__bio-lede">Heyo-</p>
              <p>I’m Joe, I live in NYC, and this is where I put my thoughts that are too long for Twitter.</p>
              <p>I've previously worked for Elizabeth Warren's 2020 presidential campaign, Blue State, and DoSomething.org.</p>
            </div>
            <div class="home__blog">
              <h2>Ramblings</h2>
              ${sortedPosts.map((post) => `
                <div class="blog-item">
                  <a class="blog-item__title" href="${post.path}">${post.title}</a>
                  <p class="blog-item__description">${post.description}</p>
                  <span class="blog-item__published">${getFormattedDate(post.publishedAt)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </main>
      `,
      head: `
        <link rel="stylesheet" href="/dist/home.css" />
      `,
    });

    const filePath = path.join(__dirname, '../../www/index.html');
    await fs.writeFile(filePath, html);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};
