var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();
const upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const cpUpload = upload.single('upfile')
app.post('/api/fileanalyse', cpUpload, function (req, res, next) {
  const file = req.file;

  const responseJson = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  }
  res.send(responseJson);
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
