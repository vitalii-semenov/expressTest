const toCurrency = price => {
    return new Intl.NumberFormat('ua-UA', {
        currency: 'UAH',
        style: 'currency'
    }).format(price)
} 

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

const card= document.querySelector('#card')

if (card) {
    card.addEventListener('click', e => {
        if (e.target.classList.contains('js-remove')) {
            id = e.target.dataset.id

            fetch(`/card/remove/${id}`, {
                method: 'delete',
            }).then(res => res.json())
                .then(c => {
                    if (c.persons.length) {
                        const html = c.persons.map(person => {
                            return `
                                <tr>
                                    <td>${person.name}</td>
                                    <td>${person.count}</td>
                                    <td>
                                        <button class="btn btn-small js-remove" data-id="${person.id}">Delete</button>
                                    </td>
                                </tr>
                            `
                        }).join('');
                        card.querySelector('tbody').innerHTML = html;
                        card.querySelector('.price').textContent = toCurrency(c.price);
                    } else {
                        card.innerHTML = '<p> Card is empty</p>'
                    }
                })
                .catch(err => console.log(err))
        }
    })
}
