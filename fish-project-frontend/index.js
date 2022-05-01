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
    fishNames(json, i, newDiv)
    fishPictures(json, i, newDiv)
    }
  }

  function fishPictures(json, i, element){
    const newImg = document.createElement('img')
    newImg.setAttribute('class', 'fishpic')
    newImg.src = json[i].img_url
    newImg.width = 250;
    newImg.height = 200;
    element.appendChild(newImg)
  }

  function fishNames(json, i, element){
    element.innerHTML = json[i].name
    element.style.textAlign = 'center'
    element.style.fontSize = '20px';

  }
