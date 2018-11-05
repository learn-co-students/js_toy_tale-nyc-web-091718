const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
// const likeButton = document.querySelector('.like-btn')
let addToy = false
let toys;

// YOUR CODE HERE

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


// OR HERE!

  fetch('http://localhost:3000/toys')
  .then((response) => (response.json()))
  .then(responseObj => {
    toys = responseObj
    toys.forEach(toy => makeToyCard(toy))
  })


  function makeToyCard(toy) {
    toyCollection.innerHTML += `
    <div class="card" data-id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `
  }

  addToyForm.addEventListener('submit', function() {
    event.preventDefault()
    //update database first
    // update local variable
    // DOM
    // debugger
    //refactor?
    const newToyName = event.target.querySelector('#name').value
    const newToyImage = event.target.querySelector('#image').value

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImage,
        likes: 0
      })
    }).then(response => (response.json()))
    .then(newToyObj => {
      toys.push(newToyObj)
      makeToyCard(newToyObj)
    })


  }) //end of addEventListener

  toyCollection.addEventListener('click', likeToy)

  function likeToy(event) {
    let toyId  = event.target.parentElement.dataset.id
    let foundToy = toys.find((toy) => toy.id == toyId)

      if (Array.from(event.target.classList).includes('like-btn')) {
        //increase like in database first
        fetch(`http://localhost:3000/toys/${foundToy.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            likes: ++foundToy.likes
          })
        }).then(event.target.parentElement.querySelector('p').innerText = `${foundToy.likes} Likes` )
      }
  }
