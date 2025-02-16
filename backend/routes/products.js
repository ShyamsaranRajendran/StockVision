const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
