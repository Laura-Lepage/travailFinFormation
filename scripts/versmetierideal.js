//Click sur la croix sur page "versmetierideal"
document.addEventListener("DOMContentLoaded", function() {
    const crossButtons = document.querySelectorAll(".cross");
    crossButtons.forEach(function(crossButton) {
        crossButton.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    });
  });

// document.addEventListener('DOMContentLoaded', function() {
//     const loadLinks = document.querySelectorAll('.loadLink');
//     const loadingElement = document.querySelector('#loading');
//     const progressElement = document.querySelector('.progress');
//     const percentageElement = document.querySelector('#percentage');
//     let percentage = 0;

//     loadLinks.forEach(function(link) {
//         link.addEventListener('click', function(e) {
//             e.preventDefault(); // Empêche le comportement par défaut du lien
//             // Redirige vers chargement.html
//             window.location.href = 'chargement.html';
//         });
//     });

//     // Si l'élément "loadingElement" existe (sur la page chargement.html)
//     if (loadingElement) {
//         // Afficher les éléments de chargement
//         loadingElement.classList.remove('hidden');

//         // Vérifier la vitesse de connexion
//         const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
//         let intervalTime = 25; // Valeur par défaut

//         if (connection) {
//             const effectiveType = connection.effectiveType;
//             // Vous pouvez ajuster les seuils de vitesse de connexion comme requis
//             if (effectiveType === '4g') {
//                 intervalTime = 12.5; // Divise par 2 pour simuler un chargement plus rapide en 4G
//             }
//             // Vous pouvez ajouter d'autres cas selon vos besoins (3g, 2g, etc.)
//         }

//         const interval = setInterval(() => {
//             if (percentage >= 100) {
//                 percentage = 100;
//                 progressElement.style.width = '100%';
//                 percentageElement.textContent = '100%';
//                 clearInterval(interval);
//                 // Redirige vers versmetierideal.html après une petite pause pour montrer 100% complet
//                 setTimeout(() => {
//                     window.location.href = 'versmetierideal.html';
//                 }, 500); // Ajoute un délai de 500ms pour que l'utilisateur voie la barre pleine
//             } else {
//                 percentage += 1;
//                 progressElement.style.width = percentage + '%';
//                 percentageElement.textContent = percentage + '%';
//             }
//         }, intervalTime);
//     }
// });



//Questionnaire
let currentQuestionId = "question1"
let questionnaireBox = document.querySelector(".questionnaireBox")
let quizElement = document.querySelector('.quiz')
let resultElement = document.querySelector('.result')
let resultTextElement = document.querySelector('.resultText')
let resultProfilElement = document.querySelector('.resultProfil')
let resultExplanationElement = document.querySelector('.resultExplanation')
let resultPossibilitiesElement = document.querySelector('.resultPossibilities')
let resultConclusionElement = document.querySelector('.resultConclusion')
let backButton = document.querySelector('.back')
let questions = []
let questionHistory = [] // Tableau pour suivre l'historique des questions

fetch('scripts/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data
        loadQuestion(currentQuestionId)
    })

function loadQuestion(questionId) {
    const question = questions.find(q => q.id === questionId)
    if (question){
        quizElement.innerHTML = 
        `
            <div class="questionBox question active" id="${question.id}">
                <p>${question.text}</p>
                <button onclick="handleAnswer('${question.id}', 'yes')" class="btnyes">Oui</button>
                <button onclick="handleAnswer('${question.id}', 'no')">Non</button>
            </div>
        `

        // Afficher ou masquer le bouton "Back"
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
    let possibilitiesHtml = possibilities.map(possibility => `<li>${possibility}</li>`).join('');
    resultPossibilitiesElement.innerHTML = 
    `
    <ul>${possibilitiesHtml}</ul>
    `

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