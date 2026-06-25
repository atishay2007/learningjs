console.log("Connected");
const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
const name = document.querySelector("#name");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const type = document.querySelector("#type");
const abilities = document.querySelector("#abilities");
const pokemonImage = document.querySelector("#pokemonImage");

searchBtn.addEventListener("click", ()=>searchPokemon(searchBar.value));
searchBar.addEventListener("enter", ()=>searchPokemon(searchBar.value));

function searchPokemon(pokemonName){
    console.log(pokemonName);
}
