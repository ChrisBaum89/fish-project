document.addEventListener( "DOMContentLoaded", function () {
  fetchCategories()
});

//obtain data from API
function fetchCategories(){
  fetch('http://localhost:3000/categories')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let categoriesArray = createObjects(json)[0]
    let fishArray = createObjects(json)[1]
    addTiles(fishArray)
    addFilterEl(categoriesArray)
    addContactEl()
    filterEventListener(fishArray, categoriesArray)
    contactListener()
  });
}

function createObjects(json){
  let catObjArray = []
  let fishObjArray = []
  let objArray = []

  //create fish objects
  for (i = 0; i < json.length; i ++){
    for (j = 0; j < json[i].fish.length; j++){
      fish = json[i].fish[j]
      newFish = new Fish(fish.id, fish.name, fish.description, fish.size, fish.vid_url, fish.category_id, fish.price, fish.number_in_stock, fish.reviews)
      fishObjArray.push(newFish)
    }
  }

  //create category objects
  for (let i = 0; i < json.length; i++){
    newCategory = new Category(json[i].id, json[i].name, [])
    for (let j = 0; j < json[i].fish.length; j++){
      newCategory.fish_ids.push(json[i].fish[j].id)
    }
    catObjArray.push(newCategory)
  }

  objArray.push(catObjArray, fishObjArray)
  return objArray
}

//dynamically creates main tiles/cards for each fish.  Tile is created
// dyanmically for each object obtained from the API
function addTiles(fishArray){
  for (let i = 0; i < fishArray.length; i++){
    fish = fishArray[i]
    tileDiv = backgroundTiles(fish)
    populateFishInfo(fish)
  }
}

// populates the main fish tile information
function populateFishInfo(fish){
  i = fish.id
  removeElement("fishname", i)

  let tileDiv = document.getElementById(`rectangle${i}`)
  fishNames(fish, tileDiv)
  fishVideo(fish, tileDiv)
  addDescripButton(fish, tileDiv)
  addReviewButton(fish, tileDiv)
  addPrice(fish, tileDiv)
  addInStock(fish, tileDiv)
  descripButtonListener(fish)
  reviewButtonListener(fish)
}

//creates number of tiles for the fish found
//adds fish names, pictures, and button to go to description
function backgroundTiles(fish){
    divId = fish.id
    let tileDiv = createDiv('rectangle', divId)
    document.body.appendChild(tileDiv)
    return tileDiv
  }

  //adds picture from the json to the tile
  function fishVideo(fish, tileDiv){
    let i = fish.id
    let picDiv = createDiv('player', i)
    tileDiv.appendChild(picDiv)
    vidFrame = document.createElement('iframe')
    vidFrame.src = `https://www.youtube.com/embed/${fish.vid_url}` + `?autoplay=1&mute=1&loop=1&playlist=${fish.vid_url}`
    vidFrame.id = `vid${i}`
    vidFrame.class = 'fishvid'
    picDiv.appendChild(vidFrame)
    var vid = document.getElementById(`vid${i}`)

  }

// used to create a DIV element. The "i" is used to give it a unique
// identifier.
  function createDiv(className, i){
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', className)
    newDiv.setAttribute('id', `${className}${i}`)
    return newDiv
  }

  //adds fish name from the json to the tile
  function fishNames(fish, tileDiv){
    let divId = fish.id
    const nameDiv = createDiv('fishname', divId)
    nameDiv.innerHTML = fish.name
    nameDiv.style.textAlign = 'center'
    tileDiv.appendChild(nameDiv)
  }

// creates "Description" button from main tile layout
  function addDescripButton(fish, tileDiv){
    let i = fish.id
    var buttonEl = document.createElement("button");
	  buttonEl.className = "descripbtn";
    buttonEl.id = `descripbtn${i}`
	  buttonEl.innerText = "Description";
    buttonEl.style.color = "blue"
    buttonEl.style.fontSize = '18px'
    buttonEl.style.borderradius = "20px"
	  tileDiv.appendChild(buttonEl);
  }

// creates a reviews button that is accessible from main tile layout
  function addReviewButton(fish, tileDiv){
    let i = fish.id
    var buttonEl = document.createElement("button");
    buttonEl.className = "reviewsbtn";
    buttonEl.id = `reviewsbtn${i}`;
    buttonEl.innerText = "Reviews";
    buttonEl.style.color = "blue"
    buttonEl.style.fontSize = '18px'
    buttonEl.style.borderradius = "20px"
	  tileDiv.appendChild(buttonEl);
  }

