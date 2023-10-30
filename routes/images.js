const express = require('express')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./../s3')

const app = express()

app.get('./images/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.post('/images', upload,single('image'), async (req,res) => {
  const file = req.file
  console.log(file)
  const result = await uploadFile(file)
  console.log(result)
  const description = req.body.description
  res.send({imagePath: `/images/${result.Key}`})
})