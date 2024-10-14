const User = require('../models/user')
const Cart = require('../models/cart')

async function ShowCart(req,res){
    const user = await User.getById(req.user_id);
    const cart = await Cart.getById(user.cart)
    console.log(cart)

    res.render("cart.ejs")
}

module.exports = {ShowCart}