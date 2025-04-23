export const pokemonData = [
    {
      id: 1,
      name: "Bulbasaur",
      type: "Grass/Poison",
      sprite: "/images/pokemon/1.png", // You'll need to add these images
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45
      }
    },
    {
      id: 4,
      name: "Charmander",
      type: "Fire",
      sprite: "/images/pokemon/4.png",
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        specialAttack: 60,
        specialDefense: 50,  
        speed: 65
      }
    },
    {
      id: 7,
      name: "Squirtle",
      type: "Water",
      sprite: "/images/pokemon/7.png",
      stats: {
        hp: 44,
        attack: 48,
        defense: 65,
        specialAttack: 50,
        specialDefense: 64,
        speed: 43
      }
    },
    {
      id: 25,
      name: "Pikachu",
      type: "Electric",
      sprite: "/images/pokemon/25.png",
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        specialAttack: 50,
        specialDefense: 50,
        speed: 90
      }
    },
    {
      id: 94,
      name: "Gengar",
      type: "Ghost/Poison",
      sprite: "/images/pokemon/94.png",
      stats: {
        hp: 60,
        attack: 65,
        defense: 60,
        specialAttack: 130,
        specialDefense: 75,
        speed: 110
      }
    },
    {
      id: 143,
      name: "Snorlax",
      type: "Normal",
      sprite: "/images/pokemon/143.png",
      stats: {
        hp: 160,
        attack: 110,
        defense: 65,
        specialAttack: 65,
        specialDefense: 110,
        speed: 30
      }
    }
  ];
  
  // Function to get a random selection of Pokémon
  export function getRandomPokemon(count = 10) {
    const shuffled = [...pokemonData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Function to deal cards to players
  export function dealCards(deckSize = 10) {
    const shuffled = [...pokemonData].sort(() => 0.5 - Math.random());
    
    // Make sure we have enough Pokémon
    if (shuffled.length < deckSize * 2) {
      throw new Error(`Not enough Pokémon for two players with deck size ${deckSize}`);
    }
    
    return {
      player1Deck: shuffled.slice(0, deckSize),
      player2Deck: shuffled.slice(deckSize, deckSize * 2)
    };
  }