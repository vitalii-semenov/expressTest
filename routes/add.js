const {Router} = require('express')
const Person = require('../models/person')

const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add page',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const person = new Person({
        price: req.body.price,
        name: req.body.name
    })

    try {
        await person.save();
        res.redirect('/about')
    } catch (e) {
        console.log(e);
    }
    
})

module.exports = router
