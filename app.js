const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const userPanel = require('./controllers/user_panel')
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart')
const catalogRoutes = require('./routes/catalog')
const userPanelRoutes = require('./routes/user_panel')

mongoose.connect(process.env.MONGO_URI)
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static('public'))

server.use('/cart',cartRoutes)
server.use('/login',authRoutes)
server.use('/catalog',catalogRoutes)
server.use('/my',userPanelRoutes)

server.listen(80)