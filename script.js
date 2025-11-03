console.log("Witamy w aplikacji MedOpiekun!");

// Wstawienie tekstu sekcji Leki po załadowaniu DOM
document.addEventListener("DOMContentLoaded", () => {
    const tekstContainer = document.getElementById("tekst-leki");
    if (tekstContainer && typeof tekstLeki !== "undefined") {
        tekstContainer.innerHTML = tekstLeki;
    }
});

// ===============================
// Animacja kształtów + generowanie
// ===============================

// Definicja typów kształtów
const shapes = ["circle", "triangle", "square"];

// Funkcja do losowego wyboru kształtu
function getRandomShape() {
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Funkcja wypełniająca kontener kształtami
function fillShapes(containerSelector, count = 30) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = ""; // wyczyść zawartość
    for (let i = 0; i < count; i++) {
        const shapeType = getRandomShape();
        const div = document.createElement("div");
        div.classList.add("shape-" + shapeType);
        div.classList.add("shape");
        container.appendChild(div);
    }
}

// Wypełnienie lewego i prawego kontenera po załadowaniu DOM
document.addEventListener("DOMContentLoaded", () => {
    fillShapes(".left-shapes", 40);  // 40 kształtów po lewej
    fillShapes(".right-shapes", 35); // 35 kształtów po prawej
});

// Animacja kształtów przy scrollu
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
