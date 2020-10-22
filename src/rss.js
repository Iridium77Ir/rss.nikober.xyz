require('dotenv').config()

const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '15mb', extended: false }))
  
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//RSS stuff

// Require nm module "rss" (node-rss)
var rss = require('rss');

const personalRouter = require('./routes/personal');
router.use('/feed/personal', personalRouter)

app.listen(process.env.PORT);