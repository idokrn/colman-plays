const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const cookie = req.headers.cookie
  if (cookie == null) return res.redirect('/login')

  const token = cookie.split('=')[1];
  
  jwt.verify(token, process.env.JWT_TOKEN, (err, data) => {

    if (err instanceof jwt.TokenExpiredError) {
      return res.redirect('/login')
    } else if (err) {
      console.log(err)
      return res.sendStatus(401)
    }

    req.user_id = data.userId

    next()
  })
}

module.exports = {authenticateToken}