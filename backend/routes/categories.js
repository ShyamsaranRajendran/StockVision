const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");

// ✅ Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Get a single category by ID
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Create a new category
router.post("/add", async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Update an existing category
router.put("/update/:id", async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();
        res.json({ message: "Category updated successfully", category });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Delete a category
router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
