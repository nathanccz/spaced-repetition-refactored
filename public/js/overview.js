const activeTopicID = localStorage.getItem('active')
  if (activeTopicID) {
    const activeElement = document.querySelector(`[data-active-id="${activeTopicID}"]`)
    if (activeElement) {
      activeElement.classList.add('active')
      activeElement.childNodes[1].childNodes[0].classList.toggle('rotate-180')
      localStorage.removeItem('active')
    }
} 

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.collapsible');
  const toggleChevron = (event) => {
    event.childNodes[1].childNodes[0].classList.toggle('rotate-180')
  }
  const options = { accordion: true, onOpenStart: toggleChevron, onCloseStart: toggleChevron }
  let instances = M.Collapsible.init(elems, options);
})

 document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems);
})

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);
})

const addTopicBtn = document.getElementById('add-topic-btn')
addTopicBtn.addEventListener('click', async(event) => {
  event.preventDefault()
  const techID = event.target.dataset.id || event.target.parentNode.dataset.id
  const topicToAdd = document.querySelector('.materialize-textarea').value
  if (!topicToAdd) {
    alert('Please enter a topic.')
    return
  }
  const response = await fetch('/tech/addTopic', {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
        topicToAdd: topicToAdd,
        techID: techID
    })
  })
  const data = await response.json()
  if (data === 'Topic added successfully') {
    location.reload()
  }
})

const logSessionBtns = document.querySelectorAll('.log-session-btn')
Array.from(logSessionBtns).forEach(btn => btn.addEventListener('click', async(event) => {
  
  const topicID = event.target.dataset.id || event.target.parentNode.dataset.id
  const techID = event.target.dataset.tech || event.target.parentNode.dataset.tech
  const selectElement = document.querySelector(`.log-session-field-${topicID}`)
  const rating = selectElement.options[selectElement.options.selectedIndex].innerText
  
  if (rating.includes('Choose')) {
    alert('Please choose an option from the list.')
    return
  }
  
  try {
    const request = await fetch('/tech/addSession', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
          topicID: topicID,
          techID: techID,
          rating: rating
        })
    })
    const data = await request.json()
    if (data === 'Session saved') {
      localStorage.setItem('active', topicID)
      location.reload()
    }
  } catch(err) {
    console.log(err)
  }
  
}))

const confirmationBtns = document.querySelectorAll('.confirmation-btn')
Array.from(confirmationBtns).forEach(btn => btn.addEventListener('click', async() => {
  const topicToDelete = btn.dataset.topic

  try {
    const response = await fetch('/tech/deleteTopic', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        topicID: topicToDelete
      })
    })
    const data = await response.json()
    if (data === 'Topic deleted') {
      location.reload()
    }
    
  } catch (err) {
    console.log(err)
  }

}))

const editConfirmationBtns = document.querySelectorAll('.edit-btn')
Array.from(editConfirmationBtns).forEach(btn => btn.addEventListener('click', async() => {
  const topicToEdit = btn.dataset.topic
  const newTopic = document.getElementById(`icon_prefix2-${topicToEdit}`).value
  const originalTopic = document.getElementById(`icon_prefix2-${topicToEdit}`).closest('li').childNodes[1].innerText

  console.log(originalTopic, newTopic)

  if (newTopic === originalTopic) {
    alert('You have not made any changes. Please try again.')
    return
  }

  try {
    const response = await fetch('/tech/editTopic', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        topicID: topicToEdit,
        newTopic: newTopic
      })
    })
    const data = await response.json()
    if (data === 'Topic changed') {
      localStorage.setItem('active', topicToEdit)
      location.reload()
    }
  } catch (err) {
    console.log(err)
  }
}))