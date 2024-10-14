const Items = require('../models/item')
async function ShowCatalog(req,res){
    const items = await Items.getAll();
    console.log(items)
    res.render("catalog.ejs",{items:items})
}

module.exports = {ShowCatalog}