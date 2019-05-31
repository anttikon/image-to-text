const express = require('express')
const multer = require('multer')
const asyncify = require('express')
const {runLocalCommand} = require('./utils')

const filepath = 'uploads'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${filepath}/`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({storage: storage})
const app = express()
app.async = asyncify(app)

const port = process.env.PORT || 8382

function getFilePaths(originalName) {
  return {
    originalPath: `${filepath}/${originalName}`,
    resultPath: `${filepath}/${originalName}.txt`,
  }
}

app.post('/image', upload.single('image'), async (req, res) => {
  const {originalPath, resultPath} = getFilePaths(req.file.originalname)

  try {
    await runLocalCommand('tesseract', [originalPath, originalPath, '-l', 'fin'])
    const result = await runLocalCommand('cat', [resultPath])

    runLocalCommand('rm', [originalPath])
    runLocalCommand('rm', [resultPath])

    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => console.log(`image-to-text listening on port ${port}!`))
