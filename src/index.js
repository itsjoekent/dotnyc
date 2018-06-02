const express = require('express');
const app = express();

app.use(express.static())

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
