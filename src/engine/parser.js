const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const request = require('request');
const extract = require('extract-zip')
const post = require('./post');

const markdown = new MarkdownIt({
  html: true,
});

markdown.use(require('markdown-it-anchor'), {
  level: 2,
});

async function downloadMicroSite(remotePath, htmlDirectory) {
  return new Promise((resolve, reject) => {
    request(remotePath)
      .pipe(require('fs').createWriteStream(path.join(htmlDirectory, 'micro.zip')))
      .on('close', resolve)
      .on('error', reject);
  });
}

async function buildPage(pagePath) {
  console.log(`building /${pagePath}...`);

  try {
    const directory = path.join(__dirname, '../../content', pagePath);
    const htmlDirectory = path.join(__dirname, '../../www/', pagePath);

    const meta = await fs.readFile(path.join(directory, 'meta.json'), 'utf8');

    const metadata = JSON.parse(meta) || {};

    if (metadata.micro) {
      if (process.env.PRODUCTION) {
        try { await fs.mkdir(htmlDirectory); } catch (error) {}

        console.log(`Downloading ${metadata.micro} ...`);
        await downloadMicroSite(metadata.micro, htmlDirectory);

        console.log(`Extracting ${metadata.micro} ...`);
        await extract(path.join(htmlDirectory, 'micro.zip'), { dir: htmlDirectory });
      } else {
        console.log(`Not rendering /${pagePath} because it's a micro site & this is development mode.`);
      }

      return { ...metadata, path: pagePath };
    }

    const content = await fs.readFile(path.join(directory, 'content.md'), 'utf8');
    const { publishedAt = null, hide = false } = metadata;

    if (!hide && !publishedAt && process.env.PRODUCTION) {
      console.log(`Skipping /${pagePath} because it's not published.`);
      return null;
    }

    const html = post({ ...metadata, html: markdown.render(content) });

    try { await fs.mkdir(htmlDirectory); } catch (error) {}

    await fs.writeFile(path.join(htmlDirectory, 'index.html'), html);

    if (hide) {
      return null;
    }

    return { ...metadata, path: pagePath };
  } catch (error) {
    console.error(`Encountered error with /${pagePath}...`);
    console.error(error);
    return error;
  }
}

module.exports = async function parse() {
  try {
    const pageDirectories = await fs.readdir(path.join(__dirname, '../../content'));

    const builds = pageDirectories.map((pagePath) => buildPage(pagePath));

    const pages = await Promise.all(builds);

    return pages.filter((page) => !!page);
  } catch (error) {
    console.error(error);
    return error;
  }
}
