const User = require('../models/user')
const Cart = require('../models/cart')

async function ShowUserPanel(req,res){
    const user = await User.getById(req.user_id);
    const history = await Cart.findByIds(user.history)

    res.render("user_panel.ejs", {user, history})
}

module.exports = {ShowUserPanel}


