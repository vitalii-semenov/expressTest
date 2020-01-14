const {Router} =  require('express')
const Card = require('../models/card')
const Person = require('../models/user')
const router = Router()

router.post('/add', async (req, res) => {
    const person = await Person.getById(req.body.id);
    await Card.add(person);
    res.redirect('/card')

})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.status(200).json(card)
})

router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('card', {
        title: 'Card',
        isCard: true,
        persons: card.persons,
        price: card.price
    })
})

module.exports = router