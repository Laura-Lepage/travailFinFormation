// ---------- Page Chargement ----------
// -------------------------------------

// Au chargement du site...
document.addEventListener('DOMContentLoaded', function() {
    const loadLinks = document.querySelectorAll('.loadLink');
    const loadingElement = document.querySelector('#loading');
    const progressElement = document.querySelector('.progress');
    const percentageElement = document.querySelector('#percentage');
    let percentage = 0;

    // On vérifie si l'utilisateur est connecté ou non
    let userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

    // Vérifier si l'utilisateur a des résultats enregistrés
    const hasResults = localStorage.getItem('hasResults') === 'true';

    // Fonction pour gérer la redirection vers chargement.html
    function redirectToChargement() {
        window.location.href = 'chargement.html';
    }

    // Gestionnaire d'événements pour chaque lien de chargement
    loadLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut du lien

            // Si l'utilisateur est connecté
            if (userLoggedIn) {
                // Si des résultats sont déjà enregistrés
                if (hasResults) {
                    // Demander confirmation avant de refaire le test
                    if (confirm("Vous avez déjà des résultats enregistrés. Êtes-vous sûr de vouloir refaire le test ?")) {
                        redirectToChargement();
                    }
                } else {
                    redirectToChargement();
                }
            } else {
                // Redirection vers la page de connexion
                window.location.href = 'identification.html';
            }
        });
    });

    // Si l'élément "loadingElement" existe (sur la page chargement.html)
    if (loadingElement) {
        // Afficher les éléments de chargement
        loadingElement.classList.remove('hidden');

        // Vérifier la vitesse de connexion
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        let intervalTime = 25; // Valeur par défaut

        if (connection) {
            const effectiveType = connection.effectiveType;
            // Vous pouvez ajuster les seuils de vitesse de connexion comme requis
            if (effectiveType === '4g') {
                intervalTime = 12.5; // Divise par 2 pour simuler un chargement plus rapide en 4G
            }
            // Vous pouvez ajouter d'autres cas selon vos besoins (3g, 2g, etc.)
        }

        const interval = setInterval(() => {
            if (percentage >= 100) {
                percentage = 100;
                progressElement.style.width = '100%';
                percentageElement.textContent = '100%';
                clearInterval(interval);
                // Redirige vers versmetierideal.html après une petite pause pour montrer 100% complet
                setTimeout(() => {
                    window.location.href = 'versmetierideal.html';
                }, 200); // Ajoute un délai de 200ms pour que l'utilisateur voie la barre pleine
            } else {
                percentage += 1;
                progressElement.style.width = percentage + '%';
                percentageElement.textContent = percentage + '%';
            }
        }, intervalTime);
    }
});
