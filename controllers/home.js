const RSS = require('rss-parser');

// Login to User Transition when loging in
async function ShowHome(req,res){
    var login="Login"
    const cookie = req.headers.cookie
    if (cookie != null) login="Profile"

    const rss_parser = new RSS()
    const feed = await rss_parser.parseURL("https://gamerant.com/feed/gaming/")

    console.log(feed.items[0])

    res.render("index.ejs",{login:login,news:feed.items,products:[]})
}

module.exports = {ShowHome}