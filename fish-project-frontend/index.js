document.addEventListener( "DOMContentLoaded", function () {
  console.log('DOM loaded')
  addFishTiles()
  addFishImages()
});

function addFishTiles(){
  for (let i = 1; i <= 6; i++){
    const newSpan = document.createElement('div')
    newSpan.setAttribute('id', 'rectangle')
    //newSpan.setAttribute('id', `rectangle${i}`)
    document.body.appendChild(newSpan)

  }

  function addFishImages(){

  }
}
