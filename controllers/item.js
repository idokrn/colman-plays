const Items = require('../models/item')
async function createItem(req,res){
    const { name, price, description, imageUrl, category,featured } = req.body;
    await Items.create(name, price, description, imageUrl, category,featured)
    res.status(201).send('Item inserted successfully');
}
module.exports = {createItem}