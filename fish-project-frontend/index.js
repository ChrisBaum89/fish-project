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
  });
}

function backgroundTiles(json){
  for (let i = 0; i < json.length; i++){
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'rectangle')
    newDiv.setAttribute('id', `rectangle${i}`)
    document.body.appendChild(newDiv)
    fishNames(json, i, newDiv)
    fishPictures(json, i, newDiv)
    descriptButton(i , newDiv, json)
    }
  }

  function fishPictures(json, i, element){
    const newImg = document.createElement('img')
    newImg.setAttribute('class', 'fishpic')
    newImg.setAttribute('id', `fishpic${i}`)
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

  function descriptButton(i, element, json){
    var buttonEl = document.createElement("a");
	  var buttonTextEl = document.createElement("span");
	  buttonTextEl.className = "descriptbtn";
    buttonTextEl.id = `descriptbtn${i}`
	  buttonTextEl.innerText = '\n'+"Click for Description";
    buttonTextEl.style.color = "blue"
	  buttonEl.appendChild(buttonTextEl);
	  element.appendChild(buttonEl);
    descriptButtonListener(i, json)
  }

  function descriptButtonListener(i, json){
    document.getElementById(`descriptbtn${i}`).addEventListener("click", function(){displayDescription(i, json)});
  }

  function displayDescription(i, json){
    console.log('in displayDescription')
    //removes image
    document.getElementById(`fishpic${i}`).style.display="none"
    //removes 'show description button'
    document.getElementById(`descriptbtn${i}`).style.display="none"
    showDescription(i, json)
  }

  function showDescription(i, json){
    const tile = document.getElementById(`rectangle${i}`)
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'fishdesc')
    newDiv.setAttribute('id', `fishdesc${i}`)
    newDiv.innerHTML = json[i].description
    newDiv.style.fontSize = '16px'
    element = tile.appendChild(newDiv)
    imgButton(i, element, json)
  }

  function imgButton(i, element, json){
    var buttonEl = document.createElement("a");
    var buttonTextEl = document.createElement("span");
    buttonTextEl.className = "imgbtn";
    buttonTextEl.id = `imgbtn${i}`
    buttonTextEl.innerText = '\n'+"Click for Image";
    buttonTextEl.style.color = "blue"
    buttonEl.appendChild(buttonTextEl);
    element.appendChild(buttonEl);
    imgButtonListener(i, json)
  }

  function displayImage(i, json){
    document.getElementById(`fishdesc${i}`).style.display="none"
    document.getElementById(`fishpic${i}`).style.display="initial"
    //removes 'show description button'
    document.getElementById(`descriptbtn${i}`).style.display="initial"
  }

  function imgButtonListener(i, json){
    document.getElementById(`imgbtn${i}`).addEventListener("click", function(){displayImage(i, json)});
  }
