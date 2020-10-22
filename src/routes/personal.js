const express = require('express')
const router = express.Router()

// Express get listener event for url to RSS feed
app.get('/', (req, res) => {
    // Create rss prototype object and set some base values
    var feed = new rss({
        title: 'Niklas Oberhuber',
        description: 'Some updates about stuff.',
        feed_url: 'http://' + req.headers.host + req.url,
        site_url: 'http://' + req.headers.host,
        author: 'Niklas Oberhuber'
    });

    db.collection('rssPost_personal').find().limit(10).sort({ 
      created: -1
    }, function(err, posts) {

      if (! err && posts) {
    
        posts.forEach(function(item,post) {
          feed.item({
              title: post.subject,
              description: post.summary,
              url: 'http://' + req.headers.host + post.id,
              author: 'Niklas Oberhuber',
              date: post.created
          });      
        });
        res.type('rss');
        res.send(feed.xml());
      }
    });
});

module.exports = router