const activeTopicID = localStorage.getItem('active')
  if (activeTopicID) {
    const activeElement = document.querySelector(`[data-active-id="${activeTopicID}"]`)
    if (activeElement) {
      activeElement.classList.add('active')
      activeElement.childNodes[1].childNodes[0].classList.toggle('rotate-180')
    }
  } 

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.collapsible');
  const toggleChevron = function(event) {
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
  const techID = event.target.dataset.id
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
  const topicID = event.target.dataset.id
  const techID = event.target.dataset.tech
  const selectElement = document.querySelector(`.log-session-field-${topicID}`)
  const rating = selectElement.options[selectElement.selectedIndex].innerText
  console.log(topicID, techID, rating)
  
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

// const collapsibleHeaders = document.querySelectorAll('.collapsible-header')
// Array.from(collapsibleHeaders).forEach(el => el.addEventListener('click', (event) => {

//   console.log(el)
  
// }))