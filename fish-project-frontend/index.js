document.addEventListener( "DOMContentLoaded", function () {
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
    //createContactPage()
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

function createTiles(fish){
  for (let i = 0; i < fish.length; i++){
    tileDiv = backgroundTiles(fish, i)
    fishNames(fish, i, tileDiv)
    fishPictures(fish, i, tileDiv)
    descripButton(fish, i, tileDiv)
    reviewsButton(fish, i, tileDiv)
    addPrice(fish, i, tileDiv)
    addInStock(fish, i, tileDiv)
    descripButtonListener(fish, i)
    reviewsButtonListener(fish, i)
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
    let picDiv = createDiv('player', i)
    element.appendChild(picDiv)
    vidFrame = document.createElement('iframe')
    vidFrame.src = `https://www.youtube.com/embed/${fish[i].vid_url}` + `?autoplay=1&mute=1&loop=1&playlist=${fish[i].vid_url}`
    vidFrame.id = `vid${i}`
    vidFrame.class = 'fishvid'
    //vidFrame.width = 100
    picDiv.appendChild(vidFrame)
    var vid = document.getElementById(`vid${i}`)

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

  function reviewsButton(fish, i, element){
    var buttonEl = document.createElement("button");
    buttonEl.className = "reviewsbtn";
    buttonEl.id = `reviewsbtn${i}`;
    buttonEl.innerText = "Reviews";
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

  function createLoginEl(){
    var loginDiv = createDiv('login', 1)
    loginDiv.id = "login"
    document.body.appendChild(loginDiv)

  }

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
    exit.onclick = function(){hideElement("contactpage", 1)}
    exit.innerHTML = "Exit"
    form.appendChild(exit)

    messageListener()
  }

//create reviews form
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

  function createForm(parentEl, id){
    var form = document.createElement("form")
    form.setAttribute('method', "post")
    form.setAttribute('action', "")
    form.setAttribute('id', id)
    parentEl.appendChild(form)
    return form
  }

  function createInputElement(parentEl, typename, name, id, classname){
    const input = document.createElement("input");
    input.setAttribute("type", typename);
    input.setAttribute("name", name)
    input.setAttribute("id", id);
    input.setAttribute("class", classname)
    parentEl.appendChild(input);
    return input
  }

  function createInputLabel(parentEl, label, classname, text){
      const newLabel = document.createElement("label");
      newLabel.setAttribute("for", label);
      newLabel.setAttribute("class", classname)
      newLabel.innerHTML = text;
      parentEl.appendChild(newLabel);
    }

// creates listener for when the "Click for Description" button is pressed
  function descripButtonListener(fish, i){
    document.getElementById(`descripbtn${i}`).addEventListener("click", function(){switchToDescription(fish, i)});
  }

  function reviewsButtonListener(fish, i){
    document.getElementById(`reviewsbtn${i}`).addEventListener("click", function(){switchToReviews(fish, i)});
  }

  function filterEventListener(fish, categories){
    document.getElementById(`filter`).addEventListener("change", function(){performFilter(fish, categories, event.target.value)});
  }

  function contactListener(){
    document.getElementById('contact').addEventListener("click", function(){
      createContactPage()
      exitListener()
    });
  }

  function messageListener(){
    messagebox = document.getElementById("messagebox")
    messagebox.addEventListener("click", function(){
      if (messagebox.value == "Enter your message here"){
        messagebox.value = "";
      }
    })
  }

  function reviewListener(reviewId){
    messagebox = document.getElementById(`reviewbox${reviewId}`)
    messagebox.addEventListener("click", function(){
      if (messagebox.value == "Enter your review here"){
        messagebox.value = "";
      }
    })
  }

  function exitListener(){
    document.getElementById('exitbutton').addEventListener("click", function(){
      console.log("exit listener activated")
      exitContact()
    });
  }

  function reviewStarsListener(newReviewId){
    //obtain stars element, which is displayed as an array
    for (let i = 1; i <= 5; i++){
      let star = starIdFind(i, newReviewId)
      star.addEventListener("click", function(){highlightStar(star, newReviewId)});
    }
  }

  function starIdFind(starNumber, newReviewId){
    return document.getElementById(`newreviewstar${starNumber}${newReviewId}`)
  }

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

  function switchToDescription(fish, i){
    hideImageElements(fish, i)
    showDescription(fish, i)
    imgButton(fish, i)
    imgButtonListener(fish, i)
  }

  function switchToReviews(fish, i){
    hideImageElements(fish, i)
    imgButton(fish, i)
    imgButtonListener(fish, i)
    showReviews(fish, i)
  }

//hides elements and shows description
  function hideImageElements(fish, i){
    //hides image
    hideElement("player", i)
    hideElement("descripbtn", i)
    hideElement("price", i)
    hideElement("instock", i)
    hideElement("reviewsbtn", i)
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
      element = tile.appendChild(descripDiv)
    }
  }

  function createReview(i, j, reviewsDiv, fish){
    let reviewDiv = createDiv('review', `${i}${j}`)
    let element = reviewsDiv.appendChild(reviewDiv)
    // create review stars element
    const starsDiv = createDiv('stars', `${i}${j}`)
    element = reviewDiv.appendChild(starsDiv)
    // create review text element
    const reviewTextDiv = createDiv('reviewtext', `${i}${j}`)
    element = reviewDiv.appendChild(reviewTextDiv)

    //create star
    for (let k = 1; k < 6; k++){
      let starDiv = createDiv('fa fa-star', k)
      element = starsDiv.appendChild(starDiv)
      if (k <= fish[i].reviews[j].stars){
        starDiv.className = 'fa fa-star checked'
      }
    }
    reviewTextDiv.innerHTML = `\n${fish[i].reviews[j].reviewtext} - ${fish[i].reviews[j].name}`
    element = reviewsDiv.appendChild(reviewDiv)
  }

  function showReviews(fish, i){
    if (document.getElementById(`reviews${i}`)){
      showElement('reviews', i, "block")
      showElement('imgbtn', i, "block")
    }
    else{
      const reviewsDiv = createDiv('reviews', i)

      //create Div that contains all reviews
      const tile = document.getElementById(`rectangle${i}`)
      let element = tile.appendChild(reviewsDiv)

      createReviewsForm(fish, reviewsDiv)

      //create individual reviews
      for (let j = 0; j < fish[i].reviews.length; j ++){
        createReview(i, j, reviewsDiv, fish)
      }
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
      tile.appendChild(buttonEl);
    }
  }

  function imgButtonListener(fish, i){
    document.getElementById(`imgbtn${i}`).addEventListener("click", function(){switchToImage(fish, i)});
  }

  function switchToImage(fish, i){
    hideElement("fishdescrip", i)
    hideElement("imgbtn", i)
    hideElement("reviews", i)
    showElement("player", i, "block")
    showElement("descripbtn", i, "block")
    showElement("price", i, "block")
    showElement("instock", i, "block")
    showElement('reviewsbtn', i, "block")
  }

  function performFilter(fish, categories, eventValue){

    for (let i = 0; i < fish.length; i++){
      showElement('rectangle', i, 'block')
      enableVideo(fish, i)

      if (eventValue != ""){
        let category = categories.find(category => category.name === eventValue)
        if (fish[i].category_id != category.id) {
          hideElement('rectangle', i)
          disableVideo(i)
        }
      }

    }

  }

  function exitContact(){
    let contactPage = document.getElementById(`contactpage1`).remove()
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

    hideElement("contactpage", 1)
  }

  function submitReview(fish, reviewId){

    //get reviewer name
    let name = document.getElementById(`reviewname${reviewId}`).value

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

    //get fish id
    let fishId = parseInt(reviewId) + 1

    //assign form data to object attributes
    const formData = {
      name: name,
      reviewtext: reviewText,
      stars: stars,
      fish_id: fishId
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

    fetch("http://localhost:3000/reviews", configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        fishId = json.data.attributes.fish_id
        specificFish = fish.find(x => x.id === (fishId))
        console.log(specificFish)
        reloadReviews(specificFish, fishId)

      })
  }

  function reloadReviews(fish, fishId){

    // set i
    let i = fishId - 1

    // set reviewsDiv
    let reviewsDiv = document.getElementById(`reviews${i}`)
    console.log(reviewsDiv)

    // set j
    let j = fish.reviews.length - 1

    createReview(i, j, reviewsDiv, fish)
  }

  function disableVideo(i){
    let vid = document.getElementById(`vid${i}`)
    vid.src = ""
  }

  function enableVideo(fish, i){
    let vid = document.getElementById(`vid${i}`)
    vid.src = `https://www.youtube.com/embed/${fish[i].vid_url}` + `?autoplay=1&mute=1&loop=1&playlist=${fish[i].vid_url}`
  }
