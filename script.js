console.log("Witamy w aplikacji MedOpiekun!");

// ===============================
// Efekt "fade-in" sekcji + Scroll-Spy dla Spisu Treści
// ZMIENIONO: Wybieramy wszystkie sekcje (w tym about-section), aby otrzymały klasę 'visible' i były widoczne.
const sections = document.querySelectorAll("section"); 
const tocLinks = document.querySelectorAll(".toc-link");

function revealSectionsAndHighlightTOC() {
    const triggerBottom = window.innerHeight * 0.85;
    let activeSectionId = 'hero-section'; // Domyślnie Start

    sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        const bottom = sec.getBoundingClientRect().bottom;
        
        // 1. Reveal sections (fade-in)
        if (top < triggerBottom) {
            sec.classList.add("visible");
        }

        // 2. Highlight active section (Scroll-Spy)
        // Sprawdza, czy sekcja jest w widoku (powyżej 30% wysokości viewportu)
        if (top < window.innerHeight * 0.3 && bottom > 0) {
            activeSectionId = sec.id;
        }
    });
    
    // Obsługa dla sekcji Hero (tylko gdy jest na samej górze, przed pierwszą sekcją)
    const firstSection = document.querySelector('section');
    if (firstSection && window.pageYOffset < firstSection.offsetTop - 100) {
         activeSectionId = 'hero-section';
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
// (Zachowane - z drobną poprawką)
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
// Logika Mobile Menu (TOC na małe ekrany)
// ===============================
const menuToggle = document.getElementById('mobile-menu-toggle');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('mobile-menu-overlay');
const mobileTocLinks = document.querySelectorAll('#mobile-toc .toc-link');

// Otwieranie menu
menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Blokowanie scrolla pod spodem
});

// Zamykanie menu
menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Przywracanie scrolla
});

// Zamykanie menu po kliknięciu w link
mobileTocLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
        // Dodaj płynne przewijanie do sekcji
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});


// ===============================
// Logika Lightbox (Powiększenie zdjęć)
// ===============================

const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

// Wybieramy wszystkie zdjęcia z klasy .mockup, które są w galeriach funkcjonalności
const mockupImages = document.querySelectorAll('.feature-media img.mockup');

// 1. Otwieranie lightboxa
mockupImages.forEach(image => {
    image.style.cursor = 'zoom-in'; // Zmień kursor, by sugerować powiększenie
    
    image.addEventListener('click', function() {
        // Pobierz ścieżkę źródłową klikniętego obrazka
        const imageSrc = this.getAttribute('src');
        
        // Ustaw ścieżkę w obrazku lightboxa
        lightboxImage.setAttribute('src', imageSrc);
        
        // Pokaż lightbox (ustaw display: flex)
        lightboxModal.style.display = 'flex';
        
        // Zablokuj scroll tła, aby tylko modal był przewijalny (jeśli duży)
        document.body.style.overflow = 'hidden';
    });
});

// 2. Zamykanie lightboxa przez przycisk 'X'
lightboxClose.addEventListener('click', () => {
    lightboxModal.style.display = 'none';
    document.body.style.overflow = ''; // Przywracanie scrolla tła
});

// 3. Zamykanie lightboxa przez kliknięcie poza obrazem (na tło modalu)
lightboxModal.addEventListener('click', (e) => {
    // Sprawdź, czy kliknięcie nastąpiło dokładnie na tło modalu, a nie na samo zdjęcie
    if (e.target === lightboxModal) {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// 4. Zamykanie lightboxa przez klawisz ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});
