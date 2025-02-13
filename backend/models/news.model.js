const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    source: {
        id: String,
        name: String
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: String
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;
