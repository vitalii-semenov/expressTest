const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'    
)

class Card {
    static async add(person) {
        const card = await Card.fetch();

        const idx = card.persons.findIndex(el => el.id === person.id);
        const candidate = card.persons[idx];

        if (candidate) {
            candidate.count++;
            card.persons[idx] = candidate;
        } else {
            person.count = 1;
            card.persons.push(person);
        }

        card.price += +person.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })

    }

    static async remove(id) {
        const card = await Card.fetch();

        console.log(card);
        
        const idx = card.persons.findIndex(person => person.id === id);

        const person = card.persons[idx];

        if (person.count === 1) {
            card.persons = card.persons.filter(person => person.id !== id)
        } else {
            card.persons[idx].count--
        }

        card.price -= person.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card;