// adds an element to show the price on the main tile
  function addPrice(fish, tileDiv){
    let i = fish.id
    const newDiv = createDiv('price', i)
    newDiv.innerText = `Price: $${fish.price}`
    tileDiv.appendChild(newDiv)
  }

// adds an element to show how many are in stock on main tile
// also generates an "Out of Stock" message
  function addInStock(fish, tileDiv){
    let i = fish.id
    const inStockEl = createDiv('instock', i)
    if (fish.number_in_stock > 0){
      inStockEl.innerText = `Number in Stock: ${fish.number_in_stock}`
    }
    else{
      inStockEl.innerText = `Out of Stock`
      inStockEl.style.color = 'red'
    }
    tileDiv.appendChild(inStockEl)
  }

// creates the filter element which is a dropdown box that allows users
// to filter by fish category
  function addFilterEl(objects){
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
      option = document.createElement("option")
      option.val = objects[i].name
      option.text = objects[i].name
      select.appendChild(option)
    }
    filterDiv.appendChild(select)
    document.body.appendChild(filterDiv)
  }

// creates a "Contact Us" element that can be clicked on to submit a comment
  function addContactEl(){
    var contactDiv = createDiv('contact', 1)
    contactDiv.id = 'contact'
    contactDiv.innerText = "Contact Us"
    document.body.appendChild(contactDiv)
  }

// creates the contact page once the Contact element is clicked on
  function addContactPage(){
    //create Div for contact page
    var contactDiv = createDiv('contactpage', 1)
    document.body.appendChild(contactDiv)

    //create title
    contactTitle = createDiv('contacttitle', 1)
    contactTitle.innerHTML = "Contact Us"
    contactDiv.appendChild(contactTitle)

    //create contact page entry boxes
    createContactPageEntries(contactDiv)
  }

// creates the elements of the Contact Us page so that users
// can enter data into a form
  function createContactPageEntries(contactDiv){
    form = createForm(contactDiv, 'contactform')

    let newDiv = createDiv("forminput", 1)
    form.appendChild(newDiv)
    createInputLabel(newDiv,  "firstname", "contactlabel", "First Name:  ")
    createInputElement(newDiv, "text", "firstname", "firstname", "contactinput")

    newDiv = createDiv("forminput", 2)
    form.appendChild(newDiv)
    createInputLabel(newDiv, "lastname", "contactlabel", "Last Name:  ")
    createInputElement(newDiv, "text", "lastname", "lastname", "contactinput")

    newDiv = createDiv("forminput", 3)
    form.appendChild(newDiv)
    createInputLabel(newDiv, "email", "contactlabel", "Email:  ")
    createInputElement(newDiv, "text", "email", "email", "contactinput")

    newDiv = createDiv("forminput", 4)
    form.appendChild(newDiv)
    createInputLabel(newDiv, "phonenumber", "contactlabel", "Phone Number:  ")
    createInputElement(newDiv, "text", "phonenumber", "phonenumber", "contactinput")

    const textarea = document.createElement("TEXTAREA");
    textarea.setAttribute("class", 'messagebox')
    textarea.setAttribute("id", "messagebox")
    textarea.setAttribute("name", "messagebox")
    let t = document.createTextNode("Enter your message here")
    textarea.appendChild(t)
    form.appendChild(textarea)

    const submit = document.createElement("button")
    submit.setAttribute("class", "formbutton")
    submit.setAttribute("value", "Submit")
    submit.setAttribute("type", "button")
    submit.setAttribute("id", "submit")
    submit.onclick = function(){submitMessage()}
    submit.innerHTML = "Submit"
    form.appendChild(submit)

    const exit = document.createElement("button")
    exit.setAttribute("class", "formbutton")
    exit.setAttribute("id", "exitbutton")
    exit.setAttribute("type", "button")
    exit.innerHTML = "Exit"
    form.appendChild(exit)
  }

