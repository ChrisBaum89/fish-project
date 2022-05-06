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
    filterEventListener(fish, categories)
    createContactEl()
    contactListener()
    createContactPage()
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
    descripButton(fish, i, tileDiv)
    addPrice(fish, i, tileDiv)
    addInStock(fish, i, tileDiv)
    descripButtonListener(fish, i)
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
  function descripButton(fish, i, element){
    var buttonEl = document.createElement("button");
	  buttonEl.className = "descripbtn";
    buttonEl.id = `descripbtn${i}`
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

    var filterDiv = createDiv('filter', i)
    filterDiv.id = 'filter'
    filterDiv.innerText = "Filter by Category:  "
    var select = document.createElement("select")
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
    filterDiv.appendChild(select)
    document.body.appendChild(filterDiv)
  }

  function createContactEl(){
    var contactDiv = createDiv('contact', 1)
    contactDiv.id = 'contact'
    contactDiv.innerText = "Contact Us"
    document.body.appendChild(contactDiv)
  }

  function createContactPage(){
    var contactDiv = createDiv('contactpage', 1)
    contactDiv.id = 'contactpage'
    document.body.appendChild(contactDiv)
    createContactPageEntries(contactDiv)
  }

  function createContactPageEntries(contactDiv){
    createLabel("firstname", "First Name:", contactDiv)
    createTextInputBox("firstname", contactDiv)
  }

  function createLabel(label, text, element){
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", label);
    newLabel.innerHTML = text;
    element.appendChild(newLabel);
  }

  function createTextInputBox(idname, element){
    const input = document.createElement("input");
    input.setAttribute("id", idname);
    input.setAttribute("type", "text");
    element.appendChild(input);
  }



// creates listener for when the "Click for Description" button is pressed
  function descripButtonListener(fish, i){
    document.getElementById(`descripbtn${i}`).addEventListener("click", function(){switchToDescription(fish, i)});
  }

  function filterEventListener(fish, categories){
    document.getElementById(`filter`).addEventListener("change", function(){performFilter(fish, categories, event.target.value)});
  }

  function contactListener(){
    document.getElementById('contact').addEventListener("click", function(){switchToContact()});
  }

  function switchToDescription(fish, i){
    hideImageElements(fish, i)
    showDescription(fish, i)
    imgButton(fish, i)
    imgButtonListener(fish, i)
  }

//hides elements and shows description
  function hideImageElements(fish, i){
    //hides image
    hideElement("fishpic", i)
    hideElement("descripbtn", i)
    hideElement("price", i)
    hideElement("instock", i)
  }

  function showDescription(fish, i){
    //checks if fishdesc element alread exists.  If it doesn't then it creates it
    if (document.getElementById(`fishdescrip${i}`)){
      showElement('fishdescrip', i, "block")
      showElement('imgbtn', i, "block")
    }
    else{
      const tile = document.getElementById(`rectangle${i}`)
      const descripDiv = createDiv('fishdescrip', i)
      descripDiv.innerHTML = `\n${fish[i].description}`
      descripDiv.style.fontSize = '16px'
      //newDiv.style.font = "American Typewriter";
      element = tile.appendChild(descripDiv)
    }
  }

  function imgButton(fish, i){
    //checks if elements already exist, if not then it creates them
    if (document.getElementById(`imgbtn${i}`)){
      showElement('fishdescrip', i, "block")
      showElement('imgbtn', i, "initial")
    }
    else{
      const tile = document.getElementById(`rectangle${i}`)
      let buttonEl = createDiv('imgbtn', i)
      buttonEl.innerText = '\n'+"<<";
      element.appendChild(buttonEl);
    }
  }

  function imgButtonListener(fish, i){
    document.getElementById(`imgbtn${i}`).addEventListener("click", function(){switchToImage(fish, i)});
  }

  function switchToImage(fish, i){
    hideElement("fishdescrip", i)
    hideElement("imgbtn", i)
    showElement("fishpic", i, "block")
    showElement("descripbtn", i, "block")
    showElement("price", i, "block")
    showElement("instock", i, "block")
  }

  function performFilter(fish, categories, eventValue){

    for (let i = 0; i < fish.length; i++){
      showElement('rectangle', i, 'block')

      if (eventValue != ""){
        let category = categories.find(category => category.name === eventValue)
        if (fish[i].category_id != category.id) {
          hideElement('rectangle', i)
        }
      }

    }

  }

  function switchToContact(){
    console.log('switch to contact')
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
