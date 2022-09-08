const fronts = document.querySelectorAll('.cardFront')
const backs = document.querySelectorAll('.cardBack')
const cards = document.querySelectorAll('.assignment')





Array.from(cards).forEach(function(card) {
  card.addEventListener('click', function(event) {
    Array.from(card.querySelectorAll('.cardFront, .cardBack')).forEach(function(el) {
      ['cardFront', 'cardBack'].forEach(function(s) {
        el.classList.toggle(s)
      })
    })
  })
})


// cards.forEach(function (card) {
//   card.addEventListener("click", function (event) {
    
//     fronts.forEach(function (front){
//       toggleClass()
//     });
    
//     backs.forEach(function (back){
//       toggleClass()
//     });
//   });
// });

// cards.forEach(card => {
//   card.addEventListener('click', toggleClass )
  
// });

// function toggleClass (){
//     fronts.classList.toggle('flipped')
//     backs.classList.toggle('flipped')
// }

// cards.forEach(card => {
//   card.addEventListener("click", toggleClass)
// })

// function toggleClass(){
//    fronts.forEach(function (front){
//       front.classList.toggle('flipped')
//     });
  
//   backs.forEach(function (back){
//       back.classList.toggle('flipped')
//   });
    
// }
  