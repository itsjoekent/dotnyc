const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const post = require('./post');

const markdown = new MarkdownIt({
  html: true,
});

async function buildPage(pagePath) {
  console.log(`building /${pagePath}...`);

  try {
    const directory = path.join(__dirname, '../../content', pagePath);
    const content = await fs.readFile(path.join(directory, 'content.md'), 'utf8');
    const meta = await fs.readFile(path.join(directory, 'meta.json'), 'utf8');

    const metadata = JSON.parse(meta);

    const { publishedAt = null } = metadata;

    if (!publishedAt && process.env.PRODUCTION_BUILD) {
      console.log(`Skipping /${pagePath} because it's not published.`);
      return;
    }

    const html = post({ ...metadata, html: markdown.render(content) });

    const htmlDirectory = path.join(__dirname, '../../www/', pagePath);

    try { await fs.mkdir(htmlDirectory); } catch (error) {}

    await fs.writeFile(path.join(htmlDirectory, 'index.html'), html);

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

    return pages;
  } catch (error) {
    console.error(error);
    return error;
  }
}
