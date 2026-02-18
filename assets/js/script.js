const buttons = document.querySelectorAll("button[data-src]");
const panel = document.getElementById("preview-panel");
const emptyState = document.getElementById("empty-state");
const iframe = panel.querySelector("iframe");
const title = document.getElementById("preview-title");
const closeBtn = document.getElementById("close-preview");

// Ouverture Preview
buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        // Mettre à jour la source
        const src = this.getAttribute("data-src");
        iframe.src = src;
        
        // Mettre à jour le titre (on remonte au parent pour trouver le nom)
        const versionName = this.closest('.version-row').querySelector('.version-name').textContent;
        const parentFolder = this.closest('.accordion-item').querySelector('.accordion-header span').textContent;
        title.textContent = `${parentFolder} - ${versionName}`;
        
        // Afficher le panneau et cacher l'état vide
        emptyState.style.display = "none";
        panel.style.display = "flex";
    });
});

// Fermer Preview
closeBtn.addEventListener("click", () => {
    panel.style.display = "none";
    emptyState.style.display = "block"; // Réafficher l'état vide
    iframe.src = "";
});

// Recherche + Filtres
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll("li[data-tags]");

function filterMenu() {
    const search = searchInput.value.toLowerCase();
    const activeFilters = Array.from(filters).filter(f => f.checked).map(f => f.value);

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        // On récupère le texte du header de l'accordéon parent aussi pour la recherche
        const parentText = item.closest('.accordion-item').querySelector('.accordion-header').textContent.toLowerCase();
        
        const tags = item.getAttribute("data-tags").split(" ");
        
        // Recherche dans le nom de la version OU le nom du dossier parent
        const matchSearch = text.includes(search) || parentText.includes(search);
        const matchFilter = tags.some(tag => activeFilters.includes(tag));
        
        if (matchSearch && matchFilter) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    // Optionnel : Ouvrir automatiquement les accordéons si une recherche est en cours
    if(search.length > 0) {
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.add('active');
            const content = h.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + "px";
        });
    }
}

searchInput.addEventListener("input", filterMenu);
filters.forEach(f => f.addEventListener("change", filterMenu));

// Accordéon avec Animation
const accordions = document.querySelectorAll(".accordion-header");
accordions.forEach(header => {
    header.addEventListener("click", () => {
        // Toggle de la classe active pour la flèche
        header.classList.toggle("active");
        
        // Gestion de la hauteur pour l'animation CSS
        const content = header.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});