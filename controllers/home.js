const RSS = require('rss-parser');
const Items = require('../models/item');

async function ShowHome(req, res) {
    var login = "Login";
    const cookie = req.headers.cookie;
    if (cookie != null) login = "Profile";

    const rss_parser = new RSS();
    const feed = await rss_parser.parseURL("https://gamerant.com/feed/gaming/");

    const featuredProducts = await Items.getFeatured();

    res.render("index.ejs", {
        login: login,
        news: feed.items,
        products: featuredProducts 
    });
}

module.exports = { ShowHome };