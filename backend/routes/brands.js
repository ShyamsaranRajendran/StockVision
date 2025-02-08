const express = require('express');
const router = express.Router();
const Brand = require('../models/brand.model');

// Route to fetch all brands (GET)
router.get('/', async (req, res) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json(brands);
    } catch (error) {
        console.error("Error fetching brands:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Route to fetch a brand by its ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json(brand);
    } catch (error) {
        console.error("Error fetching brand:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Route to create a new brand (POST)
router.post('/', async (req, res) => {
    const { name, logo } = req.body;
    try {
        const newBrand = new Brand({
            name,
            logo
        });
        await newBrand.save();
        return res.status(201).json(newBrand);
    } catch (error) {
        console.error("Error creating brand:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Route to update an existing brand (PUT)
router.put('/:id', async (req, res) => {
    const { name, logo } = req.body;
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            { name, logo },
            { new: true }  // returns the updated brand
        );
        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json(updatedBrand);
    } catch (error) {
        console.error("Error updating brand:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a brand (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
        if (!deletedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        console.error("Error deleting brand:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
