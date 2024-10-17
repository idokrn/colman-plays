const Items = require('../models/item')

async function ShowCatalog(req,res){
    const items = await Items.getAll();
    const categories = [...new Set(items.map(item => item.category))];
    res.render("catalog.ejs", { items: items, categories: categories });
}

module.exports = {ShowCatalog}