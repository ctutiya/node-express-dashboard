const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const { auth } = require('express-openid-connect')

require('dotenv').config()

const port = process.env.PORT || 3000

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
}

const app = express()

// set templating engine (ejs)
app.use(expressLayouts)
app.set('layout', './layouts/default')
app.set('views', 'views')
app.set('view engine' , 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})