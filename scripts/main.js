//Page Accueil

//Click sur BurgerMenu
let burgerMenu = document.querySelector('.burgerMenu')
let menuDown = document.querySelector('.menuDown')

if (burgerMenu) {
  burgerMenu.addEventListener('click', function(){
    this.classList.toggle('burgerMenuActive')
    menuDown.classList.toggle('menuDownActive')
  });
} else {
  console.error("L'élément burgerMenu n'a pas été trouvé dans le DOM.");
}

//Menu disparait au Scroll
let navBox = document.querySelector('.navBox')
let lastScrollay = 0

function menuScroll(){
  let dejaScrollay = Math.max(window.scrollY, 0)
  if (dejaScrollay > lastScrollay){
    navBox.classList.add('slideMenu') 
  } else {
    navBox.classList.remove('slideMenu')
  }
  lastScrollay = dejaScrollay
}

window.addEventListener('scroll', menuScroll)

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



//animation sur HomePage
// const elements = {
//   approche: document.querySelectorAll(".approcheHide"),
//   temoignageBox: document.querySelectorAll(".temoignageHidden"),
//   // temoignageRight: document.querySelectorAll(".temoignageright"),
// }

// function easyscroll(elementsList, className) {
//   elementsList.forEach((element, index) => {
//     if (window.scrollY + window.innerHeight > element.offsetTop + element.offsetHeight / 2) {
//       setTimeout(() => {
//         element.classList.add(className)
//       }, index * 300)
//     }
//   })
// }

// function handleScroll() {
//   easyscroll(elements.approche, "approcheShow")
//   easyscroll(elements.temoignageBox, "temoignageShow")
//   // easyscroll(elements.temoignageRight, "temoignagereveal")
// }

// handleScroll()

// window.addEventListener("scroll", handleScroll)


// //Animation sur les étoiles
// document.addEventListener('DOMContentLoaded', () => {
//   const starsContainers = document.querySelectorAll('.stars');

//   function startAnimationOnScroll() {
//     starsContainers.forEach((container, containerIndex) => {
//       const stars = container.querySelectorAll('.fa-star');
//       const starsToAnimate = (containerIndex === 1) ? 4 : stars.length; // 4 étoiles pour la deuxième div

//       stars.forEach((star, index) => {
//         if (index < starsToAnimate) {
//           setTimeout(() => {
//             star.classList.add('aubergine');
//           }, index * 600); // Ajustez le délai ici pour contrôler la vitesse de l'animation
//         }
//       });
//     });

//     // Retirer l'écouteur d'événements une fois que l'animation est déclenchée
//     window.removeEventListener('scroll', startAnimationOnScroll);
//   }

//   // Ajouter un écouteur d'événements de défilement
//   window.addEventListener('scroll', startAnimationOnScroll);
// });

const elements = {
  approche: document.querySelectorAll(".approcheHide"),
  temoignageBox: document.querySelectorAll(".temoignageHidden"),
}

function easyscroll(elementsList, className) {
  elementsList.forEach((element, index) => {
    if (window.scrollY + window.innerHeight > element.offsetTop + element.offsetHeight / 2) {
      setTimeout(() => {
        element.classList.add(className);
      }, index * 300);
    }
  });
}

function handleScroll() {
  easyscroll(elements.approche, "approcheShow");
  easyscroll(elements.temoignageBox, "temoignageShow");

  const firstTemoignageBox = elements.temoignageBox[0];
  const temoignageShowFinished = firstTemoignageBox.classList.contains('temoignageShow');
  if (temoignageShowFinished) {
    startAnimationOnScroll();
  }
}

handleScroll();

window.addEventListener("scroll", handleScroll);

function startAnimationOnScroll() {
  const starsContainers = document.querySelectorAll('.stars');
  let animationTriggered = false;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateStarsIfVisible() {
    if (!animationTriggered) {
      starsContainers.forEach((container, containerIndex) => {
        const stars = container.querySelectorAll('.fa-star');
        const starsToAnimate = (containerIndex === 1) ? 4 : stars.length;

        const containerTop = container.getBoundingClientRect().top;
        const isVisible = containerTop < window.innerHeight;

        if (isVisible) {
          stars.forEach((star, index) => {
            if (index < starsToAnimate) {
              setTimeout(() => {
                star.classList.add('aubergine');
              }, index * 600);
            }
          });

          animationTriggered = true;
        }
      });
    }
  }

  function handleScrollForStars() {
    animateStarsIfVisible();
  }

  window.addEventListener("scroll", handleScrollForStars);
}








//cookies
document.addEventListener('DOMContentLoaded', function() {
  const cookie = document.querySelector(".cookie");
  const accept = document.querySelector(".accept");
  const refuse = document.querySelector(".refuse");

  // Vérifiez si l'élément cookie existe
  if (!cookie) {
    console.error("L'élément avec la classe .cookie n'a pas été trouvé dans le DOM.");
    return;
  }

  // Afficher le pop-up
  cookie.classList.add("cookieShow");

  // Vérifiez si les boutons existent
  if (!accept) {
    console.error("L'élément avec la classe .accept n'a pas été trouvé dans le DOM.");
    return;
  }
  if (!refuse) {
    console.error("L'élément avec la classe .refuse n'a pas été trouvé dans le DOM.");
    return;
  }

  // Gérer l'événement du bouton Accepter
  accept.addEventListener('click', function() {
    // Définir le cookie de consentement
    Cookies.set('consent', 'true');
    console.log('Consentement accepté');
    cookie.style.display = 'none'; 
  });

  // Gérer l'événement du bouton Refuser
  refuse.addEventListener('click', function() {
    Cookies.set('consent', 'false');
    console.log('Consentement refusé');
    cookie.style.display = 'none'; 
  });

  // Vérifier si l'utilisateur a déjà donné son consentement
  const consent = Cookies.get('consent');
  if (consent === 'true' || consent === 'false') {
    cookie.style.display = 'none';
  }
});


















