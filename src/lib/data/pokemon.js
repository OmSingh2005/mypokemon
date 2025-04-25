export const pokemonData = [
  // Original Starters (First Stage)
  {
      id: 1,
      name: "Bulbasaur",
      type: "Grass/Poison",
      sprite: "/images/pokemon/1.png",
      stats: { HP: 45, ATK: 49, DEF: 49, SPATK: 65, SPDEF: 65, SPD: 45 }
  },
  {
      id: 4,
      name: "Charmander",
      type: "Fire",
      sprite: "/images/pokemon/4.png",
      stats: { HP: 39, ATK: 52, DEF: 43, SPATK: 60, SPDEF: 50, SPD: 65 }
  },
  {
      id: 7,
      name: "Squirtle",
      type: "Water",
      sprite: "/images/pokemon/7.png",
      stats: { HP: 44, ATK: 48, DEF: 65, SPATK: 50, SPDEF: 64, SPD: 43 }
  },

  // Fully Evolved Starters
  {
      id: 6,
      name: "Charizard",
      type: "Fire/Flying",
      sprite: "/images/pokemon/6.png",
      stats: { HP: 78, ATK: 84, DEF: 78, SPATK: 109, SPDEF: 85, SPD: 100 }
  },
  {
      id: 3,
      name: "Venusaur",
      type: "Grass/Poison",
      sprite: "/images/pokemon/3.png",
      stats: { HP: 80, ATK: 82, DEF: 83, SPATK: 100, SPDEF: 100, SPD: 80 }
  },
  {
      id: 9,
      name: "Blastoise",
      type: "Water",
      sprite: "/images/pokemon/9.png",
      stats: { HP: 79, ATK: 83, DEF: 100, SPATK: 85, SPDEF: 105, SPD: 78 }
  },
  {
      id: 254,
      name: "Sceptile",
      type: "Grass",
      sprite: "/images/pokemon/254.png",
      stats: { HP: 70, ATK: 85, DEF: 65, SPATK: 105, SPDEF: 85, SPD: 120 }
  },
  {
      id: 260,
      name: "Swampert",
      type: "Water/Ground",
      sprite: "/images/pokemon/260.png",
      stats: { HP: 100, ATK: 110, DEF: 90, SPATK: 85, SPDEF: 90, SPD: 60 }
  },
  {
      id: 392,
      name: "Infernape",
      type: "Fire/Fighting",
      sprite: "/images/pokemon/392.png",
      stats: { HP: 76, ATK: 104, DEF: 71, SPATK: 104, SPDEF: 71, SPD: 108 }
  },
  {
      id: 658,
      name: "Greninja",
      type: "Water/Dark",
      sprite: "/images/pokemon/658.png",
      stats: { HP: 72, ATK: 95, DEF: 67, SPATK: 103, SPDEF: 71, SPD: 122 }
  },

  // Fan Favorites
  {
      id: 25,
      name: "Pikachu",
      type: "Electric",
      sprite: "/images/pokemon/25.png",
      stats: { HP: 35, ATK: 55, DEF: 40, SPATK: 50, SPDEF: 50, SPD: 90 }
  },
  {
      id: 94,
      name: "Gengar",
      type: "Ghost/Poison",
      sprite: "/images/pokemon/94.png",
      stats: { HP: 60, ATK: 65, DEF: 60, SPATK: 130, SPDEF: 75, SPD: 110 }
  },
  {
      id: 143,
      name: "Snorlax",
      type: "Normal",
      sprite: "/images/pokemon/143.png",
      stats: { HP: 160, ATK: 110, DEF: 65, SPATK: 65, SPDEF: 110, SPD: 30 }
  },
  {
      id: 130,
      name: "Gyarados",
      type: "Water/Flying",
      sprite: "/images/pokemon/130.png",
      stats: { HP: 95, ATK: 125, DEF: 79, SPATK: 60, SPDEF: 100, SPD: 81 }
  },
  {
      id: 131,
      name: "Lapras",
      type: "Water/Ice",
      sprite: "/images/pokemon/131.png",
      stats: { HP: 130, ATK: 85, DEF: 80, SPATK: 85, SPDEF: 95, SPD: 60 }
  },
  {
      id: 149,
      name: "Dragonite",
      type: "Dragon/Flying",
      sprite: "/images/pokemon/149.png",
      stats: { HP: 91, ATK: 134, DEF: 95, SPATK: 100, SPDEF: 100, SPD: 80 }
  },

  // Strong Dragon-types
  {
      id: 248,
      name: "Tyranitar",
      type: "Rock/Dark",
      sprite: "/images/pokemon/248.png",
      stats: { HP: 100, ATK: 134, DEF: 110, SPATK: 95, SPDEF: 100, SPD: 61 }
  },
  {
      id: 212,
      name: "Scizor",
      type: "Bug/Steel",
      sprite: "/images/pokemon/212.png",
      stats: { HP: 70, ATK: 130, DEF: 100, SPATK: 55, SPDEF: 80, SPD: 65 }
  },
  {
      id: 373,
      name: "Salamence",
      type: "Dragon/Flying",
      sprite: "/images/pokemon/373.png",
      stats: { HP: 95, ATK: 135, DEF: 80, SPATK: 110, SPDEF: 80, SPD: 100 }
  },

  // All 8 Eeveelutions
  {
      id: 134,
      name: "Vaporeon",
      type: "Water",
      sprite: "/images/pokemon/134.png",
      stats: { HP: 130, ATK: 65, DEF: 60, SPATK: 110, SPDEF: 95, SPD: 65 }
  },
  {
      id: 135,
      name: "Jolteon",
      type: "Electric",
      sprite: "/images/pokemon/135.png",
      stats: { HP: 65, ATK: 65, DEF: 60, SPATK: 110, SPDEF: 95, SPD: 130 }
  },
  {
      id: 136,
      name: "Flareon",
      type: "Fire",
      sprite: "/images/pokemon/136.png",
      stats: { HP: 65, ATK: 130, DEF: 60, SPATK: 95, SPDEF: 110, SPD: 65 }
  },
  {
      id: 196,
      name: "Espeon",
      type: "Psychic",
      sprite: "/images/pokemon/196.png",
      stats: { HP: 65, ATK: 65, DEF: 60, SPATK: 130, SPDEF: 95, SPD: 110 }
  },
  {
      id: 197,
      name: "Umbreon",
      type: "Dark",
      sprite: "/images/pokemon/197.png",
      stats: { HP: 95, ATK: 65, DEF: 110, SPATK: 60, SPDEF: 130, SPD: 65 }
  },
  {
      id: 470,
      name: "Leafeon",
      type: "Grass",
      sprite: "/images/pokemon/470.png",
      stats: { HP: 65, ATK: 110, DEF: 130, SPATK: 60, SPDEF: 65, SPD: 95 }
  },
  {
      id: 471,
      name: "Glaceon",
      type: "Ice",
      sprite: "/images/pokemon/471.png",
      stats: { HP: 65, ATK: 60, DEF: 110, SPATK: 130, SPDEF: 95, SPD: 65 }
  },
  {
      id: 700,
      name: "Sylveon",
      type: "Fairy",
      sprite: "/images/pokemon/700.png",
      stats: { HP: 95, ATK: 65, DEF: 65, SPATK: 110, SPDEF: 130, SPD: 60 }
  },

  // Niche Pokémon
  {
      id: 213,
      name: "Shuckle",
      type: "Bug/Rock",
      sprite: "/images/pokemon/213.png",
      stats: { HP: 20, ATK: 10, DEF: 230, SPATK: 10, SPDEF: 230, SPD: 5 }
  },
  {
      id: 129,
      name: "Magikarp",
      type: "Water",
      sprite: "/images/pokemon/129.png",
      stats: { HP: 20, ATK: 10, DEF: 55, SPATK: 15, SPDEF: 20, SPD: 80 }
  },
  {
      id: 438,
      name: "Bonsly",
      type: "Rock",
      sprite: "/images/pokemon/438.png",
      stats: { HP: 50, ATK: 80, DEF: 95, SPATK: 10, SPDEF: 45, SPD: 10 }
  },

  // Powerful Psychic Types
  {
      id: 65,
      name: "Alakazam",
      type: "Psychic",
      sprite: "/images/pokemon/65.png",
      stats: { HP: 55, ATK: 50, DEF: 45, SPATK: 135, SPDEF: 95, SPD: 120 }
  },
  {
      id: 68,
      name: "Machamp",
      type: "Fighting",
      sprite: "/images/pokemon/68.png",
      stats: { HP: 90, ATK: 130, DEF: 80, SPATK: 65, SPDEF: 85, SPD: 55 }
  },
  {
      id: 282,
      name: "Gardevoir",
      type: "Psychic/Fairy",
      sprite: "/images/pokemon/282.png",
      stats: { HP: 68, ATK: 65, DEF: 65, SPATK: 125, SPDEF: 115, SPD: 80 }
  },

  // Legendary/Mythical
  {
      id: 150,
      name: "Mewtwo",
      type: "Psychic",
      sprite: "/images/pokemon/150.png",
      stats: { HP: 106, ATK: 110, DEF: 90, SPATK: 154, SPDEF: 90, SPD: 130 }
  },
  {
      id: 151,
      name: "Mew",
      type: "Psychic",
      sprite: "/images/pokemon/151.png",
      stats: { HP: 100, ATK: 100, DEF: 100, SPATK: 100, SPDEF: 100, SPD: 100 }
  },
  {
      id: 493,
      name: "Arceus",
      type: "Normal",
      sprite: "/images/pokemon/493.png",
      stats: { HP: 120, ATK: 120, DEF: 120, SPATK: 120, SPDEF: 120, SPD: 120 }
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