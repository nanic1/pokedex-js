const nomePokemon = document.querySelector('#pokemon__nome');
const idPokemon = document.querySelector('#pokemon__id')
const fotoPokemon = document.querySelector('#pokemon__imagem')

const form = document.querySelector('form')
const input = document.querySelector('#input__search')
const botaoprev = document.querySelector('#botao-anterior')
const botaonext = document.querySelector('#botao-proximo')

let searchPokemon = 1;

const buscarPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
    
}


const renderizarPokemon = async (pokemon) => {

    nomePokemon.innerHTML = 'Carregando'
    idPokemon.innerHTML = '';

    const data = await buscarPokemon(pokemon);
    if (data) {
        fotoPokemon.style.display = 'block'
        nomePokemon.innerHTML = data.name
        idPokemon.innerHTML = data.id
        fotoPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
    }
    else {
        nomePokemon.innerHTML = "Não encontrado >:"
        fotoPokemon.style.display = 'none'
        idPokemon.innerHTML = "#"
    }
    if(data.id > 649) {
        nomePokemon.innerHTML = "Não encontrado >:"
        fotoPokemon.style.display = 'none'
        idPokemon.innerHTML = "#"
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizarPokemon(input.value.toLowerCase());
})

botaoprev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderizarPokemon(searchPokemon);
    }
    
})

botaonext.addEventListener('click', () => {
    searchPokemon += 1
    renderizarPokemon(searchPokemon);
})

renderizarPokemon(searchPokemon)