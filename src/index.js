const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyDiv = document.querySelector('#toy-collection');
let toyArray = [];
// YOUR CODE HERE

fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(toyJson) {
    toyArray = toyJson;
    const toyHTML = toyArray.map((toy) => {
      return `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
      </div>
      `
    }).join('');
    toyDiv.innerHTML = toyHTML;
  });


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (event) =>{
      event.preventDefault();
      // event.target is the form
      // console.log(event)
      // console.log(event.target)
      const toyName = event.target.name.value;
      const toyImg = event.target.image.value;
      const toyLikes = 0;
        fetch('http://localhost:3000/toys',{
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: toyName,
            image: toyImg,
            likes: toyLikes
          })
        })
        .then(response => {
          return response.json();
        })
        .then(json => {
          toyArray.push(json);

          toyDiv.innerHTML += `
          <div dataclass="card">
            <h2>${toyName}</h2>
            <img src=${toyImg} class="toy-avatar" />
            <p>${toyLikes} Likes </p>
            <button data-id="${json.id}" class="like-btn">Like <3</button>
          </div>
          `
        })

    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
toyDiv.addEventListener('click', (event) => {
  // event.target is the button element clicked
  if (event.target.className === 'like-btn') {
    const toyId = parseInt(event.target.dataset.id);
    const targetToyIndex = toyArray.findIndex(t => t.id == toyId)
    const toyLikeP = event.target.parentElement.querySelector('p')
    let likeNum = parseInt(toyLikeP.innerText);
    likeNum++;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likeNum
      })
    })
    .then(resp => resp.json())
    .then(updatedToy => {
      toyArray[targetToyIndex] = updatedToy;
      toyLikeP.innerText = `${updatedToy.likes} Likes`
    })
  }
})
