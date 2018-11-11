document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')
  let toyData = []
  let addToy = false


  fetch('http://localhost:3000/toys')
  .then((response) => {
    return response.json()
    // debugger
  }).then((json) => {
    toyData = json
    // console.log(toyData)
    // toyData.forEach((toy) => {
    // debugger
     toyData.forEach((toy)=>{
      // debugger
      toyCollection.innerHTML += toyCard(toy)
    })

    // })
  })

  // const likeButton = document.querySelector('.like-btn')
  // debugger
  toyCollection.addEventListener('click', (event) => {
    // debugger
    // console.log(toyData)
    if (event.target.dataset.id) {
      let toyID = parseInt(event.target.dataset.id)
      let clickedToy = toyData.filter((toy) =>
        (toy.id === toyID)
      )
      // console.log(clickedToy)
      // debugger
      let toyLiked = ++clickedToy[0].likes
      // console.log(toyLikes)
      fetch(`http://localhost:3000/toys/${toyID}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": toyLiked
        })
      })
      // debugger
      let likesIncrement = event.target.parentNode.getElementsByTagName('p')[0]
      likesIncrement.innerText = parseInt(likesIncrement.innerText) + 1 + " Likes"
      // debugger
      // console.log(event.target)}
    }})

    addToyForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const inpName = document.getElementById('input_name')
        const inpURL = document.getElementById('input_url')
        // debugger
        fetch(`http://localhost:3000/toys/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": `${inpName.value}`,
            "image": `${inpURL.value}`,
            "likes": 0
          })
        }).then((response)=>{
            return parsedJSON = response.json()
          }).then((parsedJSON)=> {
          toyData.push(parsedJSON)
          debugger
          let newToyCard = toyCard(parsedJSON)
          toyCollection.innerHTML += newToyCard
        })
    })
        // debugger
        // toyCollection.innerHTML += toyCard()
        // debugger
        // console.log(event.target)}


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

  const toyCard = ((toy) => {
    // debugger
    // return toyArray.map((toy) => {
      // debugger
      return `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-likes=${toy.id}>${toy.likes} Likes </p>
      <button class="like-btn" data-id="${toy.id}">Like <3</button>
      </div>`
    })


})


//Notes
//e.target.className - to get a class
//target.parentElement.querySelector('p' or 'className')
//parseInt(whatever you want to get from the innerText that is just a number)
//create a toy: 
// OR HERE!
