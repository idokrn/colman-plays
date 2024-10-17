const Items = require('../models/item')

async function createItem(req,res){

    const user = req.user;
    if (!user.isAdmin) {return res.status(401).send('not authuraized')}

    const { name, price, description, imageUrl, category, featured } = req.body;
    const new_item = await Items.create(name, price, description, imageUrl, category, featured)
    if(new_item==null) { return res.status(500).send({error: "Couldnt create the item"})}
    return res.status(201).send('Item inserted successfully');
}

async function updateItem(req, res) {
    const user = req.user;
    if (!user.isAdmin) {return res.status(401).send('not authuraized')}

    const {id, name, price, description, imageUrl, category, featured } = req.body;
    const new_item = await Items.update(id ,name, price, description, imageUrl, category, featured)
    if(new_item==null) { return res.status(500).send({error: "Couldnt update the item"})}
    return res.status(201).send('Item updated successfully');
}

async function deletItem(req, res) {
    const user = req.user;
    if (!user.isAdmin) {return res.status(401).send('not authuraized')}

    const id = req.body.id;
    await Items.deleteById(id)
    return res.status(201).send('Item deleted successfully');
}
module.exports = {createItem,updateItem,deletItem}