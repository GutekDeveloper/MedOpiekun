console.log("Witamy w aplikacji MedOpiekun!");

// ===============================
// Wstawienie tekstu sekcji "Leki" po załadowaniu DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const tekstContainer = document.getElementById("tekst-leki");
    if (tekstContainer && typeof tekstLeki !== "undefined") {
        tekstContainer.innerHTML = tekstLeki;
    }
});

// ===============================
// Animacja kształtów + generowanie
// ===============================
const shapes = ["circle", "triangle", "square"];

// Losowy wybór kształtu
function getRandomShape() {
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Losowy kolor (pastelowe odcienie)
function getRandomColor() {
    const colors = [
        "rgba(187, 222, 251, 0.5)",
        "rgba(248, 187, 208, 0.5)",
        "rgba(206, 147, 216, 0.5)",
        "rgba(129, 212, 250, 0.5)",
        "rgba(179, 229, 252, 0.4)"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Wypełnienie kontenera kształtami
function fillShapes(containerSelector, count = 30) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = ""; // wyczyść poprzednie
    for (let i = 0; i < count; i++) {
        const shapeType = getRandomShape();
        const div = document.createElement("div");
        div.classList.add("shape-" + shapeType, "shape");
        div.style.background = getRandomColor();
        div.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
        div.style.transform = `translateY(${Math.random() * window.innerHeight}px)`;
        container.appendChild(div);
    }
}

// Inicjalizacja kształtów po załadowaniu DOM
document.addEventListener("DOMContentLoaded", () => {
    fillShapes(".left-shapes", 40);
    fillShapes(".right-shapes", 35);
});

// Ruch kształtów przy scrollowaniu (lekki efekt parallax)
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const offsetTopBar = 80;

    document.querySelectorAll(".left-shapes .shape").forEach((el, i) => {
        const y = offsetTopBar + ((scrollY * 0.3 + i * 25) % (window.innerHeight + 100));
        el.style.transform = `translateY(${y}px) rotate(${scrollY * 0.05}deg)`;
    });

    document.querySelectorAll(".right-shapes .shape").forEach((el, i) => {
        const y = offsetTopBar + ((scrollY * 0.2 + i * 35) % (window.innerHeight + 100));
        el.style.transform = `translateY(${y}px) rotate(${scrollY * 0.03}deg)`;
    });
});

// ===============================
// Efekt "fade-in" sekcji podczas scrollowania
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
