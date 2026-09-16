console.log("Witamy na stronie Gutek Developer!");

// ===============================
// Inicjalizacja strony
// ===============================
function initPage() {
    // ===============================
    // Efekt "fade-in" sekcji + Scroll-Spy dla Spisu Treści
    // ===============================
    const sections = document.querySelectorAll("section");
    const tocLinks = document.querySelectorAll(".toc-link");

    function revealSectionsAndHighlightTOC() {
        const triggerBottom = window.innerHeight * 0.85;
        let activeSectionId = "about-section";

        sections.forEach((sec) => {
            const top = sec.getBoundingClientRect().top;
            const bottom = sec.getBoundingClientRect().bottom;

            // 1. Reveal sections (fade-in)
            if (top < triggerBottom) {
                sec.classList.add("visible");
            }

            // 2. Highlight active section (Scroll-Spy)
            if (top < window.innerHeight * 0.3 && bottom > 0 && sec.id) {
                activeSectionId = sec.id;
            }
        });

        // Obsługa góry strony
        if (window.pageYOffset < 100) {
            activeSectionId = "about-section";
        }

        // Aktualizuj linki w TOC
        tocLinks.forEach((link) => {
            link.classList.remove("active");

            const href = link.getAttribute("href");
            if (href && href.substring(1) === activeSectionId) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealSectionsAndHighlightTOC, { passive: true });
    window.addEventListener("resize", revealSectionsAndHighlightTOC);

    // Pierwsze uruchomienie od razu po załadowaniu DOM
    revealSectionsAndHighlightTOC();

    // ===============================
    // Skrypt do ukrywania/pokazywania nagłówka przy przewijaniu
    // ===============================
    let lastScrollTop = 0;
    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
        if (!header) return;

        const currentScroll = Math.max(
            0,
            window.pageYOffset || document.documentElement.scrollTop
        );
        const headerHeight = header.offsetHeight;

        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            header.style.top = `-${headerHeight}px`;
        } else {
            header.style.top = "0";
        }

        lastScrollTop = currentScroll;
    }, { passive: true });

    // ===============================
    // Logika Mobile Menu
    // ===============================
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const menuClose = document.getElementById("mobile-menu-close");
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    const mobileTocLinks = document.querySelectorAll("#mobile-toc .toc-link");

    function closeMobileMenu() {
        if (!menuOverlay) return;

        menuOverlay.classList.remove("open");
        document.body.style.overflow = "";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }

    if (menuToggle && menuClose && menuOverlay) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-controls", "mobile-menu-overlay");

        menuToggle.addEventListener("click", function () {
            menuOverlay.classList.add("open");
            document.body.style.overflow = "hidden";
            menuToggle.setAttribute("aria-expanded", "true");
        });

        menuClose.addEventListener("click", closeMobileMenu);

        mobileTocLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                closeMobileMenu();

                const targetId = link.getAttribute("href");
                if (!targetId) return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && menuOverlay.classList.contains("open")) {
                closeMobileMenu();
            }
        });
    }

    // ===============================
    // Automatyczny rok w stopce
    // ===============================
    const currentYear = document.getElementById("current-year");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Uruchamiamy skrypt niezależnie od tego, kiedy przeglądarka go wczyta.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
} else {
    initPage();
}

