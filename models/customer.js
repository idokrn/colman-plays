const mongoose = require('mongoose');
const ShoppingCart = require('./shopping_cart');

const CustomerSchema = new mongoose.Schema({
    name: {                       // Customer Name
        type: String,
        required: true,
    },
    cart: {              // ObjectId of a current shopping cart
        type: mongoose.Types.ObjectId,
        required: true,
    },
    history: [mongoose.Types.ObjectId], // List of purchased shopping carts ObjectIds
});


const Customer = mongoose.model('Customer', CustomerSchema);

const create = async (name) => {
    const cart = await ShoppingCart.create();
    const cutomer = new Customer({
        name: name,
        cart: cart._id,
        history: [],
    });

    return await cutomer.save();
};

const getById = async (id) => {
    return await Customer.findById(id);
};

const updateName = async (id, name) => {
    const customer = await getById(id);
    if (!customer)
        return null;

    customer.name = name;
    await customer.save();
    return customer;
};

const deleteById = async (id) => {
    const customer = await getById(id);
    if (!customer)
        return null;

    await customer.deleteOne();
    return customer;
};

const purchase = async (id) => {
    const customer = await getById(id);
    const new_cart = await ShoppingCart.create();
    if (!customer)
        return null;

    await ShoppingCart.purchase(customer.cart);
    customer.history.push(customer.cart);
    customer.cart = new_cart._id;

    await customer.save();
    return customer;
};

module.exports = {
    purchase,
    deleteById,
    getById,
    updateName,
    create,
}