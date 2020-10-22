const express = require('express')
const router = express.Router()
var rss = require('rss');
const Post = require('../models/rss')

// Express get listener event for url to RSS feed
router.get('/', async (req, res) => {
    // Create rss prototype object and set some base values
    var feed = new rss({
        title: 'Niklas Oberhuber',
        description: 'Some updates about stuff.',
        feed_url: 'http://' + req.headers.host + '/' + req.url,
        site_url: 'http://' + req.headers.host,
        author: 'Niklas Oberhuber'
    });

    var rsspost = await Post.find().limit(10);
    
    rsspost.forEach(post => {
        feed.item({
            title: post.subject,
            description: post.summary,
            url: 'http://' + req.headers.host,
            author: 'Niklas Oberhuber',
            date: post.created,
            content: post.content,
            custom_elements: [
              {'content:encoded' : post.content}
            ]
        });  
    });
    res.type('rss');
    res.send(feed.xml());
});

module.exports = router