const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {                     // Name of the item
        type: String,
        required: true,
    },
    price: {                    // Price of the item
        type: Number,
        required: true,
    },
    description: {              // Description of the item
        type: String,
        required: true,
    },
    imageUrl: {                 // URL of the item's image
        type: String,
    },
    category: {                 // Category of the item
        type: String,
    },
});

const Item = mongoose.model('Item', ItemSchema);

// Function to create a new item
const create = async (name,price,description,imageUrl,category) => {
    const item = new Item({name,price,description,imageUrl,category});
    return await item.save();
};

// Function to get an item by ID
const getById = async (id) => {
    return await Item.findById(id);
};
const getAll = async ()=>{
    return await Item.find();
}

// Function to update an item
const update = async (id,name,price,description,imageUrl,category) => {
    const item = await getById(id);
    if (!item) return null;

    Object.assign(item,{name,price,description,imageUrl,category});
    await item.save();
    return item;
};

// Function to delete an item
const deleteById = async (id) => {
    const item = await getById(id);
    if (!item) return null;

    await item.deleteOne();
    return item;
};

module.exports = {
    create,
    getById,
    update,
    deleteById,
    getAll,
};
