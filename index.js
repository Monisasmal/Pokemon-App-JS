let cardContainer = document.getElementById("pokemon_card_container");
let searchBtn = document.getElementById("search");
let filterBtn = document.getElementById("filter");
let typeInput = document.getElementById("type");


// for the indivisual card showin=g data
function createCard(pokemon){
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML= `
  <div class = "cardInner">

  <div class = "cardFornt">
  <div class='id'>${pokemon.id}</div>
    <img src='${pokemon.sprites.front_default}'>
    <div class='name'>${pokemon.name}</div>
    <div class='type'>${pokemon.types[0].type.name}</div>
  </div>


<div class='back-card'>
    <img src='${pokemon.sprites.back_default}'>
     <div class='name'>${pokemon.name}</div>
     <div class='namee'>${pokemon.abilities[0].ability.name}</div>
    </div>
  </div> 
  `;
//   console.log(card)
    return card;
}

// for filter the data
filterBtn.addEventListener('click', function(){
    let allCards = document.querySelectorAll(".card");
    let selectedType = typeInput.value.toLowerCase();

    allCards.forEach(function(card){
        let cardType = card.querySelector(".type").textContent.toLowerCase();

        if(cardType === selectedType || selectedType === "") {
             card.style.display = "block";
        } else {
             card.style.display = "none";
        }
    });
});

// for search field 
searchBtn.addEventListener("keyup", function(){
    let searchValue = searchBtn.value.toLowerCase();
    console.log(searchValue);

    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card){
        let cardName = card.querySelector(".name").textContent;
        if(cardName.startsWith(searchValue)){
  card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }
    })
})

// for fetch all the data from pokemon API
async function fetchPokemonData(i){
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  let result = await data.json();
  return result;
}

async function fetchPokemon(){
    for(let i =1; i<=151; i++){
     let pokemon = await fetchPokemonData(i);
     let pokemonCard = createCard(pokemon);
     cardContainer.appendChild(pokemonCard);
    }
}

fetchPokemon();