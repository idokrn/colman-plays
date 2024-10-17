const jwt = require('jsonwebtoken');
const User = require('../models/user')

function authenticateToken(req, res, next) {
  const cookie = req.headers.cookie
  if (cookie == null) return res.redirect('/login')
  const token = cookie.split('=')[1];
  
  jwt.verify(token, process.env.JWT_TOKEN,async (err, data) => {

    if (err instanceof jwt.TokenExpiredError) {
      return res.redirect('/login')
    } else if (err) {
      console.log(err)
      return res.sendStatus(401)
    }

    const user = await User.getById(data.userId)
    if (user == null) {return res.redirect('/login')}

    req.user = user

    next()
  })
}

module.exports = {authenticateToken}