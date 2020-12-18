const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const download = require('download');

async function downloadS3Files(contents) {
  try {
    await Promise.all(contents.map(async ({ Key }) => {
      console.log(`Downloading "${Key}"`);
      
      const remotePath = `https://itsjoekent.s3.amazonaws.com/${Key}`;
      const folderPath = `www/${Key.split('/').slice(0, -1).join('/')}`;

      await download(remotePath, folderPath);
    }));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function pullS3Files(params) {
  try {
    console.log(`Pulling file list for "${params.Prefix}"`);

    const { Contents: contents } = await s3.listObjects(params).promise();
    await downloadS3Files(contents);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

(async function downloadMedia() {
  try {
    console.log('Pulling media indexes...');

    const params = {
      Bucket: 'itsjoekent',
      Delimiter: '/',
      Prefix: 'assets/',
    };

    const {
      CommonPrefixes: commonPrefixes,
      Contents: contents,
    } = await s3.listObjects(params).promise();

    await downloadS3Files(contents);

    await Promise.all(commonPrefixes.map((subfolder) => pullS3Files({
      ...params,
      ...subfolder,
    })));

    console.log('Done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
