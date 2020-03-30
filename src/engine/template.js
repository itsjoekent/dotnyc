const defaultCover = '/assets/background-wide.jpg';

function makeCoverImageUrl(cover) {
  if (cover.startsWith('/')) {
    return `https://joekent.nyc${cover}`;
  }

  return cover;
}

module.exports = ({
  title = 'Joe Kent',
  description = 'I’m Joe, I live in NYC, and this is where I put my ramblings too long for Twitter.',
  cover = defaultCover,
  coverAlt = 'Photo of me at an election day event standing in front of Elizabeth Warren.',
  html = '',
  head = '',
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#166197" />
    <meta property="og:image" content="${makeCoverImageUrl(cover)}" />
    <meta property="og:description" content="${description}" />
    <meta property="twitter:card" content="${cover === defaultCover ? 'summary' : 'summary_large_image'}" />
    <meta property="twitter:site" content="@itsjoekent" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${makeCoverImageUrl(cover)}" />
    <link rel="stylesheet" href="/dist/main.css" />
    <link rel="stylesheet" href="/dist/layout.css" />
    ${head}
  </head>
  <body>
    <nav>
      <a href="/" aria-label="Back home">
        joekent.nyc
      </a>
    </nav>
    ${html}
    <footer>
      <p class="footer__title">Follow me:</p>
      <div class="footer__links">
        <a href="https://twitter.com/itsjoekent">twitter</a>
        <a href="https://github.com/itsjoekent">github</a>
        <a href="https://www.instagram.com/itsjoekent/">instagram</a>
        <a href="https://www.linkedin.com/in/joe-kent-63170077/">linkedin</a>
      </div>
      <p class="footer__title">Get in touch:</p>
      <p class="footer__email">hey@joekent.nyc</p>
    </footer>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-161759002-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-161759002-1');
    </script>
  </body>
  <!-- Made with a custom blog engine thing. Fork me on Github! -->
  <!-- https://github.com/itsjoekent/dotnyc -->
</html>
`;
