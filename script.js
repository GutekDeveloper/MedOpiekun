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

    document.querySelectorAll(".left-shapes .shape").forEach((el, i) => {
        el.style.transform = `translateY(${scrollY * 0.3 + i*20}px) rotate(${scrollY * 0.05}deg)`;
    });

    document.querySelectorAll(".right-shapes .shape").forEach((el, i) => {
        el.style.transform = `translateY(${scrollY * 0.2 + i*30}px) rotate(${scrollY * 0.03}deg)`;
    });
});
