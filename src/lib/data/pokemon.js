export const pokemonData = [
  {
      id: 1,
      name: "Bulbasaur",
      type: "Grass/Poison",
      sprite: "/images/pokemon/1.png",
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
  },
  {
      id: 6,
      name: "Charizard",
      type: "Fire/Flying",
      sprite: "/images/pokemon/6.png",
      stats: {
          hp: 78,
          attack: 84,
          defense: 78,
          specialAttack: 109,
          specialDefense: 85,
          speed: 100
      }
  },
  {
      id: 9,
      name: "Blastoise",
      type: "Water",
      sprite: "/images/pokemon/9.png",
      stats: {
          hp: 79,
          attack: 83,
          defense: 100,
          specialAttack: 85,
          specialDefense: 105,
          speed: 78
      }
  },
  {
      id: 3,
      name: "Venusaur",
      type: "Grass/Poison",
      sprite: "/images/pokemon/3.png",
      stats: {
          hp: 80,
          attack: 82,
          defense: 83,
          specialAttack: 100,
          specialDefense: 100,
          speed: 80
      }
  },
  {
      id: 150,
      name: "Mewtwo",
      type: "Psychic",
      sprite: "/images/pokemon/150.png",
      stats: {
          hp: 106,
          attack: 110,
          defense: 90,
          specialAttack: 154,
          specialDefense: 90,
          speed: 130
      }
  },
  {
      id: 248,
      name: "Tyranitar",
      type: "Rock/Dark",
      sprite: "/images/pokemon/248.png",
      stats: {
          hp: 100,
          attack: 134,
          defense: 110,
          specialAttack: 95,
          specialDefense: 100,
          speed: 61
      }
  },
  {
      id: 149,
      name: "Dragonite",
      type: "Dragon/Flying",
      sprite: "/images/pokemon/149.png",
      stats: {
          hp: 91,
          attack: 134,
          defense: 95,
          specialAttack: 100,
          specialDefense: 100,
          speed: 80
      }
  },
  {
      id: 135,
      name: "Jolteon",
      type: "Electric",
      sprite: "/images/pokemon/135.png",
      stats: {
          hp: 65,
          attack: 65,
          defense: 60,
          specialAttack: 110,
          specialDefense: 95,
          speed: 130
      }
  },
  {
      id: 131,
      name: "Lapras",
      type: "Water/Ice",
      sprite: "/images/pokemon/131.png",
      stats: {
          hp: 130,
          attack: 85,
          defense: 80,
          specialAttack: 85,
          specialDefense: 95,
          speed: 60
      }
  },
  {
      id: 149,
      name: "Gyarados",
      type: "Water/Flying",
      sprite: "/images/pokemon/130.png",
      stats: {
          hp: 95,
          attack: 125,
          defense: 79,
          specialAttack: 60,
          specialDefense: 100,
          speed: 81
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