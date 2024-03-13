import 'express-async-errors';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000

// Middleware for logging request body
// app.use((req, res, next) => {
//   console.log('Request Body:', req.body)
//   next()
// })

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

import routes from './routes/index.js'
app.use(routes)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// Middleware for handling JSON parsing errors
// app.use((error, req, res, next) => {
//   if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
//     return res.status(400).json({ error: 'Invalid JSON' })
//   }
//   next()
// })

try {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
