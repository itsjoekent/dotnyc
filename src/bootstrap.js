const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');

const CLIENT_PATH = path.join(__dirname, '../client');
const ASSETS_PATH = path.join(__dirname, '/assets');

const pipeline = `
  cd ${CLIENT_PATH} &&
  npm install &&
  npm run build
  cp -R ${path.join(CLIENT_PATH, '/build')}/* ${ASSETS_PATH}
`;

const pipelineProcess = cmd.get(pipeline, (err, data, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Bootstrapped app successfully!');
  }

  process.exit();
});

let log = '';
pipelineProcess.stdout.on('data', (data) => {
  log += data;

  if (log[log.length - 1] === '\n') {
    console.log(log);
    log = '';
  }
});
