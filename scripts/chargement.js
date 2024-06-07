//Page de chargement
document.addEventListener('DOMContentLoaded', function() {
    const loadLinks = document.querySelectorAll('.loadLink')
    const loadingElement = document.querySelector('#loading')
    const progressElement = document.querySelector('.progress')
    const percentageElement = document.querySelector('#percentage')
    let percentage = 0
  
    loadLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault() //Empêche le comportement par défaut du lien
            //Redirige vers chargement.html
            window.location.href = 'chargement.html'
        })
    })
  
    // Si l'élément "loadingElement" existe (sur la page chargement.html)
    if (loadingElement) {
        // Afficher les éléments de chargement
        loadingElement.classList.remove('hidden')
  
        const interval = setInterval(() => {
            if (percentage >= 100) {
                clearInterval(interval)
                // Redirige vers versmetierideal.html après le chargement complet
                window.location.href = 'versmetierideal.html'
            } else {
                percentage += 1
                progressElement.style.width = percentage + '%'
                percentageElement.textContent = percentage + '%'
            }
        }, 25)
    }
  })