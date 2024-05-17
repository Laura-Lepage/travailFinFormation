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
const elements = {
  approche: document.querySelectorAll(".approcheHide"),
  temoignageLeft: document.querySelectorAll(".temoignageleft"),
  temoignageRight: document.querySelectorAll(".temoignageright"),
}

function easyscroll(elementsList, className) {
  elementsList.forEach((element, index) => {
    if (window.scrollY + window.innerHeight > element.offsetTop + element.offsetHeight / 2) {
      setTimeout(() => {
        element.classList.add(className)
      }, index * 300)
    }
  })
}

function handleScroll() {
  easyscroll(elements.approche, "approcheShow")
  easyscroll(elements.temoignageLeft, "temoignagereveal")
  easyscroll(elements.temoignageRight, "temoignagereveal")
}

handleScroll()

window.addEventListener("scroll", handleScroll)

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

//click sur la croix sur page "versmetierideal"
document.addEventListener("DOMContentLoaded", function() {
  // Vérifie si le titre de la page est "versmetierideal.html"
  if (window.location.pathname === "/versmetierideal.html") {
    const crossButton = document.querySelector(".cross")
    if (crossButton) {
      crossButton.addEventListener("click", function() {
        window.location.href = "index.html"
      })
    }
  }
})


//Questionnaire
function nextQuestion(current, next) {
  document.getElementById(current).classList.remove('active');
  document.getElementById(next).classList.add('active');
}

function showResult(result) {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('resultText').innerText = 'Vous devriez envisager une carrière en tant que ' + result + '.';
}

function endQuiz(message) {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('resultText').innerText = message || 'Merci d\'avoir complété le quiz. Vous pourriez explorer d\'autres domaines IT ou revisiter vos réponses précédentes pour trouver un meilleur ajustement.';
}

function restartQuiz() {
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('result').style.display = 'none';
  const questions = document.getElementsByClassName('question');
  for (let i = 0; i < questions.length; i++) {
      questions[i].classList.remove('active');
  }
  document.getElementById('question1').classList.add('active');
}