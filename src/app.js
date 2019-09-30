const express = require('express')
const multer = require('multer')
const cryptoRandomString = require('crypto-random-string')
const {runLocalCommand} = require('./utils')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `uploads/`),
  filename: (req, file, cb) => cb(null, `${cryptoRandomString({length: 10})}_${file.originalname}`),
})

const upload = multer({storage: storage, limits: {fileSize: 5000000, fieldNameSize: 25}})
const app = express()

app.post('/image', upload.single('image'), (req, res) =>
  runLocalCommand('tesseract', [req.file.path, 'stdout', '-l', 'fin'])
    .then(data => res.json(data))
    .catch(e => {
      console.error(e)
      res.status(500).end()
    }),
)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).end()
})

const port = process.env.PORT || 8382
app.listen(port, () => console.log(`image-to-text listening on port ${port}!`))
