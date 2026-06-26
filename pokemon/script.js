console.log("Connected");
const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
const name = document.querySelector("#name");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const type = document.querySelector("#type");
const abilities = document.querySelector("#abilities");
const pokemonImage = document.querySelector("#pokemonImage");


searchBtn.addEventListener("click", () => searchPokemon(searchBar.value));
searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPokemon(searchBar.value);
    }
});
async function searchPokemon(pokemonName) {

    pokemonName = pokemonName.toLowerCase();
    console.log(pokemonName);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    const data = await response.json();

    name.textContent = data.name;
    height.textContent = data.height;
    weight.textContent = data.weight;

    console.log(response);

}
