import { capitalize } from "../util.js";

console.log("Connected");

const MAX_POKEMON = 700;
const HEIGHT_CONVERSION = 10;
const WEIGHT_CONVERSION = 10;
let isLoading = false;

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
const randomBtn = $("#randomBtn");

searchBtn.addEventListener("click", () => searchPokemon(searchBar.value));
randomBtn.addEventListener("click", () => randomPokemon());

searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPokemon(searchBar.value);
    }
});



function displayPokemon(data) {
    name.textContent = capitalize(data.name);
    height.textContent = data.height / HEIGHT_CONVERSION;
    weight.textContent = data.weight / WEIGHT_CONVERSION;
    type.textContent = capitalize(getNames(data, "types", "type"));
    abilities.textContent = getNames(data, "abilities", "ability");
    pokemonImage.style.display = "block";
    pokemonImage.src = data.sprites.other["official-artwork"].front_default;
}

function getNames(data, arrayKey, objKey) {
    const names = data[arrayKey].map(item => capitalize(item[objKey].name));
    return names.join(", ")
}

function clearPokemon() {
    name.textContent = "";
    height.textContent = "";
    weight.textContent = "";
    type.textContent = "";
    abilities.textContent = "";
    pokemonImage.src = "";
    pokemonImage.style.display = "none";
}

async function fetchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Pokemon not found");
    }

    const data = await response.json();
    return data;
}

async function searchPokemon(pokemonName) {

    if (isLoading) {
        return;
    }
    isLoading = true;
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";
    try {
        pokemonName = String(pokemonName).trim().toLowerCase();

        console.log(pokemonName);
        const data = await fetchPokemon(pokemonName);

        errorText.textContent = "";
        searchBar.value = "";
        searchBar.focus();
        displayPokemon(data);
        displayStats(data);
        console.log(data);
    }
    catch (error) {
        clearPokemon();
        errorText.textContent = error.message;
        console.log(error.message);
    }
    finally {
        isLoading = false;
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
}

function displayStats(data) {
    stats.replaceChildren();
    console.log(data.stats);
    for (const stat of data.stats) {
        const p = document.createElement("p");
        p.textContent = `${capitalize(stat.stat.name)}: ${stat.base_stat}`
        stats.appendChild(p);
    }
}

function randomPokemon() {
    const rand = Math.floor(Math.random() * MAX_POKEMON) + 1;
    searchPokemon(rand);
}
