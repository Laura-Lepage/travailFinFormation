//click sur la croix sur page "versmetierideal"
document.addEventListener("DOMContentLoaded", function() {
    // Vérifie si le titre de la page est "versmetierideal.html" ou "prendreunrendezvous.html"
    const path = window.location.pathname;
    if (path === "/versmetierideal.html" || path === "/prendreunrendezvous.html") {
      const crossButtons = document.querySelectorAll(".cross");
      crossButtons.forEach(function(crossButton) {
        crossButton.addEventListener("click", function() {
          window.location.href = "index.html";
        });
      });
    }
  });

//Questionnaire
let currentQuestionId = "question1";
let questionnaireBox = document.querySelector(".questionnaireBox");
let quizElement = document.querySelector('#quiz');
let resultElement = document.querySelector('#result');
let resultTextElement = document.querySelector('#resultText');
let resultProfilElement = document.querySelector('#resultProfil');
let resultExplanationElement = document.querySelector('#resultExplanation');
let resultPossibilitiesElement = document.querySelector('#resultPossibilities');
let resultConclusionElement = document.querySelector('#resultConclusion');
let backButton = document.querySelector('.back'); // Sélectionner le bouton "Retour"
let questions = [];
let questionHistory = []; // Tableau pour suivre l'historique des questions

fetch('scripts/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion(currentQuestionId);
    });

function loadQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        quizElement.innerHTML = `
            <div class="questionBox question active" id="${question.id}">
                <p>${question.text}</p>
                <button onclick="handleAnswer('${question.id}', 'yes')" class="btnyes">Oui</button>
                <button onclick="handleAnswer('${question.id}', 'no')">Non</button>
            </div>
        `;

        // Afficher ou masquer le bouton "Retour" en fonction de l'historique des questions
        if (questionHistory.length > 0) {
            backButton.style.display = 'block';
        } else {
            backButton.style.display = 'none';
        }
    } else {
        endQuiz("Vos réponses n'ont pas permises de déterminer votre profil");
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
        questionHistory.push(questionId); // Ajouter l'identifiant de la question actuelle à l'historique
        currentQuestionId = nextId;
        loadQuestion(currentQuestionId);
    }
}

function goBack() {
    if (questionHistory.length > 0) {
        currentQuestionId = questionHistory.pop(); // Récupérer la dernière question de l'historique
        loadQuestion(currentQuestionId);
    }
}

// Ajout de l'événement de clic pour le bouton "Retour"
backButton.addEventListener('click', goBack);

function showResult(result, explanation, possibilities, conclusion) {
    if (result === undefined || result === null) {
        result = "profil indéterminé";
    }

    questionnaireBox.style.display = 'none';
    resultElement.style.display = 'block';
    resultTextElement.innerText = 'Vous devriez envisager une carrière en tant que';
    resultProfilElement.innerText = result;
    resultExplanationElement.innerText = explanation;

    // Affiche les possibilités sur des lignes distinctes
    resultPossibilitiesElement.innerHTML = possibilities.map(possibility => possibility + '<br>').join('');

    resultConclusionElement.innerText = conclusion;
}

function endQuiz(message) {
    questionnaireBox.style.display = 'none';
    resultElement.style.display = 'block';
    resultTextElement.innerText = message;
    resultExplanationElement.innerText = '';
}

function restartQuiz() {
    currentQuestionId = 'question1'; // Réinitialise l'identifiant de la question actuelle
    questionnaireBox.style.display = 'block';
    resultElement.style.display = 'none';
    resultProfilElement.innerText = '';
    resultExplanationElement.innerText = '';
    resultPossibilitiesElement.innerHTML = '';
    resultConclusionElement.innerText = '';
    questionHistory = []; // Réinitialise l'historique des questions
    loadQuestion(currentQuestionId);
}