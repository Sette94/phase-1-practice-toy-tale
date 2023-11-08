let addToy = false;

const toyUrl = "http://127.0.0.1:3000/toys/"

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyContainer = document.getElementById('toy-collection')

let allToys = ""


fetch(toyUrl)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(toys => {
      // console.log(toys) //Give me every toy in the array of objects
      renderToy(toys)

    })
  })
//const toyFormContainer = document.getElementByClassName("add-toy-form")

toyFormContainer.addEventListener('submit', (e) => {
  e.preventDefault()
  //debugger

  let postData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }


  fetch(toyUrl, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  }).then(res => {
    if (res.ok) {
      renderToy(postData)
    }
  });


})

function renderToy(toys) {
  // Get data from Toys and add them to cards on the page. 
  let toyName = toys.name
  let toyImage = toys.image
  let toyLikes = toys.likes

  let toyCardContainer = document.createElement('div')
  toyCardContainer.classList.add("card")


  let toyH2 = document.createElement('h2')
  toyH2.textContent = toyName

  let toyImageContainer = document.createElement('img')
  toyImageContainer.src = toyImage
  toyImageContainer.height = 250
  toyImageContainer.width = 250

  let toyLikeButton = document.createElement('button')
  toyLikeButton.classList.add('like-btn')
  toyLikeButton.innerHTML = 'Likes'

  let toyLikeContainer = document.createElement('p')
  toyLikeContainer.textContent = toyLikes


  toyCardContainer.appendChild(toyH2)
  toyCardContainer.appendChild(toyImageContainer)
  toyCardContainer.appendChild(toyLikeContainer)
  toyCardContainer.appendChild(toyLikeButton)
  toyContainer.appendChild(toyCardContainer)


  toyLikeButton.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(toys)
    toyLikes += 1

    let likesObj = {
      likes: toyLikes
    }

    fetch(toyUrl + toys.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likesObj)
    }).then(res => {
      if (res.ok) {
        toyLikeContainer.textContent = toyLikes
      }
    })


  })


}


addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

