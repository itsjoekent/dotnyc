const fs = require('fs').promises;
const path = require('path');
const template = require('./template');

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
        <main class="home">
          <div class="home__photo">
            <span class="sr-only">Photo of me at an election day event standing in front of Elizabeth Warren.</span>
          </div>
          <div class="home__content">
            <div class="home__bio">
              <h1 class="sr-only">About Me</h1>
              <p class="home__bio-lede">Heyo-</p>
              <p>I’m Joe, I live in NYC, and I love to work on things that make the world progressively better. You can check out some of my past work <a href="https://www.linkedin.com/in/joe-kent-63170077/">here</a>.</p>
              <p><a href="https://twitter.com/itsjoekent">I tweet a lot if you're the Twitter type</a>, but feel free to also email me <i>(hey at joekent dot nyc)</i> if that's your jam.</p>
            </div>
            <div class="home__blog">
              ${sortedPosts.map((post) => `
                <div class="blog-item">
                  <div class="blog-item__photo">
                    ${post.cover ? `<img src="${post.cover}" alt="${post.coverAlt}" />` : ''}
                  </div>
                  <div class="blog-item__details">
                    <a class="blog-item__title" href="${post.path}">${post.title}</a>
                    <p class="blog-item__description">${post.description}</p>
                    <span class="blog-item__published">${getFormattedDate(post.publishedAt)}</span>
                  </div>
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
