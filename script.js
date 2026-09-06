console.log("Witamy na stronie Gutek Developer!");

// ===============================
// Efekt "fade-in" sekcji + Scroll-Spy dla Spisu Treści
// ===============================
const sections = document.querySelectorAll("section"); 
const tocLinks = document.querySelectorAll(".toc-link");

function revealSectionsAndHighlightTOC() {
    const triggerBottom = window.innerHeight * 0.85;
    let activeSectionId = 'about-section'; // Domyślnie pierwsza sekcja

    sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        const bottom = sec.getBoundingClientRect().bottom;
        
        // 1. Reveal sections (fade-in)
        if (top < triggerBottom) {
            sec.classList.add("visible");
        }

        // 2. Highlight active section (Scroll-Spy)
        if (top < window.innerHeight * 0.3 && bottom > 0) {
            if (sec.id) {
                activeSectionId = sec.id;
            }
        }
    });
    
    // Obsługa góry strony
    if (window.pageYOffset < 100) {
         activeSectionId = 'about-section';
    }

    // Aktualizuj linki w TOC
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === activeSectionId) {
            link.classList.add('active');
        }
    });
}

window.addEventListener("scroll", revealSectionsAndHighlightTOC);
window.addEventListener("DOMContentLoaded", revealSectionsAndHighlightTOC);

// ===============================
// Skrypt do ukrywania/pokazywania nagłówka przy przewijaniu
// ===============================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  if (!header) return; 

  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const headerHeight = header.offsetHeight;

  if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
    header.style.top = `-${headerHeight}px`; 
  } else {
    header.style.top = '0'; 
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// ===============================
// Logika Mobile Menu
// ===============================
const menuToggle = document.getElementById('mobile-menu-toggle');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('mobile-menu-overlay');
const mobileTocLinks = document.querySelectorAll('#mobile-toc .toc-link');

if (menuToggle && menuClose && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    mobileTocLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
