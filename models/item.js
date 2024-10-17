const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {                
        type: String,
        required: true,
    },
    price: {             
        type: Number,
        required: true,
    },
    description: {             
        type: String,
        required: true,
    },
    imageUrl: {                 
        type: String,
    },
    category: {                
        type: String,
        required: true
    },
    featured: { 
        type: Boolean,
        default: false
    } 
});

const Item = mongoose.model('Item', ItemSchema);

// Function to create a new item
const create = async (name,price,description,imageUrl,category,featured) => {
    const item = new Item({name,price,description,imageUrl,category,featured});
    return await item.save();
};
const getFeatured = async () => {
    return await Item.find({ featured: true });
};

// Function to get an item by ID
const getById = async (id) => {
    return await Item.findById(id);
};
const getAll = async ()=>{
    return await Item.find();
}

// Function to update an item
const update = async (id,name,price,description,imageUrl,category,featured) => {
    const item = await getById(id);
    if (!item) return null;

    Object.assign(item,{name,price,description,imageUrl,category,featured});
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
    getFeatured
};
