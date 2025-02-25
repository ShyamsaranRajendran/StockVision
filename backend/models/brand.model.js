const mongoose = require('mongoose');
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});
const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;
