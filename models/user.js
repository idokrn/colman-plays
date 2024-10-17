const mongoose = require('mongoose');
const Cart = require('./cart');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Types.ObjectId, required: true },
    history: [mongoose.Types.ObjectId],
    isAdmin: {type: Boolean, required: true}
});

const User = mongoose.model('User', userSchema);

const create = async (name, email, password) => {
    const cart = await Cart.create();
    const user = new User({
        name: name,
        email: email,
        password: password,
        cart: cart._id,
        history: [],
        isAdmin: false,
    });

    return await user.save();
};

const findOne = async (object) => {
    return await User.findOne(object);
};


const getById = async (id) => {
    return await User.findById(id);
};

const updateName = async (id, name) => {
    const User = await getById(id);
    if (!User)
        return null;

    User.name = name;
    await User.save();
    return User;
};

const deleteById = async (id) => {
    const User = await getById(id);
    if (!User)
        return null;

    await User.deleteOne();
    return User;
};

const purchase = async (id) => {
    const user = await getById(id);
    if (!user) return null;

    const new_cart = await Cart.create();
    if (!new_cart) return null;

    await Cart.purchase(user.cart);
    user.history.push(user.cart);
    user.cart = new_cart._id;

    await user.save();
    return user;
};

module.exports = {
    purchase,
    deleteById,
    getById,
    updateName,
    create,
    findOne,
}
