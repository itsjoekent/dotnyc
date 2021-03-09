const parser = require('./parser');
const homepage = require('./homepage');

async function build() {
  try {
    console.log('building pages...');
    const pages = await parser();

    if (pages instanceof Error) {
      throw pages;
    }

    pages.forEach((page) => {
      if (page instanceof Error) {
        throw page;
      }
    });

    console.log('building homepage...');

    const homeResult = await homepage(pages);

    if (homeResult instanceof Error) {
      throw homeResult;
    }

    console.log('done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (process.env.PRODUCTION || process.env.DEVELOPMENT) {
  build();
}

module.exports = build;
