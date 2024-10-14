// Login to User Transition when loging in
async function ShowHome(req,res){
    var login="Login"
    const cookie = req.headers.cookie
    if (cookie != null) login="Profile"



    res.render("index.ejs",{login:login,news:[],products:[]})
}

module.exports = {ShowHome}