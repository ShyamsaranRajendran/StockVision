const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
       
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },
      onlineStatus: { type: String, enum: ["online", "offline", "away"], default: "offline" },
      lastSeen: { type: Date, default: Date.now },
}); 
const User = mongoose.model('User', UserSchema);
module.exports = User;
