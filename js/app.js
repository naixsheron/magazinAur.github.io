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
    if (index % 4 === 0) {
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
const openPopupButton = document.getElementById("open-popup");
const closePopupButton = document.getElementById("close-popup");
const popup = document.querySelector(".popup");

openPopupButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});
// login si register

let log = document.getElementById("login");
let reg = document.getElementById("register");
let btn_l = document.getElementById("btn_l");
function register() {
  log.style.left = "-400px";
  reg.style.left = "50px";
  btn_l.style.left = "110px";
}
function login() {
  log.style.left = "50px";
  reg.style.left = "450px";
  btn_l.style.left = "0";
}

const closeBtn = document.querySelector("#close-popup");
const form = document.querySelector("form");

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  form.reset(); // Reset the form values
});
//favorite
let favorites = [];

// Select all elements with class "corner-fav"
const favButtons = document.querySelectorAll(".corner-fav");

// Loop through all "corner-fav" buttons
favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("favorite"); // Toggle the "favorite" class on the clicked button

    const cardId = button.closest(".card").getAttribute("id"); // Get the id of the closest card
    const index = favorites.indexOf(cardId);

    if (index === -1) {
      // If the card is not in favorites, add it
      favorites.push(cardId);
    } else {
      // If the card is already in favorites, remove it
      favorites.splice(index, 1);
    }

    console.log(favorites); // Output the favorites array to the console
  });
});
const favoriteButton = document.querySelector(".icon");
const favoriteList = document.getElementById("favorite-list");

let favoriteCards = [];

// adaugă cardul favorit în lista de favorite
function addFavorite(card) {
  favoriteCards.push(card);
  updateFavorites();
}

// actualizează lista de favorite și afișează numărul de carduri favorite
function updateFavorites() {
  favoriteList.innerHTML = "";
  favoriteCards.forEach((card) => {
    const li = document.createElement("li");
    li.textContent = card.querySelector("h2").textContent;
    favoriteList.appendChild(li);
  });
  const favoritesCount = document.querySelectorAll(".corner-fav.filled").length;
  favoriteButton.nextElementSibling.textContent = `Favorite (${favoritesCount})`;
}

// gestionează evenimentul de click pe butonul de favorite
favoriteButton.addEventListener("click", () => {
  favoriteList.parentElement.classList.toggle("active");
});

// adaugă gestiunea evenimentului de click pentru fiecare card
document.querySelectorAll(".corner-fav").forEach((card) => {
  card.addEventListener("click", (event) => {
    event.stopPropagation();
    card.classList.toggle("filled");
    const parentCard = card.parentElement;
    if (card.classList.contains("filled")) {
      addFavorite(parentCard);
    } else {
      const index = favoriteCards.indexOf(parentCard);
      if (index > -1) {
        favoriteCards.splice(index, 1);
        updateFavorites();
      }
    }
  });
});

// afișează numărul de carduri favorite la încărcarea paginii
updateFavorites();
// selectăm toate butoanele de inimă
const favBtns = document.querySelectorAll(".corner-fav i");

// iterăm prin fiecare buton și adăugăm un ascultător de eveniment pentru a trata clicul
function handleFavoriteClick(cardId) {
  const cardIndex = cards.findIndex((card) => card.id === cardId);
  if (cardIndex !== -1) {
    cards[cardIndex].isFavorite = !cards[cardIndex].isFavorite;
  }
  saveToLocalStorage(cards);
}

favBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // prevenim comportamentul implicit al butonului
    e.preventDefault();
    // adăugăm/scoatem clasa 'active' la inima butonului
    e.currentTarget.classList.toggle("active");
    // adăugăm sau eliminăm cardul din lista de favorite
    handleFavoriteClick(e.currentTarget.parentElement.parentElement.id);
    // actualizăm numărul de carduri favorite afișate pe buton
    updateFavoriteCount();
  });
});
// selectam butonul de favorite
const favoriteBtn = document.querySelector("#favorite-btn");

// adaugam evenimentul click
favoriteBtn.addEventListener("click", () => {
  // selectam elementul ul in care vom afisa cardurile favorite
  const favoriteList = document.querySelector("#favorite-list");

  // golim lista de carduri favorite
  favoriteList.innerHTML = "";

  // iteram prin fiecare card
  let cards = [];

  cards.forEach((card) => {
    // verificam daca cardul este la favorite
    if (card.isFavorite) {
      // creem un nou element li pentru a adauga cardul la lista de favorite
      const li = document.createElement("li");
      li.textContent = card.title;
      favoriteList.appendChild(li);
    }
  });

  // afisam lista de favorite
  document.querySelector(".favorites").classList.add("active");
});
function displayFavorites() {
  const favorites = getFavorites();
  console.log(favorites); // afișează favoritele în consolă pentru a verifica dacă funcția funcționează corect
  const list = document.querySelector("#favorite-list");
  list.innerHTML = "";
  favorites.forEach((favorite) => {
    const card = document.querySelector(`#${favorite}`);
    const clone = card.cloneNode(true);
    list.appendChild(clone);
  });
}
function updateFavoriteCount() {
  const favoritesCount = document.querySelectorAll(".corner-fav.filled").length;
  const favoriteCountElement = document.querySelector(".favorite-count");
  favoriteCountElement.textContent = favoritesCount.toString();
}
const favoritButton = document.querySelector("#favorite-btn");
favoritButton.addEventListener("click", () => {
  const favoriteList = document.querySelector("#favorite-list");
  favoriteList.innerHTML = "";
  updateFavoriteCount();
  favoriteList.parentElement.classList.toggle("active");
});
