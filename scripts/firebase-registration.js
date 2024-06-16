//Click sur la croix
document.addEventListener("DOMContentLoaded", function() {
    const identificationCross = document.querySelector(".identificationCross");
    identificationCross.addEventListener("click", function() {
        window.location.href = "index.html";
    });
})



// // Importer les fonctions nécessaires de Firebase SDKs
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// // Configuration Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyBiXgbkHickHvKv5JVQu02gLd8x8DhQLU4",
//     authDomain: "pamelagdigital-11c88.firebaseapp.com",
//     projectId: "pamelagdigital-11c88",
//     storageBucket: "pamelagdigital-11c88.appspot.com",
//     messagingSenderId: "883235524876",
//     appId: "1:883235524876:web:4c638ed821fdff46717929"
// }

// // Initialiser Firebase
// const firebaseApp = initializeApp(firebaseConfig)
// const auth = getAuth(firebaseApp)
// const db = getFirestore(firebaseApp);

// // Fonction pour sauvegarder le prénom de l'utilisateur
// async function saveName(userId, firstname) {
//     try {
//         await setDoc(doc(db, "users", userId), { firstname: firstname }, { merge: true });
//         console.log("Prénom enregistré avec succès !");
//     } catch (e) {
//         console.error("Erreur lors de l'enregistrement du prénom: ", e);
//     }
// }

// // Variables Inscription ou Connexion
// let inscriptionPartLink = document.querySelector('#signupLink')
// let connexionPartLink = document.querySelector('#loginLink')
// let inscriptionDiv = document.querySelector('#signupSection')
// let connexionDiv = document.querySelector('#loginSection')

// // Affichage Inscription ou Connexion
// inscriptionPartLink.classList.add('boldLog') //Connexion automatiquement en bold

// inscriptionPartLink.addEventListener('click', function(e) {
//     e.preventDefault();
//     inscriptionDiv.style.display = 'block'
//     connexionDiv.style.display = 'none'
//     inscriptionPartLink.classList.add('boldLog')
//     connexionPartLink.classList.remove('boldLog')
// })

// connexionPartLink.addEventListener('click', function(e) {
//     e.preventDefault();
//     inscriptionDiv.style.display = 'none'
//     connexionDiv.style.display = 'block'
//     inscriptionPartLink.classList.remove('boldLog')
//     connexionPartLink.classList.add('boldLog')
// })

// document.querySelector('#signupForm').addEventListener('submit', function(e) {
//     e.preventDefault()

//     let firstname = document.querySelector('#nameSignup').value
//     let email = document.querySelector('#signupEmail').value
//     let password = document.querySelector('#signupPassword').value
//     let confirmPassword = document.querySelector('#signupConfirmPassword').value
//     let inscriptionConfirmed = document.querySelector('.inscriptionMsg')

//     // Vérifier si les mots de passe correspondent
//     if (password !== confirmPassword) {
//         inscriptionConfirmed.textContent = "Les mots de passe ne correspondent pas !";
//         return;
//     }

//     // Vérifier la longueur du mot de passe
//     if (password.length < 6) {
//         inscriptionConfirmed.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
//         return;
//     }

//     // Créer un nouvel utilisateur avec Firebase
//     createUserWithEmailAndPassword(auth, email, password) 
//         .then(async function(userCredential) {
//             // Inscription réussie, tu peux rediriger l'utilisateur vers une autre page ou effectuer d'autres actions nécessaires
//             console.log("Inscription réussie !");
//             inscriptionConfirmed.innerHTML = "Inscription réussie !";
//             const user = userCredential.user;
//             await saveName(user.uid, firstname);
//             localStorage.setItem('userLoggedIn', 'true');
//             window.location.href = 'moncompte.html';
//         })
//         .catch(function(error) {
//             // Gestion des erreurs
//             var errorCode = error.code;
//             var errorMessage = error.message;

//             if (errorCode === 'auth/email-already-in-use') {
//                 inscriptionConfirmed.textContent = 'Tu as déjà un compte.';
//             } else {
//                 // Autres erreurs
//                 inscriptionConfirmed.textContent = errorMessage;
//             }
//         });
// });

// // Gestion de la soumission du formulaire de connexion
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let email = document.getElementById('loginEmail').value;
//     let password = document.getElementById('loginPassword').value;
//     let connexionConfirmed = document.querySelector(".connexionMsg")

//     // Authentification de l'utilisateur avec Firebase
//     signInWithEmailAndPassword(auth, email, password)
//         .then(function(userCredential) {
//             // Connexion réussie, tu peux rediriger l'utilisateur vers une autre page ou effectuer d'autres actions nécessaires
//             console.log("Connexion réussie !");
//             localStorage.setItem('userLoggedIn', 'true');
//             window.location.href = 'moncompte.html';
//         })
//         .catch(function(error) {
//             connexionConfirmed.textContent = "Impossible de se connecter au compte. Vérifie que ton adresse e-mail et/ou ton mot de passe soient corrects.";
//         });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const togglePasswordIcons = document.querySelectorAll('.togglePassword');
//     const passwordInputs = document.querySelectorAll('.signupPasswordeye');

//     togglePasswordIcons.forEach(function(icon, index) {
//         icon.addEventListener('click', function() {
//             // Toggle du type d'input entre 'password' et 'text'
//             const type = passwordInputs[index].getAttribute('type') === 'password' ? 'text' : 'password';
//             passwordInputs[index].setAttribute('type', type);

