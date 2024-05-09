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

window.addEventListener('scroll', handleScroll);

//Apparition des slug HomePage

window.addEventListener('load', function() {
  const slugs = document.querySelectorAll('.slug');
  
  slugs.forEach((slug, index) => {
    setTimeout(() => {
      slug.classList.add('slugShow');
    }, index * 1000 + 500);
  });
});