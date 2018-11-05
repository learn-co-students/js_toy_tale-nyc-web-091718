
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')
  const inpName = document.getElementById('input_name')
  const inpURL = document.getElementById('input_url')
  let toyData = []
  let addToy = false
  let editToy = false



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
    let toyID = parseInt(event.target.dataset.id)
    let clickedToy = toyData.filter((toy) =>
      (toy.id === toyID)
    )
    let toyLiked = ++clickedToy[0].likes
    if (event.target.dataset.action === 'like') {
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
      let likesIncrement = event.target.parentNode.getElementsByTagName('p')[0]
      likesIncrement.innerText = parseInt(likesIncrement.innerText) + 1 + " Likes"
    }
    else if (event.target.dataset.action === 'edit') {


      // fetch(`http://localhost:3000/toys/${toyID}`, {
      //   method: 'PATCH',
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json"
      //   },
      //   body: JSON.stringify({
      //     "name":
      //   })
      // })
      // let likesIncrement = event.target.parentNode.getElementsByTagName('p')[0]
      // likesIncrement.innerText = parseInt(likesIncrement.innerText) + 1 + " Likes"
    }
  })

    addToyForm.addEventListener('submit', (event) => {
        event.preventDefault()
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
  // const editBtn = document.querySelector('#edit-btn')
  // editBtn.addEventListener('click', (event) => {
  //   if (event.target.dataset.id) {
  //     debugger
  //   // hide & seek with the form
  //   editToy = !editToy
  //   if (editToy) {
  //     toyForm.style.display = 'block'
  //     // submit listener here
  //   } else {
  //     toyForm.style.display = 'none'
  //   }}
  // })


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
      <button class="like-btn" data-id="${toy.id}" data-action="like">Like <3</button>
      <button id="edit-btn" class="edit-btn" data-id="${toy.id}" data-action="edit">Edit!</button>
      <form class="edit-toy-form" data-id="${toy.id}" style="">
        <h3>Edit a toy!</h3>

        <input id="edit_name" type="text" name="name" value="" placeholder="Enter a toy's name..." class="input-text">
        <br>
        <input id="edit_url" type="text" name="image" value="" placeholder="Enter a toy's image URL..." class="input-text">
        <br>
        <input type="submit" name="submit" value="Edit Toy" class="submit">
      </form>
      </div>`
    })


})



// OR HERE!
