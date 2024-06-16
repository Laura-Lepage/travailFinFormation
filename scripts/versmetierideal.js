//Click sur la croix
document.addEventListener("DOMContentLoaded", function() {
    const versmetieridealCross = document.querySelector(".versmetieridealCross");
    versmetieridealCross.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});

// Importez les fonctionnalités nécessaires depuis le SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiXgbkHickHvKv5JVQu02gLd8x8DhQLU4",
    authDomain: "pamelagdigital-11c88.firebaseapp.com",
    projectId: "pamelagdigital-11c88",
    storageBucket: "pamelagdigital-11c88.appspot.com",
    messagingSenderId: "883235524876",
    appId: "1:883235524876:web:4c638ed821fdff46717929"
};

// Initialisez votre application Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtenez une référence à l'objet d'authentification
const auth = getAuth(firebaseApp);

// Initialisez Firestore
const db = getFirestore(firebaseApp);

// Fonction pour sauvegarder les résultats du questionnaire
async function saveQuestionnaireResults(userId, results) {
    try {
        await setDoc(doc(db, "users", userId, "questionnaires", "latest"), results);
        console.log("Résultats enregistrés avec succès !");
    } catch (e) {
        console.error("Erreur lors de l'enregistrement des résultats: ", e);
    }
}

async function getUserQuestionnaireResults(userId) {
    const docRef = doc(db, "users", userId, "questionnaires", "latest");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Résultats du questionnaire:", docSnap.data());
    } else {
      console.log("Aucun résultat de questionnaire trouvé pour cet utilisateur.");
    }
  }
  
// Questionnaire
let currentQuestionId = "question1";
let questionnaireBox = document.querySelector(".questionnaireBox");
let quizElement = document.querySelector('.quiz');
let resultElement = document.querySelector('.result');
let resultTextElement = document.querySelector('.resultText');
let resultProfilElement = document.querySelector('.resultProfil');
let resultExplanationElement = document.querySelector('.resultExplanation');
let resultPossibilitiesElement = document.querySelector('.resultPossibilities');
let resultConclusionElement = document.querySelector('.resultConclusion');
let backButton = document.querySelector('.back');
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
        quizElement.innerHTML = 
        `
            <div class="questionBox question active" id="${question.id}">
                <p>${question.text}</p>
                <button class="btnyes">Oui</button>
                <button>Non</button>
            </div>
        `;

        // Ajouter des gestionnaires d'événements aux boutons après leur création
        const yesButton = document.querySelector('.btnyes');
        const noButton = yesButton.nextElementSibling;
        
        yesButton.addEventListener('click', () => handleAnswer(question.id, 'yes'));
        noButton.addEventListener('click', () => handleAnswer(question.id, 'no'));

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
        endQuiz("Oups ! Le domaine IT n'est peut-être pas fait pour toi. Je t'invite à réserver une session gratuite de 30 minutes pour explorer d'autres voies ensemble.");
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

async function showResult(result, explanation, possibilities, conclusion) {
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
    `;

    resultConclusionElement.innerText = conclusion;

    // Vérifiez si l'utilisateur est connecté, puis enregistrez les résultats
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const results = {
                result: result,
                explanation: explanation,
                possibilities: possibilities,
                conclusion: conclusion
            };
            saveQuestionnaireResults(user.uid, results);
            getUserQuestionnaireResults(user.uid);
        } else {
            console.log("Utilisateur non connecté. Résultats non enregistrés.");
        }
    });
}

function endQuiz(message) {
    questionnaireBox.style.display = 'none';
    resultElement.style.display = 'block';
    resultTextElement.innerText = message;
    resultExplanationElement.innerText = '';
}

window.restartQuiz = function restartQuiz() {
    currentQuestionId = 'question1'; // Réinitialise l'identifiant de la question actuelle
    questionnaireBox.style.display = 'block';
    resultElement.style.display = 'none';
    resultTextElement.innerText = '';
    resultProfilElement.innerText = '';
    resultExplanationElement.innerText = '';
    resultPossibilitiesElement.innerHTML = '';
    resultConclusionElement.innerText = '';
    questionHistory = []; // Réinitialise l'historique des questions
    loadQuestion(currentQuestionId);
}

