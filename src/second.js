document.addEventListener('DOMContentLoaded', () => {

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
let url = `http://localhost:3000/toys`

function fetchAllToys(){
  fetch(url)
  .then(response => response.json())
  .then((parsedResponse) => {
    toys = parsedResponse
    addToyToDom(toys)
  })
}

  function addToyToDom(toys){
    toys.forEach((toy) => {
      // console.log(toy)
      toyCollection.innerHTML += `
      <div class="card" data-id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-id="${toy.id}" class="increase-likes">${toy.likes} Likes</p>
      <button class="like-btn" data-id="${toy.id}"> Like<3 </button>
      <button class="delete-btn" data-id="${toy.id}"> Delete </button>
    </div>`
    })
  }


  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (event.target.submit.name === 'submit'){

      let toyName = event.target.querySelector('#input_name')
      let toyUrl = event.target.querySelector('#input_url')
      console.log(url)
      fetch(url, {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify (
        {
          "name": `${toyName.value}`,
          "image": `${toyUrl.value}`,
          "likes": 0
        })
      })
      .then(res => res.json())
      .then((parsedResponse) => {
        toyCollection.innerHTML +=
        `<div class="card" data-id="${parsedResponse.id}">
        <h2>${parsedResponse.name}</h2>
        <img src=${parsedResponse.image} class="toy-avatar" />
        <p data-id="${parsedResponse.id}" class="increase-likes">${parsedResponse.likes} Likes</p>
        <button class="like-btn" data-id='${parsedResponse.id}'> Like<3 </button>
        <button class="delete-btn" data-id='${parsedResponse.id}'> Delete Me </button>
      </div>`
      })
    }// end of if
  })

  toyCollection.addEventListener('click', (event) => {
    let toyId = event.target.dataset.id

    if (event.target.className === 'like-btn'){
      let increaseLikes = event.target.parentElement.querySelector('.increase-likes').innerHTML.split(' ')[0]
      let postLikes = parseInt(increaseLikes) + 1

      fetch(url + `/${toyId}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify (
        {
          "likes": postLikes
        })
      })
      .then(res => res.json())
      .then((parsedResponse) => {
        // console.log(parsedResponse.likes)
        event.target.parentElement.querySelector('.increase-likes').innerText =  parsedResponse.likes + " Likes"
      })
    } else if (event.target.className === 'delete-btn'){
        if (event.target.dataset.id === event.target.parentElement.dataset.id){
        event.target.parentElement.remove() }

        fetch(url + `/${toyId}`, {
          method: 'DELETE',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        })
      } // else if statement
  }) //end event listener


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



fetchAllToys()

})// end doc event listener
