document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded');
  fetchCategories()
});

function fetchCategories(){
  fetch('http://localhost:3000/categories')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let categories = createObjects(json)[0]
    let fish = createObjects(json)[1]
    createTiles(fish)
    createFilterEl(categories)
  });
}

function createObjects(json){
  let catObjArray = []
  let fishObjArray = []
  let objArray = []

  //create fish objects
  for (i = 0; i < json.included.length; i ++){
    fish = json.included[i].attributes
    newFish = new Fish(fish.id, fish.name, fish.description, fish.size, fish.img_url, json.included[i].relationships.category.data.id, fish.price, fish.number_in_stock)
    fishObjArray.push(newFish)
  }

  //create category objects
  for (let i = 0; i < json.data.length; i++){
    newCategory = new Category(json.data[i].id, json.data[i].attributes.name, [])
    for (let j = 0; j < json.data[i].relationships.fish.data.length; j++){
      newCategory.fish_ids.push(json.data[i].relationships.fish.data[j].id)
    }
    catObjArray.push(newCategory)
  }

  objArray.push(catObjArray, fishObjArray)
  return objArray
}





function createTiles(fish){
  for (let i = 0; i < fish.length; i++){
    tileDiv = backgroundTiles(fish, i)
    fishNames(fish, i, tileDiv)
    fishPictures(fish, i, tileDiv)
    descriptButton(fish, i, tileDiv)
    addPrice(fish, i, tileDiv)
    addInStock(fish, i, tileDiv)
  }
}

//creates number of tiles for the fish found
//adds fish names, pictures, and button to go to description
function backgroundTiles(fish, i){
    let tileDiv = createDiv('rectangle', i)
    document.body.appendChild(tileDiv)
    return tileDiv
  }

  //adds picture from the json to the tile
  function fishPictures(fish, i, element){
    const picDiv = createDiv('fishpic', i)
    const picImg = document.createElement('img')
    picImg.src = fish[i].img_url
    element.appendChild(picDiv)
    picDiv.appendChild(picImg)
  }

  function createDiv(className, i){
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', className)
    newDiv.setAttribute('id', `${className}${i}`)
    return newDiv
  }

  //adds fish name from the json to the tile
  function fishNames(fish, i, element){
    const nameDiv = createDiv('fishname', i)
    nameDiv.innerHTML = fish[i].name
    nameDiv.style.textAlign = 'center'
    element.appendChild(nameDiv)
  }

// creates "Description" button
  function descriptButton(fish, i, element){
    var buttonEl = document.createElement("button");
	  buttonEl.className = "descriptbtn";
    buttonEl.id = `descriptbtn${i}`
	  buttonEl.innerText = "Description";
    buttonEl.style.color = "blue"
    buttonEl.style.fontSize = '18px'
    buttonEl.style.borderradius = "20px"
	  element.appendChild(buttonEl);
  }

  function addPrice(fish, i, element){
    const newDiv = createDiv('price', i)
    newDiv.innerText = `Price: $${fish[i].price}`
    element.appendChild(newDiv)
  }

  function addInStock(fish, i, element){
    const inStockEl = createDiv('instock', i)
    if (fish[i].number_in_stock > 0){
      inStockEl.innerText = `Number in Stock: ${fish[i].number_in_stock}`
    }
    else{
      inStockEl.innerText = `Out of Stock`
      inStockEl.style.color = 'red'
    }
    element.appendChild(inStockEl)
  }

  function createFilterEl(objects){
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

    for (let i = 0; i < objects.length; i++){
      //json.data[i].attributes.name
      option = document.createElement("option")
      option.val = objects[i].name
      option.text = objects[i].name
      select.appendChild(option)
    }
    newDiv.appendChild(select)
    document.body.appendChild(newDiv)
  }

// creates listener for when the "Click for Description" button is pressed
  function descriptButtonListener(i, fish){
    document.getElementById(`descriptbtn${i}`).addEventListener("click", function(){hideImage(i, fish)});
  }

//hides elements and shows description
  function hideImage(i, fish){
    //hides image
    hideElement("fishpic", i)
    hideElement("descriptbtn", i)
    hideElement("price", i)
    hideElement("instock", i)

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
