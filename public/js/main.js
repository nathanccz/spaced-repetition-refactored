// Fetch tech list from db and pass it into init method to fill autocomplete box.

document.addEventListener('DOMContentLoaded', async() => {
    let elems = document.querySelectorAll('.autocomplete')
    const response = await fetch('/tech/techlist')
    const data = await response.json()
    console.log(data)

    const options = data.reduce((obj,curr) => {
        if (!obj.data) obj.data = {}
        obj.data[curr.techName] = null //Add = curr.faClass or link to img
        return obj
    }, {})

    let instances = M.Autocomplete.init(elems, options);
})