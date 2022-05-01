document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded')
  fetchFish()
  backgroundTiles()
  fishPictures()
});

function fetchFish(){
  fetch('http://localhost:3000/fish')
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(json) {
    console.log(json[0].name)
  });
}

function backgroundTiles(){
  for (let i = 1; i <= 6; i++){
    const newSpan = document.createElement('div')
    newSpan.setAttribute('id', 'rectangle')
    document.body.appendChild(newSpan)
    }
  }

  function fishPictures(){
    let fish = "fish"
    console.log(fish)
  }
