//Click sur la croix
document.addEventListener("DOMContentLoaded", function() {
    const moncompteCross = document.querySelector(".moncompteCross");
    moncompteCross.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});


// Importer les fonctionnalités Firestore nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiXgbkHickHvKv5JVQu02gLd8x8DhQLU4",
    authDomain: "pamelagdigital-11c88.firebaseapp.com",
    projectId: "pamelagdigital-11c88",
    storageBucket: "pamelagdigital-11c88.appspot.com",
    messagingSenderId: "883235524876",
    appId: "1:883235524876:web:4c638ed821fdff46717929"
}

// Initialisez votre application Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialisez Firestore
const db = getFirestore(firebaseApp);

// Obtenez une référence à l'objet d'authentification
const auth = getAuth(firebaseApp);


// Fonction pour récupérer et afficher les résultats de l'utilisateur
async function afficherResultatsUtilisateur(userId) {
    const docRef = doc(db, "users", userId, "questionnaires", "latest");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const resultmoncompteDiv = document.querySelector(".resultmoncompte");

        // Mettre à jour le contenu de la div avec les résultats récupérés
        resultmoncompteDiv.innerHTML = `
            <h2>Résultats de votre questionnaire :</h2>
            <p>Résultat : ${data.result}</p>
            <p>Explication : ${data.explanation}</p>
            <p>Possibilités : ${data.possibilities.join(", ")}</p>
            <p>Conclusion : ${data.conclusion}</p>
        `;
    } else {
        console.log("Aucun résultat de questionnaire trouvé pour cet utilisateur.");
    }
}

// Utilisez cette fonction pour afficher les résultats de l'utilisateur après qu'il se soit connecté
onAuthStateChanged(auth, (user) => {
    if (user) {
        afficherResultatsUtilisateur(user.uid);
    } else {
        console.log("Utilisateur non connecté. Résultats non affichés.");
    }
});





