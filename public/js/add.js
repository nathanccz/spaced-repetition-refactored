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
      M.toast({ html: data, displayLength: 4000 })
    } else if (data === 'Tech already exists') {
        alert(`You've already added this tech. Please choose another.`)
    }

    autocompleteInput.value = ''
})

// Fetch tech list from db and pass it into init method to fill autocomplete box.
document.addEventListener('DOMContentLoaded', async() => {
    let elems = document.querySelectorAll('.autocomplete')
    const response = await fetch('/tech/techlist')
    const data = await response.json()

    const options = data.reduce((obj,curr) => {
        if (!obj.data) obj.data = {}
        obj.data[curr.techName] = `../images/${curr.techName}.png`
        return obj
    }, {})
    
    let instances = M.Autocomplete.init(elems, options);
})