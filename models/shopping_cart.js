const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema({
    items: [mongoose.Types.ObjectId],  // List of items by their objectId.
    purchased: Boolean,          // True if this cart was purchased.
});


const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);

const create = async () => {
    const shopping_cart = new ShoppingCart({
        items: [],
        purchased: false,
    });

    return await shopping_cart.save();
};

const getById = async (id) => {
    return await ShoppingCart.findById(id);
};

const addItem = async (cart_id, item_id) => {
    const cart = await getById(cart_id);
    if (!cart)
        return null;

    cart.items.push(item_id);
    await cart.save();
    return cart;
};

const deleteItem = async (cart_id, item_id) => {
    const cart = await getById(cart_id);
    if (!cart)
        return null;

    const index = cart.items.indexOf(item_id);
    if (index > -1)
        cart.items.splice(index,1);

    await cart.save();
    return cart;
};

const purchase = async (cart_id) => {
    const cart = await getById(cart_id);
    if (!cart)
        return null;

    cart.purchased = true;
    await cart.save();
    return cart;
};


module.exports = {
    purchase,
    deleteItem,
    addItem,
    getById,
    create,
}