console.log("Connected");
const $ = selector => document.querySelector(selector);
const searchBar = $("#searchBar");
const searchBtn = $("#searchBtn");
const name = $("#name");
const height = $("#height");
const weight = $("#weight");
const type = $("#type");
const abilities = $("#abilities");
const pokemonImage = $("#pokemonImage");
const searchSection = $("#searchSection");
const errorText = $("#error");

searchBtn.addEventListener("click", () => searchPokemon(searchBar.value));
searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPokemon(searchBar.value);
    }
});

function displayPokemon(data) {
    errorText.textContent = "";
    searchBar.value = "";
    name.textContent = data.name;
    height.textContent = data.height / 10;
    weight.textContent = data.weight / 10;
    type.textContent = getNames(data, "types", "type");
    abilities.textContent = getNames(data, "abilities", "ability");
    pokemonImage.src = data.sprites.other["official-artwork"].front_default;
    searchBar.focus();
}

function getNames(data, arrayKey, objKey) {
    const names = data[arrayKey].map(item => item[objKey].name);
    return names.join(", ")
}

function clearPokemon() {
    name.textContent = "";
    height.textContent = "";
    weight.textContent = "";
    type.textContent = "";
    abilities.textContent = "";
    pokemonImage.src = "";
}

async function searchPokemon(pokemonName) {

    try {

        pokemonName = pokemonName.trim().toLowerCase();
        console.log(pokemonName);
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw new Error("Pokemon not found");
        }
        const data = await response.json();

        displayPokemon(data);

        console.log(data);
    }
    catch (error) {
        clearPokemon();
        errorText.textContent = error.message;
        console.log(error.message);
    }
}
