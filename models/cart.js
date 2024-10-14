const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [mongoose.Types.ObjectId],  // List of items by their objectId.
    purchased: {type: Boolean},          // True if this cart was purchased.
    purchase_date: {type: Date},
    total: {type: Number},
});


const Cart = mongoose.model('Cart', CartSchema);

const create = async () => {
    const cart = new Cart({
        items: [],
        purchased: false,
        purchase_date: new Date(),
        total: 0
    });

    return await cart.save();
};

const getById = async (id) => {
    return await Cart.findById(id);
};

const findByIds = async (ids) => {
    return await Cart.find({_id: {$in: ids}})
}

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
    cart.purchase_date = new Date();
    await cart.save();
    return cart;
};


module.exports = {
    purchase,
    deleteItem,
    addItem,
    getById,
    create,
    findByIds,
}