//Page Accueil

//Click sur BurgerMenu
let burgerMenu = document.querySelector('.burgerMenu')
let menuDown = document.querySelector('.menuDown')

burgerMenu.addEventListener('click', function(){
  this.classList.toggle('burgerMenuActive')
  menuDown.classList.toggle('menuDownActive')

})

//Menu disparait au Scroll
let navBox = document.querySelector('.navBox')
let lastScrollay = 0

function handleScroll(){
  let dejaScrollay = Math.max(window.scrollY, 0)
  if (dejaScrollay > lastScrollay){
    navBox.classList.add('slideMenu') 
  } else {
    navBox.classList.remove('slideMenu')
  }
  lastScrollay = dejaScrollay
}

window.addEventListener('scroll', handleScroll)

//Apparition des slug HomePage

window.addEventListener('load', function() {
  const slugs = document.querySelectorAll('.slug')
  
  slugs.forEach((slug, index) => {
    setTimeout(() => {
      slug.classList.add('slugShow')
    }, index * 1000 + 500)
  })
})

//bulle aubergine qui bouge verticalement
window.addEventListener('scroll', function() {
  const aubergineCircle = document.querySelector('.aubergineCircle')
  const scrollY = window.scrollY

  // Calculer la nouvelle position verticale en fonction du scroll
  const newPosition = `${50 + (scrollY * 0.05)}%` // Ajuste le coefficient selon la vitesse souhaitée

  // Modifier la position verticale de la bulle
  aubergineCircle.style.top = newPosition
})

let elements = document.querySelectorAll(".fadeIn")
// easyscroll
function easyscroll(){
  elements.forEach((element, index) => {
      if((window.scrollY + window.innerHeight) > (element.offsetTop +(element.offsetHeight/2))){
        setTimeout(() => {
          element.classList.add("visible")
        }, index * 500)
       
       }     
   })
}

easyscroll()
window.addEventListener ("scroll", function (){
  easyscroll()
 
  })