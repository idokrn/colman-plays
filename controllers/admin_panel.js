async function ShowAdminPanel(req, res)  {
    const user = req.user;
    if (!user.isAdmin) {return res.status(401).send('not authuraized')}

    res.render("admin_panel.ejs")
}

module.exports = {ShowAdminPanel}