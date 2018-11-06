const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyDiv = document.querySelector('#toy-collection');
// const likeButton = document.querySelector('#')
let addToy = false
let toyArray = [];

// YOUR CODE HERE
fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  })
  .then(function(myJson){
    toyArray = myJson;
    const toyHTML = toyArray.map((toy) => {
      return `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar"/>
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
      </div>
    `
    }).join('');
    toyDiv.innerHTML = toyHTML;
  })

toyDiv.addEventListener('click', () => {
  if (event.target.className === 'like-btn'){
    let toyId = parseInt(event.target.dataset.id);
    let toyParentLikes = event.target.parentElement.querySelector("p");
    let num = parseInt(event.target.parentElement.querySelector("p").innerText);
    let index = toyArray.findIndex((t) => t.id == toyId);
    num++
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type" : "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        likes: num
      })
    })
      .then(response => response.json())
      .then(updatedCard => {
        toyArray[index] = updatedCard;
        toyParentLikes.innerText = `${updatedCard.likes} Likes`
      })
  }
});

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (event) =>{
      event.preventDefault();
      const name = event.target.name.value;
      const image = event.target.image.value;

        fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            name: name,
            image: image,
            likes: 0
          })
        })
        .then(response => {
          return response.json();
        }).then(json => {
          toyArray.push(json);
          toyDiv.innerHTML += `
          <div class="card">
            <h2>${name}</h2>
            <img src=${image} class="toy-avatar"/>
            <p>${0} Likes </p>
            <button data-id="${json.id}" class="like-btn">Like <3</button>
          </div>
        `;
        })

    })
    // end listener
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
