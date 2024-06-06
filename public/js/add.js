const addTechBtn = document.getElementById('addTechBtn')
const autocompleteInput = document.getElementById('autocomplete-input')

addTechBtn.addEventListener('click', async() => {
    const techToAdd = document.getElementById('autocomplete-input').value
    if (!techToAdd) {
        alert('Please choose a technology or add your own in the form below.')
        return
    }
    const request = await fetch('/tech/addTech', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'techToAdd': techToAdd
        })
    })
    const data = await request.json()
    if (data === 'Item added successfully') {
      autocompleteInput.value = ''
      M.toast({ html: data, displayLength: 5000 })
    }
})