//create reviews form so a user can add a review
  function createReviewsForm(fish, reviewsDiv){
    //get ID of specific fish review tile
    reviewId = reviewsDiv.id.replace("reviews", "")

    //create review form
    form = createForm(reviewsDiv, 'reviewform')

    //create div for reviewer name
    let newDiv = createDiv("newreviewname", reviewId)
    form.appendChild(newDiv)
    createInputLabel(newDiv,  "reviewname", `namelabel${reviewId}`, "Name:  ")
    let targetElem = createInputElement(newDiv, "text", "reviewname", `reviewname${reviewId}`, "name")
    targetElem.setAttribute("id", `reviewname${reviewId}`)

    //create div for review stars
    newDiv = createDiv("newreviewstars", reviewId)
    form.appendChild(newDiv)
    for (let k = 1; k < 6; k++){
      let starDiv = createDiv('fa fa-star', k)
      starDiv.setAttribute("id", `newreviewstar${k}${reviewId}`)
      element = newDiv.appendChild(starDiv)
    }

    //create div for review text
    newDiv = createDiv("newreviewcontent", reviewId)
    form.appendChild(newDiv)
    createInputLabel(newDiv, "review", `reviewlabel${reviewId}`, "Review: ")
    const textarea = document.createElement("TEXTAREA");
    textarea.setAttribute("class", `reviewbox`)
    textarea.setAttribute("id", `reviewbox${reviewId}`)
    textarea.setAttribute("name", "reviewbox")
    let t = document.createTextNode("Enter your review here")
    textarea.appendChild(t)
    form.appendChild(textarea)

    const submit = document.createElement("button")
    submit.setAttribute("class", "formbutton")
    submit.setAttribute("value", "Submit")
    submit.setAttribute("type", "button")
    submit.setAttribute("id", "reviewsubmit")
    submit.onclick = function(){submitReview(fish, reviewId)}
    submit.innerHTML = "Submit"
    form.appendChild(submit)

  reviewListener(reviewId)
  reviewStarsListener(reviewId)

  }

// used to create a form
  function createForm(parentEl, id){
    var form = document.createElement("form")
    form.setAttribute('method', "post")
    form.setAttribute('action', "")
    form.setAttribute('id', id)
    parentEl.appendChild(form)
    return form
  }

// used to create an input element
  function createInputElement(parentEl, typename, name, id, classname){
    const input = document.createElement("input");
    input.setAttribute("type", typename);
    input.setAttribute("name", name)
    input.setAttribute("id", id);
    input.setAttribute("class", classname)
    parentEl.appendChild(input);
    return input
  }

// used to create an input label
  function createInputLabel(parentEl, label, classname, text){
      const newLabel = document.createElement("label");
      newLabel.setAttribute("for", label);
      newLabel.setAttribute("class", classname)
      newLabel.innerHTML = text;
      parentEl.appendChild(newLabel);
    }

// creates listener for when the "Click for Description" button is pressed
  function descripButtonListener(fish){
    let i = fish.id
    document.getElementById(`descripbtn${i}`).addEventListener("click", function(){
      removeImageElements(fish)
      showDescription(fish)
      imgButton(fish)
      imgButtonListener(fish)
    });
  }

// creates a listener for when the "Review" button is pressed on a fish tile
  function reviewButtonListener(fish){
    let i = fish.id
    document.getElementById(`reviewsbtn${i}`).addEventListener("click", function(){
      removeImageElements(fish, i)
      showReviewTile(fish, i)
      imgButton(fish, i)
      imgButtonListener(fish, i)
    });
  }

// creates a listener for when the filter is used
  function filterEventListener(fish, categories){
    document.getElementById(`filter`).addEventListener("change", function(){performFilter(fish, categories, event.target.value)});
  }

// creates a listener for when the "Contact Us" is clicked
  function contactListener(){
    document.getElementById('contact').addEventListener("click", function(){
      addContactPage()
      messageListener()
      exitListener()
    });
  }

// creates a listener for when a user clicks on the Contact Us form message boxes
// the default message disappears
  function messageListener(){
    messagebox = document.getElementById("messagebox")
    messagebox.addEventListener("click", function(){
      if (messagebox.value == "Enter your message here"){
        messagebox.value = "";
      }
    })
  }

// creates a listener for when a user clicks on the review message boxes
// the default message disappears
  function reviewListener(reviewId){
    messagebox = document.getElementById(`reviewbox${reviewId}`)
    messagebox.addEventListener("click", function(){
      if (messagebox.value == "Enter your review here"){
        messagebox.value = "";
      }
    })
  }

// creates a listener for when you select Exit button on the Contact Us page
  function exitListener(){
    document.getElementById('exitbutton').addEventListener("click", function(){exitContact()});
  }

