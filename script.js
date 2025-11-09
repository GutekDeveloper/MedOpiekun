console.log("Witamy w aplikacji MedOpiekun!");

// ===================================================================
// ZMIANA: Skrypt do ukrywania/pokazywania nagłówka (wersja z klasą CSS)
// Zastępuje on stary skrypt, który manipulował 'header.style.top'
// ===================================================================
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const hideThreshold = 100; // Używamy tego samego progu 100px co w starym skrypcie

if (header) {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Jeśli jesteśmy blisko góry (poniżej progu), zawsze pokazuj nagłówek
        if (currentScrollY < hideThreshold) {
            header.classList.remove('header-hidden');
        } 
        // Jeśli przewijamy w dół (i jesteśmy poza progiem)
        else if (currentScrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } 
        // Jeśli przewijamy w górę (pokaż nagłówek)
        else if (currentScrollY < lastScrollY) {
            header.classList.remove('header-hidden');
        }
        
        // Zaktualizuj ostatnią pozycję scrolla
        // (zabezpieczenie przed wartościami ujemnymi na niektórych przeglądarkach)
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    });
}
// KONIEC ZMIAN
