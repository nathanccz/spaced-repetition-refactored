const deleteTechBtns = document.querySelectorAll('.delete-tech-btn')
const deleteForm = document.getElementById('delete-form')

Array.from(deleteTechBtns).forEach(el => el.addEventListener('click', deleteTech))

async function deleteTech(event) {
    event.preventDefault()
    try {
        const techID = event.target.dataset.id
        const response = await fetch('/tech/deleteTech', {
            method: "DELETE",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                techToDelete: techID
            })
        })
        const data = await response.json()
        if (data === 'Item deleted') {
            window.location.reload()
        } 
    } catch(err) {
        console.log(err)
    }
}