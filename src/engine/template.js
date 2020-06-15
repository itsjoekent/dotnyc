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
  disableNav = false,
  disableFooter = false,
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
    ${disableNav ? '' : `
      <nav>
        <a href="/" aria-label="Go back to the homepage"></a>
      </nav>
    `}
    ${html}
    ${disableFooter ? '' : `<footer> <!-- TODO --> </footer>`}
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
