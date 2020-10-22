const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('login')
})
router.post('/', async (req, res) => {
    if(req.body.password === process.env.PASSWORD) {
        res.cookie('loggedin', true, {httpsOnly: true, signed: true})
        res.redirect('/new')
    } else {
        res.send('wrong password')
    }
})

module.exports = router