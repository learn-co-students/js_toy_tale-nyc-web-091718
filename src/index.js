const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyContainer = document.querySelector('#toy-collection');
const newToyForm = document.querySelector('.add-toy-form');
let allToys

// Listeners

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

newToyForm.addEventListener('submit',(event) => {
  event.preventDefault();
  makeNewToy(event)
  })

toyContainer.addEventListener('click', (event) => {
  let toyCard = event.target.parentElement
  let clicked = Array.from(event.target.classList)
  if (clicked.includes('like-btn')) {
    let toyNum = event.target.parentElement.dataset['id']
    let foundToy = allToys.find(toy => toy.id == toyNum)
    fetch(`http://localhost:3000/toys/${foundToy.id}`,
      { method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "likes": ++foundToy.likes })
      }).then(toy => {
        toyCard.parentElement.innerHTML = `
          <div class="card" data-id="${toyNum}">
            <h2>${foundToy.name}</h2>
            <img src=${foundToy.image} class="toy-avatar" />
            <p>${foundToy.likes} Likes </p>
            <button class="like-btn">Like <3</button>
          </div>
          `
      })
  }
  // debugger
})

// to fetch all toys
// find container
// fetch all & add to innerHTML

fetch('http://localhost:3000/toys')
  .then(response => (response.json()))
  .then(toyData => {
    allToys = toyData;
    allToys.forEach(toy => {
    toyContainer.innerHTML += `
    <div class="card" data-id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `
    })
  })

  function makeNewToy(event) {
    let input = event.target.querySelectorAll('.input-text')
    let newName = input[0].value
    let newImage = input[1].value
    fetch('http://localhost:3000/toys',
      { method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": newName,
          "image": newImage
        })
      })
      .then(resp => resp.json())
      .then(toy => {
        toyContainer.innerHTML += `
        <div class="card" data-id="${toy.id}">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>0 Likes </p>
          <button class="like-btn">Like <3</button>
        </div>
        `
      })
  }

  function likeToy() {
    console.log("clicked");
  }


// adding a new toy
// find the form & listen for submit
// interupt the default
// grab input & fetch to server
// receive & parse new info
// render new info


// OR HERE!
