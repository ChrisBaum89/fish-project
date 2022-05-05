document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded');
  fetchCategories()
});

function fetchFish(){
  fetch('http://localhost:3000/fish')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    //fetchCategories()
    backgroundTiles(json);
    filterEventListener(json)
  });
}

function fetchCategories(){
  fetch('http://localhost:3000/categories')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    createObjects(json)
    createFilter(json)
    fetchFish()
  });
}

function createObjects(json){
  let catObjArray = []
  let fishObjArray = []

  //create fish objects
  for (i = 0; i < json.included.length; i ++){
    fish = json.included[i].attributes
    newFish = new Fish(fish.id, fish.name, fish.description, fish.size, fish.img_url, json.included[i].relationships.category.data.id, fish.price, fish.number_in_stock)
    fishObjArray.push(newFish)
  }

  //create category objects
  console.log(json)
  for (let i = 0; i < json.data.length; i++){
    newCategory = new Category(json.data[i].id, json.data[i].attributes.name, [])
    for (let j = 0; j < json.data[i].relationships.fish.data.length; j++){
      newCategory.fish_ids.push(json.data[i].relationships.fish.data[j].id)
    }
  }

  //assign fish objects to category objects
  for (i = 0; i < catObjArray.length; i++){
    catObjArray[0].fish.push(fishObjArray.all)

  }

  return fishObjArray
}

function createFilter(json){
  let filterArray = [];
  var newDiv = document.createElement('div')
  var select = document.createElement("select")
  newDiv.setAttribute('class', 'filter')
  newDiv.setAttribute('id', `filter`)
  newDiv.innerText = "Filter by Category:  "
  select.name = "categories"
  select.id = "categories"
  option = document.createElement("option")
  option.val = ""
  option.text = ""
  select.appendChild(option)

  for (let i = 0; i < json.data.length; i++){
    //json.data[i].attributes.name
    option = document.createElement("option")
    option.val = json.data[i].attributes.name
    option.text = json.data[i].attributes.name
    select.appendChild(option)
  }
  newDiv.appendChild(select)
  document.body.appendChild(newDiv)
}

function filterEventListener(json){
  document.getElementById(`filter`).addEventListener("change", function(){performFilter(json)});
}

function performFilter(json){
  //event.targe.value gives you the value of the filter
  for (let i = 0; i < json.length; i++){
    fetch(`http://localhost:3000/categories`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      //console.log(json)
    });

  }
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
    addPrice(i, json, newDiv)
    addInStock(i, json, newDiv)
    }
  }

  //adds picture from the json to the tile
  function fishPictures(json, i, element){
    const newDiv = document.createElement('div')
    const newImg = document.createElement('img')
    newImg.setAttribute('class', 'fishpic')
    newImg.setAttribute('id', `fishpic${i}`)
    newImg.src = json[i].img_url
    element.appendChild(newDiv)
    newDiv.appendChild(newImg)
  }

  //adds fish name from the json to the tile
  function fishNames(json, i, element){
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'fishname')
    newDiv.setAttribute('id', `fishname${i}`)
    newDiv.innerHTML = json[i].name
    newDiv.style.textAlign = 'center'
    element.appendChild(newDiv)
  }

// creates "Description" button
  function descriptButton(i, element, json){
    var buttonEl = document.createElement("button");
	  buttonEl.className = "descriptbtn";
    buttonEl.id = `descriptbtn${i}`
	  buttonEl.innerText = "Description";
    buttonEl.style.color = "blue"
    buttonEl.style.fontSize = '18px'
    buttonEl.style.borderradius = "20px"
	  //buttonTextEl.appendChild(buttonTextEl);
	  element.appendChild(buttonEl);
    descriptButtonListener(i, json)
  }

// creates listener for when the "Click for Description" button is pressed
  function descriptButtonListener(i, json){
    document.getElementById(`descriptbtn${i}`).addEventListener("click", function(){hideImage(i, json)});
  }

//hides elements and shows description
  function hideImage(i, json){
    //hides image
    console.log(document.getElementById(`descriptbtn${i}`))
    hideElement("fishpic", i)
    hideElement("descriptbtn", i)
    hideElement("price", i)
    hideElement("instock", i)
    //document.getElementById(`descriptbtn${i}`).style.display= `none`
    //document.getElementById(`price${i}`).style.display = `none`
    showDescription(i, json)
  }

  function showDescription(i, json){
    //checks if fishdesc element alread exists.  If it doesn't then it creates it
    if (document.getElementById(`fishdesc${i}`)){
      showElement('fishdesc', i, "block")
      showElement('imgbtn', i, "initial")
    }
    else{
      const tile = document.getElementById(`rectangle${i}`)
      const newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'fishdesc')
      newDiv.setAttribute('id', `fishdesc${i}`)
      newDiv.innerHTML = `\n${json[i].description}`
      newDiv.style.fontSize = '16px'
      //newDiv.style.font = "American Typewriter";
      element = tile.appendChild(newDiv)
      imgButton(i, element, json)
    }
  }

  function imgButton(i, element, json){
    //checks if elements already exist, if not then it creates them
    if (document.getElementById(`imgbtn${i}`)){
      showElement('fishdesc', i, "block")
      showElement('imgbtn', i, "initial")
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
    hideElement("fishdesc", i)
    showElement("fishpic", i, "block")
    showElement("descriptbtn", i, "block")
    showElement("price", i, "block")
    showElement("instock", i, "block")
  }

  function imgButtonListener(i, json){
    document.getElementById(`imgbtn${i}`).addEventListener("click", function(){displayImage(i, json)});
  }

  function addPrice(i, json, element){
    var priceEl = document.createElement("div")
    priceEl.setAttribute("class", "price")
    priceEl.setAttribute("id", `price${i}`)
    priceEl.innerText = `Price: $${json[i].price}`
    element.appendChild(priceEl)
  }

  function addInStock(i, json, element){
    var inStockEl = document.createElement("div")
    inStockEl.setAttribute("class", "instock")
    inStockEl.setAttribute("id", `instock${i}`)
    if (json[i].number_in_stock > 0){
      inStockEl.innerText = `Number in Stock: ${json[i].number_in_stock}`
    }
    else{
      inStockEl.innerText = `Out of Stock`
      inStockEl.style.color = 'red'
    }
    element.appendChild(inStockEl)
  }

  function hideElement(className, i){
    document.getElementById(`${className}${i}`).style.display= `none`
  }

  function showElement(className, i, showType){
    document.getElementById(`${className}${i}`).style.display = `${showType}`
  }

  class Category {
    constructor(id, name, fish_ids){
      this.id = id
      this.name = name
      this.fish_ids = fish_ids
    }
   }

  class Fish {
    constructor(id, name, description, size, img_url, category_id, price, number_in_stock){
      this.id = id
      this.name = name
      this.description = description
      this.size = size
      this.img_url = img_url
      this.category_id = category_id
      this.price = price
      this.number_in_stock = number_in_stock
    }
  }
