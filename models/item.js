const mongoose = require('mongoose');
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
    appKey: 'gUo0gJYny33owgJpUIqccF9Ze',
    appSecret: 'ZlJ6AhoyGjn2XRq4GAeBW0XwGndMAqrxNvEKaMl0vCo2pjfOTT',
    accessToken: '1846872535780196352-olWkyorkTjiUkSZgLPaosEZ4J46rwt',
    accessSecret: 'vALIrp5Tny3r4scIarcWRGgcr9G4rqxO7QneIvJtJVQIi',
});
//client id b2hZVWJNYVZJY01kV1B1OGZtenA6MTpjaQ
//client secret uUyWm7ay-igin8AnVMockUhTqQuPcDsnajHDB8FC6EMUHtCSWh
//client secret uUyWm7ay-igin8AnVMockUhTqQuPcDsnajHDB8FC6EMUHtCSWh
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
    await item.save();
    await postToTwitter(item);
    return item;
};


const postToTwitter = async (item) => {
    try {
        const message = `New Product Alert! 🎉\n${item.name}\nPrice: $${item.price}\n${item.description}\nCheck it out now!`;
        
        await twitterClient.v2.tweet(message);
        console.log(`Successfully posted ${item.name} to Twitter.`);
    } catch (error) {
        console.error("Failed to post to Twitter:", error);
    }
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
