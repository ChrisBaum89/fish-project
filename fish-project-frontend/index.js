document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded')
  addFishTiles()
  fetchCategories()
  fetchFish()
});

function addFishTiles(){
  for (let i = 1; i <= 6; i++){
    const newSpan = document.createElement('div')
    newSpan.setAttribute('id', 'rectangle')
    //newSpan.setAttribute('id', `rectangle${i}`)
    document.body.appendChild(newSpan)

  }

function fetchCategories(){
  
}

function fetchFish(){
  fetch('http://api.open-notify.org/astros.json')
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(json) {
    console.log(json);
  });
}
