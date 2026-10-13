// Gutek Developer — nawigacja, animacje sekcji i drobne usprawnienia UX.
(function () {
    "use strict";

    function initPage() {
        document.body.classList.add("js-ready");

        const header = document.querySelector(".header");
        const menuToggle = document.getElementById("mobile-menu-toggle");
        const menuClose = document.getElementById("mobile-menu-close");
        const menuOverlay = document.getElementById("mobile-menu-overlay");
        const mobileTocLinks = document.querySelectorAll("#mobile-toc .toc-link");
        const tocLinks = document.querySelectorAll(".toc-link");
        const sections = Array.from(document.querySelectorAll("main section[id]"));
        const currentYear = document.getElementById("current-year");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Oznaczamy sekcje do subtelnego wejścia. Bez JS treść pozostaje widoczna.
        sections.forEach((section) => section.classList.add("scroll-reveal"));

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.06, rootMargin: "0px 0px -35px 0px" });

            sections.forEach((section) => revealObserver.observe(section));
        } else {
            sections.forEach((section) => section.classList.add("visible"));
        }

        function updateActiveLink() {
            let activeId = "about-section";
            const marker = Math.min(window.innerHeight * 0.28, 230);

            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= marker && rect.bottom > marker) activeId = section.id;
            }

            if (window.scrollY < 100) activeId = "about-section";

            tocLinks.forEach((link) => {
                const isActive = link.getAttribute("href") === `#${activeId}`;
                link.classList.toggle("active", isActive);
                if (isActive) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        }

        let scrollQueued = false;
        function onScroll() {
            if (scrollQueued) return;
            scrollQueued = true;
            window.requestAnimationFrame(() => {
                updateActiveLink();
                if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
                scrollQueued = false;
            });
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateActiveLink, { passive: true });
        updateActiveLink();

        function closeMobileMenu() {
            if (!menuOverlay) return;
            menuOverlay.classList.remove("open");
            document.body.style.overflow = "";
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.focus({ preventScroll: true });
            }
        }

        if (menuToggle && menuClose && menuOverlay) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-controls", "mobile-menu-overlay");

            menuToggle.addEventListener("click", () => {
                menuOverlay.classList.add("open");
                document.body.style.overflow = "hidden";
                menuToggle.setAttribute("aria-expanded", "true");
                menuClose.focus({ preventScroll: true });
            });

            menuClose.addEventListener("click", closeMobileMenu);
            menuOverlay.addEventListener("click", (event) => {
                if (event.target === menuOverlay) closeMobileMenu();
            });

            mobileTocLinks.forEach((link) => {
                link.addEventListener("click", (event) => {
                    const targetId = link.getAttribute("href");
                    if (!targetId || !targetId.startsWith("#")) return;
                    const target = document.querySelector(targetId);
                    if (!target) return;

                    event.preventDefault();
                    closeMobileMenu();
                    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
                    if (window.history && window.history.replaceState) window.history.replaceState(null, "", targetId);
                });
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && menuOverlay.classList.contains("open")) closeMobileMenu();
            });
        }

        // Rok w stopce zawsze zgodny z bieżącym rokiem.
        if (currentYear) currentYear.textContent = String(new Date().getFullYear());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPage, { once: true });
    } else {
        initPage();
    }
})();
