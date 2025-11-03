console.log("Witamy w aplikacji MedOpiekun!");

// Wstawienie tekstu sekcji Leki po załadowaniu DOM
document.addEventListener("DOMContentLoaded", () => {
    const tekstContainer = document.getElementById("tekst-leki");
    if (tekstContainer && typeof tekstLeki !== "undefined") {
        tekstContainer.innerHTML = tekstLeki;
    }
});

// Animacja kształtów po bokach przy scrollu
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const offsetTopBar = 80; // wysokość topbara + margines

    // Left shapes
    document.querySelectorAll(".left-shapes .shape").forEach((el, i) => {
        const y = offsetTopBar + ((scrollY * 0.3 + i * 25) % (window.innerHeight + 50));
        el.style.transform = `translateY(${y}px) rotate(${scrollY * 0.05}deg)`;
    });

    // Right shapes
    document.querySelectorAll(".right-shapes .shape").forEach((el, i) => {
        const y = offsetTopBar + ((scrollY * 0.2 + i * 35) % (window.innerHeight + 50));
        el.style.transform = `translateY(${y}px) rotate(${scrollY * 0.03}deg)`;
    });
});
