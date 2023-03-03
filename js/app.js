const left_container = document.querySelector(".left_container"),
  sidebar = document.querySelector(".sidebar"),
  toggle = document.querySelector(".toggle"),
  searchBtn = document.querySelector(".search-box");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});
// verifica daca clasa "open" exista la incarcarea paginii
window.addEventListener("load", function () {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar.classList.contains("open")) {
    // daca clasa "open" exista, mentine bara laterala deschisa
    sidebar.style.left = "0";
  }
});

// adauga un eveniment de click pe butonul de deschidere a barei laterale
const openBtn = document.querySelector("#openBtn");
openBtn.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  // adauga clasa "open" la bara laterala
  sidebar.classList.add("open");
});

//toggle dreapta

const toggleButton = document.querySelector(".toggle_r");
const sidebar_r = document.querySelector(".sidebar_r");

toggleButton.addEventListener("click", () => {
  sidebar_r.classList.toggle("close");
});

//sortari
const listaProduse = document.querySelectorAll("#containerProduse .card_box");

function sorteazaProduse(categoria) {
  // Obține toate produsele dacă nu este specificată o categorie
  const produse = categoria
    ? Array.from(listaProduse).filter(function (produs) {
        return produs.id === categoria;
      })
    : Array.from(listaProduse);

  // Adaugă produsele sortate într-un container separat
  const containerProduse = document.getElementById("containerProduse");
  containerProduse.innerHTML = "";
  produse.forEach(function (produs, index) {
    // Adaugă un nou element div la fiecare 3 produse pentru a crea un nou rând
    if (index % 3 === 0) {
      const newRow = document.createElement("div");
      newRow.classList.add("row");
      containerProduse.appendChild(newRow);
    }
    // Creează un element col pentru fiecare produs și adaugă-l la rândul curent
    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.appendChild(produs);
    containerProduse.lastElementChild.appendChild(newCol);
  });
}
// functia search
const inputCautare = document.querySelector('input[type="search"]');
inputCautare.addEventListener("input", cautaProduse);

function cautaProduse() {
  const textCautat = inputCautare.value.toLowerCase();
  const carduri = document.querySelectorAll(".card");
  carduri.forEach(function (card) {
    const textCard = card.innerText.toLowerCase();
    if (textCard.includes(textCautat)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
