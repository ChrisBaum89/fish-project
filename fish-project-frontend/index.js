document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded');
  fetchFish();
});

function fetchFish(){
  fetch('http://localhost:3000/fish')
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(json) {
    backgroundTiles(json);
    //fishPictures(json)
  });
}

function backgroundTiles(json){
  for (let i = 1; i <= json.length; i++){
    const newSpan = document.createElement('div')
    newSpan.setAttribute('id', 'rectangle' + i)
    document.body.appendChild(newSpan)
    }
  }

  function fishPictures(json){
    for (let i = 1; i <= json.length; i++){
      console.log(i)
      var elementDiv = document.getElementById('rectangle'+i)
      const newImg = document.createElement('img')
      newImg.src = json[i].img_url
      newImg.width = 100;
      newImg.height = 100;
      document.getElementById('rectangle'+i).appendChild(newImg)
    }
  }
