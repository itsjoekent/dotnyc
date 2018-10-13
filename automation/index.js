const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const contentDirectory = path.join(process.cwd(), '/public/content');
const contentIndexPath = path.join(process.cwd(), '/src/contentIndex.json');

const acceptedImages = ['png', 'jpg', 'jpeg'];
const blurPrefix = '_blur_';

const spaces = fs.readdirSync(contentDirectory)
  .map(fileName => ({
    fileName,
    fullPath: path.join(contentDirectory, fileName),
  }))
  .filter(({ fullPath }) => fs.lstatSync(fullPath).isDirectory());

spaces.forEach(async (space) => {
  const { fileName, fullPath } = space;
  const postPath = path.join(fullPath, './post.md');
  const metaPath = path.join(fullPath, './meta.json');

  if (! fs.existsSync(postPath)) {
    throw new Error(`${fileName} is missing a 'post.md' file.`);
  }

  if (! fs.existsSync(metaPath)) {
    throw new Error(`${fileName} is missing a 'meta.json' file.`);
  }

  const meta = require(metaPath);

  if (! meta.path) {
    throw new Error(`${fileName} is missing a 'path' property in it's meta file.`);
  }

  const contentIndex = require(contentIndexPath);
  const entries = (contentIndex.entries || [])
    .filter(entry => entry.directory !== fileName);

  entries.push({
    directory: fileName,
    route: {
      path: meta.path,
      exact: meta.exact || false,
    },
  });

  const updatedContentIndex = {
    ...contentIndex,
    entries,
  };

  fs.writeFileSync(contentIndexPath, JSON.stringify(updatedContentIndex, null, 2));

  const images = fs.readdirSync(fullPath)
    .filter(imageName =>
      ! imageName.startsWith(blurPrefix) &&
      acceptedImages.includes(imageName.split('.').pop())
    );

  for (const image of images) {
    const imagePath = path.join(fullPath, image);

    const blurImage = await Jimp.read(imagePath);
    const blurPath = path.join(fullPath, `${blurPrefix}${image}`);
    await blurImage.scale(0.01).blur(2).writeAsync(blurPath);
  }
});
