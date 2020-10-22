const mongoose = require('mongoose')

var rssSchema_personal = new mongoose.Schema({
    subject: { type: String, required: true},
    summary: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now() },
    content: { type: String, required: true }
});

module.exports = mongoose.model('rssPost_personal', rssSchema_personal);