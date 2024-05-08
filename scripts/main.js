//Page Accueil

//Click sur BurgerMenu
let burgerMenu = document.querySelector('.burgerMenu')
let menuDown = document.querySelector('.menuDown')

burgerMenu.addEventListener('click', function(){
  this.classList.toggle('burgerMenuActive')
  menuDown.classList.toggle('menuDownActive')

})