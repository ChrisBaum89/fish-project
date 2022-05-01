document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded');
  fetchFish();
});

function fetchFish(){
  fetch('http://localhost:3000/fish')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    backgroundTiles(json);
    fishPictures(json)
  });
}

function backgroundTiles(json){
  for (let i = 0; i < json.length; i++){
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'rectangle')
    newDiv.setAttribute('id', `rectangle${i}`)
    console.log(newDiv)
    document.body.appendChild(newDiv)
    }
  }

  function fishPictures(json){
    for (let i = 0; i < json.length; i++){
      var elementDiv = document.getElementById(`rectangle${i}`)
      const newImg = document.createElement('img')
      newImg.src = json[i].img_url
      newImg.width = 100;
      newImg.height = 100;
      elementDiv.appendChild(newImg)
    }
  }