// creates a listener for selecting the number of stars when creating a new review
  function reviewStarsListener(newReviewId){
    //obtain stars element, which is displayed as an array
    for (let i = 1; i <= 5; i++){
      let star = document.getElementById(`newreviewstar${i}${newReviewId}`)
      star.addEventListener("click", function(){highlightStar(star, newReviewId)});
    }
  }

// highlights additional stars when a high star value is selected.
// e.g. if star 4 is selected then this will highlight star 1 - 4.
  function highlightStar(starDiv, newReviewId){
    clearStars(newReviewId)
    starSelected = starDiv.id.replace("newreviewstar", "")
    numOfStars = starSelected.charAt(0)
    for (let i = 1; i <= numOfStars; i++){
      let starDiv = document.getElementById(`newreviewstar${i}${newReviewId}`)
      starDiv.className = 'fa fa-star checked'
    }
  }

  // added to allow reviewer to dynamically be able to click on the stars to
  // change their # of stars review
  function clearStars(newReviewId){
    for (let i = 1; i <= 5; i++){
      let starDiv = document.getElementById(`newreviewstar${i}${newReviewId}`)
      starDiv.className = 'fa fa-star'
    }
  }

// performs switch to description page of a fish tile
  function switchToDescription(fish, i){
    showDescription(fish, i)
    imgButton(fish, i)
    imgButtonListener(fish, i)
  }

// performs switch to review page of a fish tile
  function switchToReviews(fish, i){
    imgButton(fish, i)
    imgButtonListener(fish, i)
  }

//hides elements and shows description
  function removeImageElements(fish){
    let i = fish.id
    //remove elements
    removeElement('fishname', i)
    removeElement("player", i)
    removeElement('descripbtn', i)
    removeElement('price', i)
    removeElement('instock', i)
    removeElement('reviewsbtn', i)
  }

// creates the fish description
  function showDescription(fish){
      let i = fish.id
      const tileDiv = document.getElementById(`rectangle${i}`)
      fishNames(fish, tileDiv)

      const descripDiv = createDiv('fishdescrip', i)
      descripDiv.innerHTML = `\n${fish.description}`
      element = tileDiv.appendChild(descripDiv)
  }

// resets the review tiles
  function resetReviewTile(fish, i){
    removeElement("fishname", i)
    removeElement("fishdescrip", i)
    removeElement("reviews", i)
  }

// generates and shows the review tiles.
// fetches from API since reviews can be added and must be updated
// in real time
  function showReviewTile(fish, i){
    resetReviewTile(fish, i)

    fetch('http://localhost:3000/categories')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const reviewsDiv = createDiv('reviews', i)

      //populate fish name
      let tileDiv = document.getElementById(`rectangle${i}`)
      fishNames(fish, tileDiv)

      //create Div that contains all reviews
      const tile = document.getElementById(`rectangle${i}`)
      let element = tile.appendChild(reviewsDiv)

      createReviewsForm(fish, reviewsDiv)

      //create individual reviews
      for (let j = 0; j < json.length; j++){
        for(let k = 0; k < json[j].fish.length; k++){
          for(let l = 0; l < json[j].fish[k].reviews.length; l++){
            let review = json[j].fish[k].reviews[l]
            createReview(review, i, reviewsDiv)
          }
        }
      }
    });
  }

// displays an existing review
  function createReview(json, i, reviewsDiv){
    let divId = i;
    let review = json
    let reviewId = review.id
    let fishId = i+1

    if (review.fish_id == fishId){
      let reviewDiv = createDiv('review', `${divId}${reviewId}`)
      let element = reviewsDiv.appendChild(reviewDiv)
      const starsDiv = createDiv('stars', `${divId}${reviewId}`)
      element = reviewDiv.appendChild(starsDiv)
      const reviewTextDiv = createDiv('reviewtext', `${divId}${reviewId}`)
      element = reviewDiv.appendChild(reviewTextDiv)

      for (let k = 1; k < 6; k++){
          let starDiv = createDiv('fa fa-star', k)
          element = starsDiv.appendChild(starDiv)
          if (k <= review.stars){
            starDiv.className = 'fa fa-star checked'
          }
      }

      reviewTextDiv.innerHTML = `\n ${review.reviewtext} - ${review.name}`

    }
}

// creates the "<<" button go to back to main tile
  function imgButton(fish){
    let i = fish.id
    const tile = document.getElementById(`rectangle${i}`)
    let buttonEl = createDiv('imgbtn', i)
    buttonEl.innerText = '\n'+"<<";
    tile.appendChild(buttonEl);
  }

