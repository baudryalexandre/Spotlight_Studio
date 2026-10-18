/* ══════════════════════════════════════════
   SPOTLIGHT STUDIO — script.js (Final)
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ────────────────────────
       1. DÉCLARATIONS DOM
    ──────────────────────── */
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburger");
    const sidebarClose = document.getElementById("sidebarClose");
    const collapseBtn = document.getElementById("sidebarCollapse");

    const panel = document.getElementById("preview-panel");
    const emptyState = document.getElementById("empty-state");
    const iframe = panel.querySelector("iframe");
    const title = document.getElementById("preview-title");
    const closeBtn = document.getElementById("close-preview");
    const newTabBtn = document.getElementById("preview-new-tab");

    const searchInput = document.getElementById("search");
    const filters = document.querySelectorAll(".filter");
    const items = document.querySelectorAll("li[data-tags]");
    const accordions = document.querySelectorAll(".accordion-header");
    const viewButtons = document.querySelectorAll("button[data-src]");


    /* ────────────────────────
       2. LOGIQUE D'APERÇU (PREVIEW)
    ──────────────────────── */
    viewButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Sécurité : empêche l'action si l'élément est estompé (dimmed)
            if (this.closest('li').classList.contains('dimmed')) return;

            const src = this.getAttribute("data-src");
            iframe.src = src;

            const versionName = this.closest('.version-row').querySelector('.version-name').textContent;
            const parentFolder = this.closest('.accordion-item').querySelector('.accordion-header .folder-name').textContent;
            title.textContent = `${parentFolder} — ${versionName}`;

            if (newTabBtn) newTabBtn.href = src;

            emptyState.style.display = "none";

            // Reset de l'animation CSS pour la rejouer à chaque clic
            panel.style.animation = "none";
            panel.offsetHeight;
            panel.style.animation = "";
            panel.style.display = "flex";

            if (window.innerWidth < 768) closeSidebar();
        });
    });

    closeBtn.addEventListener("click", () => {
        panel.style.display = "none";
        emptyState.style.display = "block";
        iframe.src = "";
    });


    /* ───────────────────────
       3. FILTRES & RECHERCHE (Focus Mode)
    ──────────────────────── */

    function updateFilterVisuals() {
        filters.forEach(filter => {
            const chip = filter.closest('.filter-chip');
            if (filter.checked) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
    }

    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            updateFilterVisuals();
            filterMenu();
        });
    });

    // Initialisation au chargement
    updateFilterVisuals();

    function filterMenu() {
        const search = searchInput.value.toLowerCase().trim();
        const activeFilters = Array.from(filters).filter(f => f.checked).map(f => f.value);

        const isVersionsFilterActive = activeFilters.includes('v');
        const standardFilters = activeFilters.filter(f => f !== 'v');

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const parentText = item.closest('.accordion-item').querySelector('.accordion-header').textContent.toLowerCase();
            const tags = item.getAttribute("data-tags").split(" ");

            // 1. Recherche textuelle
            const matchSearch = text.includes(search) || parentText.includes(search);

            // 2. Filtres standards (stable, proto)
            const matchStandardTags = standardFilters.length === 0 || tags.some(tag => standardFilters.includes(tag));

            // 3. Filtre spécial "Versions" (Vérifie si le projet parent a les deux)
            let matchVersions = true;
            if (isVersionsFilterActive) {
                const parentAccordion = item.closest('.accordion-item');
                const hasStable = parentAccordion.querySelector('li[data-tags*="stable"]') !== null;
                const hasProto = parentAccordion.querySelector('li[data-tags*="proto"]') !== null;
                matchVersions = hasStable && hasProto;
            }

            const isMatch = matchSearch && matchStandardTags && matchVersions;

            // LOGIQUE FOCUS MODE (Dimming)
            if (isMatch) {
                item.classList.remove('dimmed');
                item.style.display = 'block';
            } else {
                item.classList.add('dimmed');
                item.style.display = 'block'; // Reste visible mais estompé
            }
        });

        // Gestion de l'ouverture/fermeture des accordéons + dimming des en-têtes
        const allHeaders = document.querySelectorAll('.accordion-header');
        const shouldAutoOpen = search.length > 0 || activeFilters.length > 0;

        if (shouldAutoOpen) {
            allHeaders.forEach(h => {
                const content = h.nextElementSibling;
                const items = Array.from(content.querySelectorAll('li'));
                const hasActiveItems = items.some(li => !li.classList.contains('dimmed'));
                const allDimmed = items.every(li => li.classList.contains('dimmed'));

                // Ouvre si au moins un élément est actif
                if (hasActiveItems) {
                    h.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    // En-tête normal
                    h.closest('.accordion-item').classList.remove('dimmed');
                } else {
                    h.classList.remove('active');
                    content.style.maxHeight = null;
                    // En-tête estompé si tous les enfants le sont
                    if (allDimmed) {
                        h.closest('.accordion-item').classList.add('dimmed');
                    } else {
                        h.closest('.accordion-item').classList.remove('dimmed');
                    }
                }
            });
        } else {
            // État initial : tout fermé, rien d'estompé
            allHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
                h.closest('.accordion-item').classList.remove('dimmed');
            });
        }
    }

    searchInput.addEventListener("input", filterMenu);


    /* ────────────────────────
       4. ACCORDÉON (Toggle manuel)
    ──────────────────────── */
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
       5. SIDEBAR (Mobile & Desktop)
    ──────────────────────── */
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

    collapseBtn.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        collapseBtn.setAttribute('title', isCollapsed ? 'Ouvrir la sidebar' : 'Réduire la sidebar');

        const icon = collapseBtn.querySelector('i');
        icon.classList.toggle('fa-angles-left');
        icon.classList.toggle('fa-angles-right');
    });


    /* ────────────────────────
       6. RACCOURCIS CLAVIER
    ──────────────────────── */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });

});