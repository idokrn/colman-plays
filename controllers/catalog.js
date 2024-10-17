const Items = require('../models/item')
async function ShowCatalog(req,res){
    const items = await Items.getAll();
    res.render("catalog.ejs",{items:items})
}

module.exports = {ShowCatalog}