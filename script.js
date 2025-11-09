console.log("Witamy w aplikacji MedOpiekun!");

// ===============================
// Wstawienie tekstu sekcji "Leki" po załadowaniu DOM
// (Zostawione dla bezpieczeństwa, choć index.html też to robi)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const tekstContainer = document.getElementById("tekst-leki");
    if (tekstContainer && typeof tekstLeki !== "undefined") {
        tekstContainer.innerHTML = tekstLeki;
    }
});


/* USUNIĘTO SEKCJĘ: Animacja kształtów + generowanie
   Cały kod dla getRandomShape, getRandomColor, fillShapes
   oraz powiązane listenery scrolla zostały usunięte.
*/


// ===============================
// Efekt "fade-in" sekcji podczas scrollowania
// (Zachowane - to jest dobry, nowoczesny efekt)
// ===============================
const sections = document.querySelectorAll("section, .about-section");

function revealSectionsOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        if (top < triggerBottom) {
            sec.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealSectionsOnScroll);
window.addEventListener("DOMContentLoaded", revealSectionsOnScroll);

// ===============================
// Skrypt do ukrywania/pokazywania nagłówka przy przewijaniu
// (Zachowane - to jest dobry, nowoczesny efekt)
// ===============================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  // Upewnij się, że header istnieje, zanim spróbujesz na nim operować
  if (!header) return; 

  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // --- POPRAWKA ---
  // Dynamicznie pobierz AKTUALNĄ wysokość nagłówka (ważne dla mobile!)
  const headerHeight = header.offsetHeight;
  // --- KONIEC POPRAWKI ---

  // Ukryj nagłówek, jeśli przewijamy w dół i minęliśmy już wysokość nagłówka
  if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
    // Ukryj nagłówek o jego WŁASNĄ, dynamiczną wysokość
    header.style.top = `-${headerHeight}px`; 
  } else {
    // Jeśli przewijamy w górę, pokaż nagłówek
    header.style.top = '0'; 
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

/* WAŻNE: Usunąłem stąd dodatkową, błędną klamrę '}', 
  która znajdowała się na końcu Twojego pliku script.js i psuła cały skrypt.
*/
