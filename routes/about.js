const {Router} = require('express')
const Person = require('../models/user')
const router = Router()

router.get('/', async (req, res) => {
    const persons = await Person.find();

    res.render('about', {
        title: 'About page',
        isAbout: true,
        persons
    })
})

router.get('/:id', async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render('person', {
        title: person.name,
        person
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const person = await Person.findById(req.params.id)
    res.render('person-edit', {
        title: person.name,
        person
    })
})

router.post('/edit', async (req, res) => {
    console.log(req.body)
    const {id} = req.body;
    delete req.body.id
    await Person.findByIdAndUpdate(id, req.body);
    res.redirect('/about')
})

module.exports = router