console.log("Witamy w aplikacji MedOpiekun!");

// Skrypt do ukrywania/pokazywania nagłówka przy przewijaniu
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Jeśli przewijamy w dół i przekroczymy 100px, ukryj nagłówek
    header.style.top = '-100px';
  } else if (currentScroll < lastScrollTop) {
    // Jeśli przewijamy w dół, ukryj nagłówek
    header.style.top = '-100px'; 
  } else {
    // Jeśli przewijamy w górę, pokaż nagłówek
    header.style.top = '0';
    header.style.top = '0'; 
  }

  // Zapewnia, że scrollTop nie jest mniejszy niż 0
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
