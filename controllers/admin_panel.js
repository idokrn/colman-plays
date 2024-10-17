const Items = require('../models/item')

async function ShowAdminPanel(req, res) {
    const user = req.user;
    if (!user.isAdmin) {return res.status(401).send('not authuraized')}

    const items = await Items.getAll();
    res.render("admin_panel.ejs", {items:items})
}

module.exports = {ShowAdminPanel}