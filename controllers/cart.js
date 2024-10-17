const User = require('../models/user')
const Cart = require('../models/cart')

async function ShowCart(req,res){
    const user = req.user;
    const cart = await Cart.getById(user.cart)
    
    const items = await Cart.getAllItems(user.cart)

    res.render("cart.ejs",{items: items,cart: cart})
}

async function addToCart(req,res) {
    const item_id = req.body.id
    const user = req.user;
    const cart = await Cart.getById(user.cart)

    const new_cart = await Cart.addItem(cart._id, item_id)

    if (new_cart == null) {return res.status(500).send({error: "no such item with id " + item_id})}
    return res.status(200).send()
}

async function removeItem(req, res) {
    const user = req.user;
    const cart = await Cart.getById(user.cart)

    const new_cart = await Cart.deleteItem(cart._id,req.params.item_id)
    if (new_cart == null) {return res.status(500).send({error: "no such item with id " + req.params.item_id})}
    return res.status(200).send({new_price: new_cart.total})


}

module.exports = {ShowCart,addToCart,removeItem}