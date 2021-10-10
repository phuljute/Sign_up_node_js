const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 5000

// Set Templating Enginge
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('', (req, res)=> {
    res.render('signup')
})

app.get('/signup', (req, res)=> {
    res.render('signup')
})

app.post('/signup', urlencodedParser, [
    check('firstName', 'The first name is mandatory field')
        .exists()
        .isLength({ min: 1 }),
    check('lastName', 'The last name is mandatory field')
        .exists()
        .isLength({ min: 1 }),
    check('password', 'This password must me 8+ characters long')
        .exists()
        .isLength({ min: 8 }),
    check('email', 'Email is mandatory field')
        .exists()
        .isEmail()
        .normalizeEmail()

], (req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        res.status(422)
        const alert = errors.array()
        res.render('signup', {
            alert
        })
    }
   else 
   req.body.subscription 
     ? res.write(`Hello ${req.body.firstName}  ${req.body.lastName}, Thank you for signing up. Your account is now created.You would be receiving our periodic newsletters to your email: ${req.body.email}`)
     : res.write(`Hello ${req.body.firstName}  ${req.body.lastName}, Thank you for signing up. Your account is now created.`)
    res.end();

})


app.listen(port, () => console.info(`App listening on port: ${port}`))