// creates listener for the "<<" button to go back to main tile
  function imgButtonListener(fish){
    let i = fish.id
    document.getElementById(`imgbtn${i}`).addEventListener("click", function(){
      switchToImage(fish, i)});
  }

// performs thw switch back to the main image tile
  function switchToImage(fish){
    let i = fish.id
    removeElement("fishdescrip", i)
    removeElement("imgbtn", i)
    removeElement("reviews", i)
    populateFishInfo(fish)
  }

// performs the filtering when a filter is selected
  function performFilter(fish, categories, eventValue){

    //remove tiles
    for (let i = 1; i <= fish.length; i++) {
      removeElement("rectangle", i)
    }

    //find correct category to match eventValue
    let category = ""
    for (i = 0; i < categories.length; i++){
      if (categories[i].name === eventValue){
        category = categories[i]
      }
    }
    filteredFishArray = fish.filter(x => x.category_id == category.id)

    //shows all tiles if the "blank" is selected or no fish in that category can be found
    if (eventValue == ""){
      filteredFishArray = fish
    }

    addTiles(filteredFishArray)
  }

// removes the contact page
  function exitContact(){
    let contactPage = document.getElementById(`contactpage1`).remove()
  }

// removes a specified element
  function removeElement(className, i){
    try{
      document.getElementById(`${className}${i}`).remove()
    }
    catch{}
  }


  function hideElement(className, i){
    try{
      document.getElementById(`${className}${i}`).style.display= `none`
    }
    catch{}
  }

  function showElement(className, i, showType){
    try {
      document.getElementById(`${className}${i}`).style.display = `${showType}`
    }
    catch{}
  }



  class Category {
    constructor(id, name, fish_ids){
      this.id = id
      this.name = name
      this.fish_ids = fish_ids
    }
   }

  class Fish {
    constructor(id, name, description, size, vid_url, category_id, price, number_in_stock, reviews){
      this.id = id
      this.name = name
      this.description = description
      this.size = size
      this.vid_url = vid_url
      this.category_id = category_id
      this.price = price
      this.number_in_stock = number_in_stock
      this.reviews = reviews
    }
  }

  function submitMessage() {
    //obtain form data from elements
    let firstName = document.getElementById("firstname")
    let lastName = document.getElementById("lastname")
    let email = document.getElementById("email")
    let phoneNumber = document.getElementById("phonenumber")
    let messageText = document.getElementById("messagebox")

    //assign form data to object attributes
    const formData = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      phonenumber: phoneNumber.value,
      messagetext: messageText.value
    }

    //send post request
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/messages", configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        firstName.value = ""
        lastname.value = ""
        email.value = ""
        phoneNumber.value = ""
        messageText.value = "Enter your message here"
      })

    exitContact()
  }

  function submitReview(fish, reviewId){

    //reviews Div
    let reviewsDiv = document.getElementById(`reviews${reviewId}`)
    // ^^ verified to be correct with console.log

    //get reviewer name
    let name = document.getElementById(`reviewname${reviewId}`).value
    // ^^ verified to be correct with console.log

    //get review box value
    let reviewText = document.getElementById(`reviewbox${reviewId}`).value

    //get star count
    let stars = 0
    for (let i = 1; i <= 5; i++){
      let starstatus = document.getElementById(`newreviewstar${i}${reviewId}`).className
      if (starstatus == "fa fa-star checked"){
        stars = i
      }
    }

    //get fishId
    let fishId = parseInt(reviewId) + 1
    // ^^ verified to be correct with console.log

    //assign form data to object attributes
    const formData = {
      name: name,
      reviewtext: reviewText,
      stars: stars,
      fish_id: fishId
    }
    // ^^ verified to be correct with console.log

    //send post request
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/reviews", configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
      })

    fetch('http://localhost:3000/categories')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {

        showReviewTile(fish, (fishId - 1))
      });
  }

  function disableVideo(i){
    let vid = document.getElementById(`vid${i}`)
    vid.src = ""
  }

  function enableVideo(fish){
    let i = fish.id
    let vid = document.getElementById(`player${i}`)
    vid.src = `https://www.youtube.com/embed/${fish.vid_url}` + `?autoplay=1&mute=1&loop=1&playlist=${fish.vid_url}`
  }
