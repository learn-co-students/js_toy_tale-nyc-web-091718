const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')

let addToy = false
let allToys = []

// YOUR CODE HERE
fetch('http://localhost:3000/toys')
  .then(response=>response.json())
  .then((json)=>{
    renderToys(json)
    allToys = json;
  });

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function renderToys(toys){
  let htmlToys = toys.map((toy)=>{
     return `  <div data-id = ${toy.id} class="card">
                  <h2>${toy.name}</h2>
                  <img src=${toy.image} class="toy-avatar" />
                  <p>${toy.likes} Likes </p>
                  <button class="like-btn">Like ❤️</button>
                </div>`
  }).join('')
  toyCollection.innerHTML = htmlToys
}
toyForm.addEventListener('submit',(event)=>{
  event.preventDefault()
  const newToyName = document.getElementById('name').value
  const newToyImage = document.getElementById('image').value
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
    body: JSON.stringify({name: newToyName,image: newToyImage, likes: 0})
  })
  .then((response)=>response.json())
  .then((json)=>{
    allToys.push(json)
    renderToys(allToys)
  })
  toyForm.querySelector('.add-toy-form').reset()
})
// OR HERE!
toyCollection.addEventListener('click',(event)=>{
  let foundToy = null;
  if (event.target.className === "like-btn"){
     foundToy = allToys.find((toy)=>{
      return toy.id == event.target.parentElement.dataset.id
    })
    foundToy.likes++
  }
  renderToys(allToys)
  fetch(`http://localhost:3000/toys/${foundToy.id}`, {
    method: 'PATCH',
    headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
    body: JSON.stringify({likes: foundToy.likes})
    })
})
