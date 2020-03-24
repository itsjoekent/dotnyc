module.exports = ({
  title = 'Joe Kent\'s blog',
  description = 'I’m Joe, I live in NYC, and I love to work on things that make the world progressively better.',
  cover = '/assets/background-wide.jpg',
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
    <meta property="og:image" content="${cover}" />
    <meta property="og:description" content="${description}" />
    <link rel="stylesheet" href="/dist/main.css" />
    ${head}
  </head>
  <body>
    ${html}
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
