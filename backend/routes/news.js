const express = require('express');
const router = express.Router();
const axios = require('axios');
const StockNews = require('../models/news.model');

const NEWS_API_KEY = '2596e3aa7cdb4fdeb0c614d291e9e9ba';
const BASE_URL = 'https://newsapi.org/v2/everything';

// Route to fetch stock-related news and save it to MongoDB
router.get('/fetch-stock-news', async (req, res) => {
    try {
        const stockQuery = req.query.q || 'stocks'; // Default to 'stocks' if no query is provided
        const response = await axios.get(`${BASE_URL}?q=${stockQuery}&sortBy=popularity&apiKey=${NEWS_API_KEY}`);
        const articles = response.data.articles;

        if (!articles.length) {
            return res.status(404).json({ message: 'No stock news found' });
        }

        // Save only relevant fields to MongoDB
        const formattedArticles = articles.map(article => ({
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content
        }));

        const savedArticles = await StockNews.insertMany(formattedArticles);
        res.json({ message: 'Stock news saved successfully', data: savedArticles });
    } catch (error) {
        console.error('Error fetching stock news:', error);
        res.status(500).json({ message: 'Error fetching stock news' });
    }
});

// Route to get saved stock news from MongoDB
router.get('/stock-news', async (req, res) => {
    try {
        const news = await StockNews.find().sort({ publishedAt: -1 }); // Sort by latest news first
        res.json(news);
    } catch (error) {
        console.error('Error retrieving stock news:', error);
        res.status(500).json({ message: 'Error retrieving stock news' });
    }
});

// Route to search for specific stock news from MongoDB
router.get('/search-stock-news', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ message: 'Query parameter is required' });

        const news = await StockNews.find({ title: { $regex: query, $options: 'i' } });
        res.json(news);
    } catch (error) {
        console.error('Error searching stock news:', error);
        res.status(500).json({ message: 'Error searching stock news' });
    }
});

// Route to fetch stock market calendar news
router.get('/stock-market-calendar', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=stock-market-calendar&sortBy=popularity&apiKey=${NEWS_API_KEY}`);
        const articles = response.data.articles;

        if (!articles.length) {
            return res.status(404).json({ message: 'No stock market calendar news found' });
        }

        const formattedArticles = articles.map(article => ({
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content
        }));

        res.json({ message: 'Stock market calendar news fetched successfully', data: formattedArticles });
    } catch (error) {
        console.error('Error fetching stock market calendar news:', error);
        res.status(500).json({ message: 'Error fetching stock market calendar news' });
    }
});

// Route to fetch research reports
router.get('/research-reports', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=research-reports&sortBy=popularity&apiKey=${NEWS_API_KEY}`);
        const articles = response.data.articles;

        if (!articles.length) {
            return res.status(404).json({ message: 'No research reports found' });
        }

        const formattedArticles = articles.map(article => ({
            source: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content
        }));

        res.json({ message: 'Research reports fetched successfully', data: formattedArticles });
    } catch (error) {
        console.error('Error fetching research reports:', error);
        res.status(500).json({ message: 'Error fetching research reports' });
    }
});

module.exports = router;
