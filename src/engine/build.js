const parser = require('./parser');
const homepage = require('./homepage');
const archive = require('./archive');

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

    const archiveResult = await archive(pages);

    if (archiveResult instanceof Error) {
      throw archiveResult;
    }

    console.log('done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (process.env.PRODUCTION) {
  build();
}

module.exports = build;
