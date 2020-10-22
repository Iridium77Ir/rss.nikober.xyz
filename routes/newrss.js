const express = require('express')
const app = express()
const router = express.Router()
const Post = require('../models/rss')

router.get('/', async (req, res) => {
    if(checkCookie(req) == false) {
        res.redirect('/');
    }
    try {
        res.render('new')
    } catch (err) {
       res.redirect('/') 
    }  
    
})

router.post('/', async (req, res) => {
    var newrss = new Post({
        subject: req.body.subject,
        summary: req.body.summary,
        content: req.body.content
    })
    try {
        const newRss = await newrss.save();
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

function checkCookie(req) {
    if(req.signedCookies['loggedin'] == "true") {
        return true;
    } else {
        return false;
    }
}

module.exports = router