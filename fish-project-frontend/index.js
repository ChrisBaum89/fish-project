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

//creates number of tiles for the fish found
//adds fish names, pictures, and button to go to description
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

  //adds picture from the json to the tile
  function fishPictures(json, i, element){
    const newImg = document.createElement('img')
    newImg.setAttribute('class', 'fishpic')
    newImg.setAttribute('id', `fishpic${i}`)
    newImg.src = json[i].img_url
    newImg.width = 250;
    newImg.height = 200;
    element.appendChild(newImg)
  }

  //adds fish name from the json to the tile
  function fishNames(json, i, element){
    element.innerHTML = json[i].name
    element.style.textAlign = 'center'
    element.style.fontSize = '20px';
  }

// creates "Click for Description" button
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

// creates listener for when the "Click for Description" button is pressed
  function descriptButtonListener(i, json){
    document.getElementById(`descriptbtn${i}`).addEventListener("click", function(){displayDescription(i, json)});
  }

//hides elements and shows description
  function displayDescription(i, json){
    //hides image
    document.getElementById(`fishpic${i}`).style.display="none"
    //hides 'show description button'
    document.getElementById(`descriptbtn${i}`).style.display="none"
    showDescription(i, json)
  }

  function showDescription(i, json){
    //checks if fishdesc element alread exists.  If it doesn't then it creates it
    if (document.getElementById(`fishdesc${i}`)){
      document.getElementById(`fishdesc${i}`).style.display="block"
      document.getElementById(`imgbtn${i}`).style.display="initial"
    }
    else{
      const tile = document.getElementById(`rectangle${i}`)
      const newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'fishdesc')
      newDiv.setAttribute('id', `fishdesc${i}`)
      newDiv.innerHTML = `\n${json[i].description}`
      newDiv.style.fontSize = '16px'
      element = tile.appendChild(newDiv)
      imgButton(i, element, json)
    }
  }

  function imgButton(i, element, json){
    //checks if elements already exist, if not then it creates them
    if (document.getElementById(`imgbtn${i}`)){
      //unhides fish description if it exists
      document.getElementById(`fishdesc${i}`).style.display="block"
      //unhides "Click for Image" if it exists
      document.getElementById(`imgbtn${i}`).style.display="initial"
    }
    else{
      var buttonEl = document.createElement("a");
      var buttonTextEl = document.createElement("span");
      buttonTextEl.className = "imgbtn";
      buttonTextEl.id = `imgbtn${i}`
      buttonTextEl.innerText = '\n'+"<<";
      buttonTextEl.style.color = "blue"
      buttonTextEl.style.fontSize = '20px'
      buttonEl.appendChild(buttonTextEl);
      element.appendChild(buttonEl);
      imgButtonListener(i, json)
    }
  }

  function displayImage(i, json){
    //hides description
    document.getElementById(`fishdesc${i}`).style.display="none"
    //unhides picture
    document.getElementById(`fishpic${i}`).style.display="initial"
    //unhides "Click for Description"
    document.getElementById(`descriptbtn${i}`).style.display="initial"
  }

  function imgButtonListener(i, json){
    document.getElementById(`imgbtn${i}`).addEventListener("click", function(){displayImage(i, json)});
  }
