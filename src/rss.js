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

import { Feed } from "feed";

const feed = new Feed({
  title: "Personal Feed",
  description: "This is my personal feed!",
  id: "http://rss.nikober.xyz/personal/",
  link: "http://rss.nikober.xyz/",
  language: "en",
  copyright: "All rights reserved 2013, John Doe",
  updated: new Date(2013, 6, 14), // optional, default = today
  generator: "awesome", // optional, default = 'Feed for Node.js'
  author: {
    name: "Niklas Oberhuber"
  }
});

posts.forEach(post => {
    feed.addItem({
      title: "test",
      id: "test",
      link: "test",
      description: "test",
      content: "test"
    });
});

app.listen(process.env.PORT)