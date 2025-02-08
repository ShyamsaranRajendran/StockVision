const router=require('express').Router();
const Wishlist=require('../models/wishlist.model.js');

router.get('/',(req,res)=>{
    Wishlist.find()
    .then(wishlist=>res.json(wishlist))
    .catch(err=>res.status(400).json('Error: '+err));
});


module.exports = router;