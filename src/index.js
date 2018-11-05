document.addEventListener('DOMContentLoaded', function() {
  const URL = 'http://localhost:3000/toys'

  /* Constant variables referring to HTML elements we will need */
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyFormForm = document.querySelector('.add-toy-form')
  /* Where we will be holding toy cards */
  const toyCollectionDiv = document.querySelector('#toy-collection')

  let addToy = false
  let allToys = [] // Client-Side collection of all toy objects

  /* Fetchy them toys ONCE, when page loads. */

  fetch(URL)
    .then((responseObject) => responseObject.json())
    .then((toysJSONData) => {
      allToys = toysJSONData
      renderToys()
    })

  /* Functions */
  const renderToys = () => {
    console.log("Trying TO Render");
    console.dir(allToys)
    toyCollectionDiv.innerHTML = ''

    allToys.forEach((toy) => {
      console.log(toy)
      toyCollectionDiv.innerHTML +=
      `
      <div data-id="${toy.id}" class="card">
        <h2>${toy.name}</h2>
        <img class="toy-avatar" src="${toy.image}">
        <p>${toy.likes} Likes</p>
        <button class="like-btn">Like ❤️</button>
      </div>
      `
    })
  }

  /* Event Listeners */
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

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newName = event.target.name.value;
    const newImg = event.target.image.value;

    fetch(URL, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": newName,
        "image": newImg,
        "likes": 0
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      allToys.push(json)
      console.log(json)
      toyFormForm.reset()
      renderToys()
    })
  })

  /* EVENT DELEGATION */
  toyCollectionDiv.addEventListener('click', (event) => {
    // Verify that a liek button was cicked
    if (event.target.className === "like-btn") {
      const toyId = event.target.parentNode.dataset.id
      let toy = allToys.find(toy => toy.id == toyId)   // Find toy by its ID
      const newLikes = toy.likes + 1;
      // Persit change to database

      fetch(URL+`/${toy.id}`, {
        method: "PATCH",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
      .then(response => response.json())
      .then((json) => {
        let id = json.id
        console.log(id)
        let toyIndex = allToys.findIndex(toy => toy.id == id)
        console.log(allToys[toyIndex])
        allToys[toyIndex].likes++
        console.log(allToys[toyIndex])
        //console.log(allToys)
        //debugger
        // allToys[json.id - 1].likes += 1
        renderToys()
      })

      //console.log(toy)
    }
  })
})
