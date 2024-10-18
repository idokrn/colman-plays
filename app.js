const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart')
const catalogRoutes = require('./routes/catalog')
const userPanelRoutes = require('./routes/user_panel')
const homeRoutes = require('./routes/home')
const adminPanelRoutes = require('./routes/admin_panel')
const itemRoutes = require('./routes/item')
const confirmRouts = require('./routes/confirm')
const contactRoutes = require('./routes/contact');


mongoose.connect(process.env.MONGO_URI)
const server = express()
server.use(express.urlencoded({ extended: true }));
server.use(cors())
server.use(express.json())
server.use(express.static('public'))

server.use('/cart',cartRoutes)
server.use('/login',authRoutes)
server.use('/catalog',catalogRoutes)
server.use('/my',userPanelRoutes)
server.use('/',homeRoutes)
server.use('/admin',adminPanelRoutes)
server.use('/item',itemRoutes)
server.use('/confirm', confirmRouts)
server.use('/contact', contactRoutes);

server.listen(80)