//             // Toggle de l'icône entre œil ouvert et œil barré
//             if (type === 'text') {
//                 this.classList.remove('fa-eye');
//                 this.classList.add('fa-eye-slash');
//             } else {
//                 this.classList.remove('fa-eye-slash');
//                 this.classList.add('fa-eye');
//             }
//         });
//     });
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiXgbkHickHvKv5JVQu02gLd8x8DhQLU4",
    authDomain: "pamelagdigital-11c88.firebaseapp.com",
    projectId: "pamelagdigital-11c88",
    storageBucket: "pamelagdigital-11c88.appspot.com",
    messagingSenderId: "883235524876",
    appId: "1:883235524876:web:4c638ed821fdff46717929"
};

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Fonction pour sauvegarder le prénom de l'utilisateur dans Firestore
async function saveName(userId, firstname) {
    try {
        await setDoc(doc(db, "users", userId), { firstname: firstname }, { merge: true });
        console.log("Prénom enregistré avec succès !");
    } catch (e) {
        console.error("Erreur lors de l'enregistrement du prénom: ", e);
    }
}

// Fonction pour ajouter un abonné à Mailjet
async function addSubscriber(email, firstName, lastName) {
    const apiKey = '28ae12e0c47f67f9edb8430653b8cd3f';
    const apiSecret = '24c626c84df42777e165e27ed7056dd1';
    const url = 'https://api.mailjet.com/v3/REST/contact';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(apiKey + ':' + apiSecret),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                IsExcludedFromCampaigns: false,
                Name: `${firstName} ${lastName}`
            })
        });

        if (response.ok) {
            console.log(`Successfully added ${email} to the Mailjet list.`);
        } else {
            const data = await response.json();
            throw new Error(`Failed to add subscriber: ${data.ErrorMessage}`);
        }
    } catch (error) {
        console.error('Error adding subscriber:', error.message);
        throw error;
    }
}

// Variables pour la gestion de l'affichage de l'inscription et connexion
let inscriptionPartLink = document.querySelector('#signupLink');
let connexionPartLink = document.querySelector('#loginLink');
let inscriptionDiv = document.querySelector('#signupSection');
let connexionDiv = document.querySelector('#loginSection');

// Écouteur de clic pour l'affichage de l'inscription
inscriptionPartLink.classList.add('boldLog'); // Mettre la connexion en gras automatiquement
inscriptionPartLink.addEventListener('click', function(e) {
    e.preventDefault();
    inscriptionDiv.style.display = 'block';
    connexionDiv.style.display = 'none';
    inscriptionPartLink.classList.add('boldLog');
    connexionPartLink.classList.remove('boldLog');
});

// Écouteur de clic pour l'affichage de la connexion
connexionPartLink.addEventListener('click', function(e) {
    e.preventDefault();
    inscriptionDiv.style.display = 'none';
    connexionDiv.style.display = 'block';
    inscriptionPartLink.classList.remove('boldLog');
    connexionPartLink.classList.add('boldLog');
});

// Écouteur pour la soumission du formulaire d'inscription
document.querySelector('#signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let firstname = document.querySelector('#nameSignup').value;
    let email = document.querySelector('#signupEmail').value;
    let password = document.querySelector('#signupPassword').value;
    let confirmPassword = document.querySelector('#signupConfirmPassword').value;
    let inscriptionConfirmed = document.querySelector('.inscriptionMsg');

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

    try {
        // Créer un nouvel utilisateur avec Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Inscription réussie
        console.log("Inscription réussie !");
        inscriptionConfirmed.innerHTML = "Inscription réussie !";
        const user = userCredential.user;
        await saveName(user.uid, firstname);
        localStorage.setItem('userLoggedIn', 'true');

        // Ajouter l'utilisateur à Mailjet
        await addSubscriber(email, firstname, '');

        // Redirection après l'inscription
        window.location.href = 'moncompte.html';
    } catch (error) {
        // Gestion des erreurs Firebase
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
            inscriptionConfirmed.textContent = 'Tu as déjà un compte.';
        } else {
            inscriptionConfirmed.textContent = errorMessage;
        }
    }
});

// Écouteur pour la soumission du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let connexionConfirmed = document.querySelector(".connexionMsg");

    // Connexion de l'utilisateur avec Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
            // Connexion réussie
            console.log("Connexion réussie !");
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = 'moncompte.html'; // Redirection après la connexion
        })
        .catch(function(error) {
            // Gestion des erreurs Firebase
            connexionConfirmed.textContent = "Impossible de se connecter au compte. Vérifie que ton adresse e-mail et/ou ton mot de passe soient corrects.";
        });
});

// Écouteur pour la manipulation des mots de passe visibles/invisibles
document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordIcons = document.querySelectorAll('.togglePassword');
    const passwordInputs = document.querySelectorAll('.signupPasswordeye');

    togglePasswordIcons.forEach(function(icon, index) {
        icon.addEventListener('click', function() {
            // Basculer entre le type d'input 'password' et 'text'
            const type = passwordInputs[index].getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInputs[index].setAttribute('type', type);

            // Basculer entre l'icône d'œil ouvert et d'œil barré
            if (type === 'text') {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
});
