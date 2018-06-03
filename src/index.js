const { join } = require('path');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const connectionUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(connectionUri);

const api = require('./api');
const renderer = require('./renderer');

app.use(express.json());
app.use('/api', api);
// TODO: route for static assets in Mongo
app.use(express.static(join(__dirname, '/assets')));

app.get('*', renderer);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
