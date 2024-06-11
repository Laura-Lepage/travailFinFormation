// Importer les fonctions nécessaires de Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiXgbkHickHvKv5JVQu02gLd8x8DhQLU4",
    authDomain: "pamelagdigital-11c88.firebaseapp.com",
    projectId: "pamelagdigital-11c88",
    storageBucket: "pamelagdigital-11c88.appspot.com",
    messagingSenderId: "883235524876",
    appId: "1:883235524876:web:4c638ed821fdff46717929"
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Variables Inscription ou Connexion
let inscriptionPartLink = document.querySelector('#signupLink')
let connexionPartLink = document.querySelector('#loginLink')
let inscriptionDiv = document.querySelector('#signupSection')
let connexionDiv = document.querySelector('#loginSection')

// Affichage Inscription ou Connexion

connexionPartLink.classList.add('boldLog') //Connexion automatiquement en bold

inscriptionPartLink.addEventListener('click', function(e) {
    e.preventDefault();
    inscriptionDiv.style.display = 'block'
    connexionDiv.style.display = 'none'
    inscriptionPartLink.classList.add('boldLog')
    connexionPartLink.classList.remove('boldLog')
    
})

connexionPartLink.addEventListener('click', function(e) {
    e.preventDefault();
    inscriptionDiv.style.display = 'none'
    connexionDiv.style.display = 'block'
    inscriptionPartLink.classList.remove('boldLog')
    connexionPartLink.classList.add('boldLog')
})

// Gestion de la soumission du formulaire d'inscription
document.querySelector('#signupForm').addEventListener('click', function(e) {
    e.preventDefault()

    let email = document.querySelector('#signupEmail').value
    let password = document.querySelector('#signupPassword').value
    let confirmPassword = document.querySelector('#signupConfirmPassword').value
    let inscriptionConfirmed = document.querySelector('.inscriptionMsg')

    // Créer un nouvel utilisateur avec Firebase
    createUserWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
            // Inscription réussie, tu peux rediriger l'utilisateur vers une autre page ou effectuer d'autres actions nécessaires
            console.log("Inscription réussie !");
            inscriptionConfirmed.innerHTML = "Inscription réussie !";
            window.location.href = 'versmetierideal.html';
        })
        .catch(function(error) {
            // Gestion des erreurs
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/email-already-in-use') {
        inscriptionConfirmed.textContent = 'Tu as déjà un compte.';
    } else {
        // Autres erreurs
        inscriptionConfirmed.textContent = errorMessage;
        
        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            inscriptionConfirmed.textContent = "Les mots de passe ne correspondent pas !";
            return;
        }
        // Vérifier la longueur du mot de passe
        if (password.length < 6) {
            inscriptionConfirmed.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
            return;
        }
    }
            
            

            
        });
});

// Gestion de la soumission du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let connexionConfirmed = document.querySelector(".connexionMsg")

    // Authentification de l'utilisateur avec Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
            // Connexion réussie, tu peux rediriger l'utilisateur vers une autre page ou effectuer d'autres actions nécessaires
            // Connexion réussie, redirection vers index.html
            console.log("Connexion réussie !");
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = 'index.html';
           

            
        })
        .catch(function(error) {
            // Gestion des erreurs
            // Gestion des erreurs
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                connexionConfirmedconnexionConfirmed.textContent = 'Identifiants incorrects.';
            } else {
                connexionConfirmed.textContent = errorMessage;
            }
        });
});