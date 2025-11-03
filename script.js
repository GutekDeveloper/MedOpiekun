console.log("Witamy w aplikacji MedOpiekun!");
// Wstawienie tekstu sekcji Leki
document.addEventListener("DOMContentLoaded", () => {
    const tekstContainer = document.getElementById("tekst-leki");
    if (tekstContainer && typeof tekstLeki !== "undefined") {
        tekstContainer.innerHTML = tekstLeki;
    }
});
