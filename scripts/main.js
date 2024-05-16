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
      }, index * 400)
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

  // Afficher le pop-up
  cookie.classList.add("cookieShow")

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
  if (consent === 'true'|| consent === 'false') {
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
function nextQuestion(answer) {
  const questionContainer = document.getElementById('questionContainer');
  const currentQuestion = document.querySelector('#questionContainer > div');
  
  if (answer === 'yes') {
      if (currentQuestion.id === 'question1') {
          currentQuestion.innerHTML = `
              <p>Êtes-vous à l'aise en programmation?</p>
              <button onclick="nextQuestion('yes')">Oui</button>
              <button onclick="nextQuestion('no')">Non</button>
          `;
          currentQuestion.id = 'question2';
      } else if (currentQuestion.id === 'question2') {
          currentQuestion.innerHTML = `
              <p>Avez-vous une analyse mathématique?</p>
              <button onclick="nextQuestion('yes')">Oui</button>
              <button onclick="nextQuestion('no')">Non</button>
          `;
          currentQuestion.id = 'question3';
      } else if (currentQuestion.id === 'question3') {
          currentQuestion.innerHTML = `
              <p>Êtes-vous créatif?</p>
              <button onclick="showResult('yes')">Oui</button>
              <button onclick="showResult('no')">Non</button>
          `;
          currentQuestion.id = 'question4';
      }
  } else if (answer === 'no') {
      // Traiter la réponse 'non' si nécessaire
      console.log("Traitement de la réponse 'Non'");
  }
}

function showResult(answer) {
  const result = document.createElement('p');
  const questionContainer = document.getElementById('questionContainer');

  if (answer === 'yes') {
      result.textContent = 'Profil : Développeur web';
  } else if (answer === 'no') {
      result.textContent = 'Profil : Autre';
  }

  questionContainer.appendChild(result);
}