//Page de chargement
document.addEventListener('DOMContentLoaded', function() {
    const loadLinks = document.querySelectorAll('.loadLink');
    const loadingElement = document.querySelector('#loading');
    const progressElement = document.querySelector('.progress');
    const percentageElement = document.querySelector('#percentage');
    let percentage = 0;

    loadLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); //Empêche le comportement par défaut du lien
            //Redirige vers chargement.html
            window.location.href = 'chargement.html';
        });
    });

    // Si l'élément "loadingElement" existe (sur la page chargement.html)
    if (loadingElement) {
        // Afficher les éléments de chargement
        loadingElement.classList.remove('hidden');

        const interval = setInterval(() => {
            if (percentage >= 100) {
                clearInterval(interval);
                // Redirige vers versmetierideal.html après le chargement complet
                window.location.href = 'versmetierideal.html';
            } else {
                percentage += 1;
                progressElement.style.width = percentage + '%';
                percentageElement.textContent = percentage + '%';
            }
        }, 25);

        // Vérifier la vitesse de connexion
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            const effectiveType = connection.effectiveType;
            // Vous pouvez ajuster les seuils de vitesse de connexion comme requis
            if (effectiveType === '4g') {
                // Ajuster le temps de chargement en fonction de la vitesse de connexion
                // Par exemple, multiplier ou diviser le temps de chargement en fonction de la vitesse de connexion
                // Ici, nous divisons par 2 pour simuler un chargement plus rapide en 4G
                clearInterval(interval); // Efface l'intervalle existant
                const newInterval = setInterval(() => {
                    if (percentage >= 100) {
                        clearInterval(newInterval);
                        // Redirige vers versmetierideal.html après le chargement complet
                        window.location.href = 'versmetierideal.html';
                    } else {
                        percentage += 2; // Charger deux fois plus vite
                        progressElement.style.width = percentage + '%';
                        percentageElement.textContent = percentage + '%';
                    }
                }, 25);
            }
            // Vous pouvez ajouter d'autres cas selon vos besoins (3g, 2g, etc.)
        }
    }
});


