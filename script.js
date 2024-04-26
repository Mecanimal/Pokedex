const pokemonName = document.querySelector('.pokemon__name');
const pokemonID = document.querySelector('.pokemon__id');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonID.innerHTML = '';
  pokemonName.innerHTML = 'loading...';
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = `#${data.id} -`;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'not found';
    pokemonID.innerHTML = '';
    pokemonImage.src = '/favicon-16x16.png';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon (searchPokemon);
}
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon (searchPokemon);
});

renderPokemon(searchPokemon)