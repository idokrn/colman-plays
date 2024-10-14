const Items = require('../models/item')
async function createItem(req,res){
    const { name, price, description, imageUrl, category } = req.body;
    await Items.create(name, price, description, imageUrl, category)
    res.status(201).send('Item inserted successfully');
}
module.exports = {createItem}
