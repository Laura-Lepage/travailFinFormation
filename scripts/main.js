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
// let quiz = document.querySelector("#quiz")
// let resultId = document.querySelector("#result")
// let resultText = document.querySelector("#resultText")
// let question1 = document.querySelector('#question1')


// function nextQuestion(current, next) {
//   document.querySelector(current).classList.remove("active")
//   document.querySelector(next).classList.add("active")
// }

// function showResult(result) {
//   quiz.style.display = "none"
//   resultId.style.display = "block"
//   resultText.innerText = 'Vous devriez envisager une carrière en tant que ' + result + '.'
// }

// function endQuiz(message) {
//   quiz.style.display = "none"
//   resultId.style.display = "block";
//   resultText.innerText = message || 'Merci d\'avoir complété le quiz. Vous pourriez explorer d\'autres domaines IT ou revisiter vos réponses précédentes pour trouver un meilleur ajustement.'
// }

// function restartQuiz() {
//   quiz.style.display = "block"
//   resultId.style.display = "none"
//   const questions = document.querySelectorAll(".question")
//   questions.forEach(question => question.classList.remove("active"))
//   // const questions = document.getElementsByClassName('question');
//   // for (let i = 0; i < questions.length; i++) {
//   //     questions[i].classList.remove('active');
//   // }
//   question1.classList.add("active")
// }
let currentQuestionId = 'question1'
let quizElement = document.querySelector('#quiz')
let resultElement = document.querySelector('#result')
let resultTextElement = document.querySelector('#resultText')
let resultProfilElement = document.querySelector('#resultProfil')
let resultExplanationElement = document.querySelector('#resultExplanation')
let resultPossibilitiesElement = document.querySelector('#resultPossibilities')
let resultConclusionElement = document.querySelector('#resultConclusion')
let questions = []

fetch('scripts/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data
        loadQuestion(currentQuestionId)
    })

function loadQuestion(questionId) {
    const question = questions.find(q => q.id === questionId)
    if (question) {
        quizElement.innerHTML = `
            <div class="questionBox question active" id="${question.id}">
                <p>${question.text}</p>
                <button onclick="handleAnswer('${question.id}', 'yes')">Oui</button>
                <button onclick="handleAnswer('${question.id}', 'no')">Non</button>
            </div>
        `
    } else {
        endQuiz()
    }
}

function handleAnswer(questionId, answer) {
  const question = questions.find(q => q.id === questionId);
  const nextId = question[answer];

  if (nextId === 'result') {
      showResult(question.result, question.explanation, question.possibilities, question.conclusion);
  } else if (nextId === 'endQuizNo') {
      endQuiz("Oups ! Le domaine IT n'est peut-être pas fait pour toi. Je t'invite à réserver une session gratuite pour explorer d'autres voies ensemble.");
  } else if (nextId.startsWith('endQuiz')) {
      eval(nextId);
  } else {
      currentQuestionId = nextId;
      loadQuestion(currentQuestionId);
  }
}

function showResult(result, explanation, possibilities, conclusion) {
  quizElement.style.display = 'none';
  resultElement.style.display = 'block';
  resultTextElement.innerText = 'Vous devriez envisager une carrière en tant que';
  resultProfilElement.innerText = result;
  resultExplanationElement.innerText = explanation;

  // Affiche les possibilités sur des lignes distinctes
  resultPossibilitiesElement.innerHTML = possibilities.map(possibility => possibility + '<br>').join('');

  resultConclusionElement.innerText = conclusion;
}

function endQuiz(message) {
    quizElement.style.display = 'none'
    resultElement.style.display = 'block'
    resultTextElement.innerText = message
    resultExplanationElement.innerText = ''
}

function restartQuiz() {
  currentQuestionId = 'question1' // Réinitialise l'identifiant de la question actuelle
  quizElement.style.display = 'block'
  resultElement.style.display = 'none'
  resultProfilElement.innerText = ''
  resultExplanationElement.innerText = ''
  resultPossibilitiesElement.innerHTML = ''
  resultConclusionElement.innerText = ''
  loadQuestion(currentQuestionId)
}

