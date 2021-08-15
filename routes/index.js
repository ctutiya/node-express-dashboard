const express = require('express')
const router = express.Router()
const { requiresAuth } = require('express-openid-connect')

const byteSize = require('byte-size')

router.get('/', async(req, res) => {
    const si = require('systeminformation')
    let sysInfo = ''

    const valueObject = {
        osInfo: 'hostname, arch, platform',
        system: 'model',
        diskLayout: '*'
    }

    try {
        const data = await si.get(valueObject)
        sysInfo = data
    } catch (e) {
        console.log(e)
    }

    res.render('index', {
        title: 'NE Admin',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        sysInfo,
        byteSize
    })
})

router.get('/express', requiresAuth(), (req, res) => {
    res.render('express', {
        title: 'Express &ndash; Node.js web application framework | NE Admin',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
    })
})

router.get('/ejs', requiresAuth(), (req, res) => {
    res.render('ejs', {
        title: 'EJS &ndash; Embedded JavaScript templates | NE Admin',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
    })
})

router.get('/systeminformation', requiresAuth(), (req, res) => {
    res.render('systeminformation', {
        title: 'Systeminformation &ndash; System and OS information library for node.js | NE Admin',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
    })
})

router.get('/theme', requiresAuth(), (req, res) => {
    res.render('theme', {
        title: 'SB Admin 2 &ndash; Start Bootstrap | NE Admin',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
    })
})

module.exports = router