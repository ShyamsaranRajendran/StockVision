const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const bycrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys.js');
const authenticate = require('../utils/authendicate.js');

// Register route (already provided)
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;  // Ignore confirmPassword
        console.log(req.body);
        if (!email || !password) {
            console.log("Please add all the fields");
            return res.status(422).json({ error: 'Please add all the fields' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bycrypt.hash(password, 12);

        // Create a new user
        const user = new User({ email, password: hashedPassword });
        await user.save();
        console.log("User was registered successfully");

        res.status(201).json({ message: "User was registered successfully", email });
    } catch (err) {
        res.status(500).json({ error: err.message || "Some error occurred while creating the user." });
    }
});


// Login route (already provided)
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(422).json({ error: 'Please add email or password' });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid email or password' });
            }
            const isMatch = bycrypt.compareSync(password, savedUser.password);
            if (isMatch) {
                const token = JWT.sign({ _id: savedUser._id }, JWT_SECRET);
                const { _id, name, email } = savedUser;
                res.json({ token, user: { _id, name, email } });
            } else {
                return res.status(422).json({ error: 'Invalid email or password' });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while login the User.'
            });
        });
});

// Edit user route (PUT)
router.put('/edit/:id', async (req, res) => {
    const { name, email, password, country, state, city, pincode, address, phone } = req.body;
    const updates = {};

    // Update fields conditionally if they are present in the request body
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = bycrypt.hashSync(password, 12);
    if (country) updates.country = country;
    if (state) updates.state = state;
    if (city) updates.city = city;
    if (pincode) updates.pincode = pincode;
    if (address) updates.address = address;
    if (phone) updates.phone = phone;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete user route (DELETE)
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/me',authenticate,async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        res.json(user);
    }catch(err){
        res.status(500).json({ error: err.message || "Some error occurred while fetching the user." });
    }
});

module.exports = router;
