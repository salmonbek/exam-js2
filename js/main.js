window.addEventListener("scroll", function () {
  toggleBacktop();
});

let backtop = document.getElementById("backtop");

function toggleBacktop() {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    backtop.classList.add("backtop-show");
  } else {
    backtop.classList.remove("backtop-show");
  }
}

// mode /////////////////////////////////////
let modeBtn = document.getElementById("mode-btn");
modeBtn.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "images/light.svg";
  } else {
    this.firstElementChild.src = "images/dark.svg";
  }
  document.body.classList.toggle("dark");
});
// mode/////////////

// loading
const loading = document.getElementById("loading");
const loadingDuration = 1400;
setTimeout(() => {
  loading.classList.add(`loading-none`);
}, loadingDuration);

const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region") || "Aisa";
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
let allCountriesData;
let params;
let newdata = [
  1,

  2,

  3,

  4,

  5,
];
let limit = 12;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    fetchData(paginate(data, params[1] || limit, params[0] || 1));
  });

function getParams() {
  var idx = document.URL.indexOf("?");
  var params = new Array();
  if (idx != -1) {
    var pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
    for (var i = 0; i < pairs.length; i++) {
      nameVal = pairs[i].split("=");
      params.push(nameVal[1]);
    }
  }
  return params;
}

params = getParams();

filterByRegion.addEventListener("change", (e) => {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(paginate(data, params[1] || limit, params[0] || 1));
    });
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
  newdata.forEach((p) => {
    countriesContainer.innerHTML += `
    <ul class="pagination pagination-lg">
      <li class="page-item px-2"><a class="page-link" href="?page=${p}&limit=${limit}">${p}</a></li>
    </ul>`;
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  countriesContainer.innerHTML = "";
  filteredCountries.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
});

themeChanger.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "assets/images/light.svg";
  } else {
    this.firstElementChild.src = "assets/images/mode.svg";
  }
  document.body.classList.toggle("dark");
});

function fetchData(data) {
  let newdata = [
    1,

    2,

    3,

    4,

    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
  newdata.forEach((p) => {
    countriesContainer.innerHTML += `<nav aria-label="...">
    <ul class="pagination pagination-lg">
      <li class="page-item px-2"><a class="page-link" href="?page=${p}&limit=${limit}">${p}</a></li>
    </ul>
  </nav>`;
  });
}

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// ///////////////sort
document.addEventListener("DOMContentLoaded", function () {
  loadCountries();
});

function filterCountries() {
  const selectedCountry = document.getElementById("countrySelect").value;
  let countries = JSON.parse(localStorage.getItem("countries")) || [];
  let filteredCountries;

  if (selectedCountry === "") {
    filteredCountries = countries;
  } else {
    filteredCountries = countries.filter(
      (country) => country.name === selectedCountry
    );
  }

  displayFilteredCountries(filteredCountries);
}

function loadCountries() {
  let countries = JSON.parse(localStorage.getItem("countries")) || [];
  const countrySelect = document.getElementById("countrySelect");

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name;
    option.textContent = `${country.name} (${country.population}, ${country.capital})`;
    countrySelect.appendChild(option);
  });

  filterCountries(); // Ishonchli tanlov uchun filtratsiya qilamiz
}

function displayFilteredCountries(countries) {
  const filteredCountriesDiv = document.getElementById("filteredCountries");
  filteredCountriesDiv.innerHTML = ""; // Oldiqlik qilish
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `
      <p><strong>Davlat:</strong> ${country.name}</p>
      <p><strong>Aholisi:</strong> ${country.population}</p>
      <p><strong>Poytaxt:</strong> ${country.capital}</p>
      <hr>
    `;
    filteredCountriesDiv.appendChild(countryDiv);
  });
}
