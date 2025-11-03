const tekstLeki = `
<h3>Sekcja: Leki</h3>
<p>Aplikacja MedOpiekun pomaga w zarządzaniu Twoimi lekami — przypomina o porach dawkowania, dawkach oraz terminach recept.</p>
<p>W prosty sposób możesz dodać, edytować lub usunąć lek, a także śledzić historię stosowania.</p>
`;

console.log("Witamy w aplikacji MedOpiekun!");

const tekstContainer = document.getElementById("tekst-leki");
if (tekstContainer) {
    tekstContainer.innerHTML = tekstLeki;
}
