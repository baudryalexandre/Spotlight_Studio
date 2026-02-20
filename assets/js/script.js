/* ══════════════════════════════════════════
   SPOTLIGHT STUDIO — script.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ────────────────────────
       PREVIEW
    ──────────────────────── */
    const panel = document.getElementById("preview-panel");
    const emptyState = document.getElementById("empty-state");
    const iframe = panel.querySelector("iframe");
    const title = document.getElementById("preview-title");
    const closeBtn = document.getElementById("close-preview");

    // Ouverture — logique originale : titre = parentFolder + versionName
    const buttons = document.querySelectorAll("button[data-src]");
    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            const src = this.getAttribute("data-src");
            iframe.src = src;

            const versionName = this.closest('.version-row').querySelector('.version-name').textContent;
            const parentFolder = this.closest('.accordion-item').querySelector('.accordion-header .folder-name').textContent;
            title.textContent = `${parentFolder} — ${versionName}`;

            // Mettre à jour le bouton "Ouvrir dans un nouvel onglet"
            const newTabBtn = document.getElementById("preview-new-tab");
            if (newTabBtn) newTabBtn.href = src;

            emptyState.style.display = "none";

            // Reset animation
            panel.style.animation = "none";
            panel.offsetHeight;
            panel.style.animation = "";
            panel.style.display = "flex";

            // Mobile : fermer la sidebar après sélection
            if (window.innerWidth < 768) closeSidebar();
        });
    });

    // Fermeture
    closeBtn.addEventListener("click", () => {
        panel.style.display = "none";
        emptyState.style.display = "block";
        iframe.src = "";
    });

    /* ────────────────────────
       RECHERCHE + FILTRES
    ──────────────────────── */
    const searchInput = document.getElementById("search");
    const filters = document.querySelectorAll(".filter");
    const items = document.querySelectorAll("li[data-tags]");

    function filterMenu() {
        const search = searchInput.value.toLowerCase();
        const activeFilters = Array.from(filters).filter(f => f.checked).map(f => f.value);

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const parentText = item.closest('.accordion-item').querySelector('.accordion-header').textContent.toLowerCase();
            const tags = item.getAttribute("data-tags").split(" ");

            const matchSearch = text.includes(search) || parentText.includes(search);
            const matchFilter = tags.some(tag => activeFilters.includes(tag));

            item.style.display = (matchSearch && matchFilter) ? "block" : "none";
        });

        // Ouvrir les accordéons automatiquement si recherche en cours
        if (search.length > 0) {
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.add('active');
                const content = h.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            });
        }
    }

    searchInput.addEventListener("input", filterMenu);
    filters.forEach(f => f.addEventListener("change", filterMenu));

    /* ────────────────────────
       ACCORDÉON — toggle original (pas close-all)
    ──────────────────────── */
    const accordions = document.querySelectorAll(".accordion-header");
    accordions.forEach(header => {
        header.addEventListener("click", () => {
            header.classList.toggle("active");
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    /* ────────────────────────
       SIDEBAR COLLAPSE (desktop)
    ──────────────────────── */
    const collapseBtn = document.getElementById("sidebarCollapse");

    collapseBtn.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        collapseBtn.setAttribute('title', isCollapsed ? 'Ouvrir la sidebar' : 'Réduire la sidebar');
    });

    /* ────────────────────────
       SIDEBAR MOBILE
    ──────────────────────── */
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburger");
    const sidebarClose = document.getElementById("sidebarClose");

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });

});