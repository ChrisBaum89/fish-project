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
    console.log(newDiv)
    document.body.appendChild(newDiv)
    fishNames(json, i, newDiv)
    fishPictures(json, i, newDiv)
    descripButton(i , newDiv)
    descripButtonListender(i, json)
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

  function descripButton(i, element){
    var buttonEl = document.createElement("a");
	  var buttonTextEl = document.createElement("span");
	  buttonTextEl.className = "descripbtn";
    buttonTextEl.id = `descripbtn${i}`
	  buttonTextEl.innerText = '\n'+"Click for Description";
    buttonTextEl.style.color = "blue"
	  buttonEl.appendChild(buttonTextEl);
	  element.appendChild(buttonEl);
  }

  function descripButtonListender(i, json){
    document.getElementById(`descripbtn${i}`).addEventListener("click", function(){displayDescription(i, json)});
  }

  function displayDescription(i, json){
    //removes image
    document.getElementById(`fishpic${i}`).style.display="none"
    //removes 'show description button'
    document.getElementById(`descripbtn${i}`).style.display="none"
  }
