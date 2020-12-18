const defaultCover = '/assets/background-wide.jpg';

function makeCoverImageUrl(cover) {
  if (cover.startsWith('/')) {
    return `https://joekent.nyc${cover}`;
  }

  return cover;
}

module.exports = ({
  title = 'Joe Kent',
  description = 'hi i’m Joe! a self-taught software engineer based out of NYC.',
  cover = defaultCover,
  coverAlt = 'Photo of me at an election day event standing in front of Elizabeth Warren.',
  html = '',
  head = '',
  footer = '',
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
    <link rel="preload" href="/assets/pizza-rat.gif" as="image">
    <link rel="stylesheet" href="/dist/main.css" />
    <link rel="stylesheet" href="/dist/layout.css" />
    ${head}
  </head>
  <body>
    <nav>
      <a class="nav-home" href="/" aria-label="Go back to the homepage"></a>
      <div class="nav-menu">
        <a class="nav-twitter" href="https://twitter.com/itsjoekent">@itsjoekent</a>
        <a class="nav-email" data-copy>hey@joekent.nyc</a>
      </div>
    </nav>
    ${html}
    <footer>
      Made in NYC · Pizza Rats LLC
    </footer>
    <script src="/dist/copy.js"></script>
    ${footer}
  </body>
  <!-- Made with a custom blog engine thing. Fork me on Github! -->
  <!-- https://github.com/itsjoekent/dotnyc -->
</html>
`;
