const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');
const os = require('os');
const routes = require('./routes');
const Response = require('./responses/response.class');

require('dotenv').config();

const app = express();

app.use(cors());

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// catch 404 and forward to error handler
// tidak masuk routes
app.use((_, res) => {
  const response = new Response(res);

  return response.apiNotFound();
});

module.exports = app;
