# MyPokemon - Pokémon Card Duel Game

![Pokémon Banner](https://via.placeholder.com/800x200?text=Pokemon+Card+Duel)

A nostalgic card duel game inspired by childhood Pokémon card battles. Challenge an AI opponent in a strategic duel where you compare Pokémon stats to win cards and ultimately the entire game.

## 🎮 Game Overview

**MyPokemon** is a turn-based card game where:

- Players and AI receive an equal number of Pokémon cards
- Each round, the player with the turn selects a stat to compare (HP, Attack, Defense, etc.)
- The card with the higher selected stat wins that round
- The winner of each round collects the opponent's card and gets to choose the stat for the next round
- The game continues until one player has collected all cards

This project brings back the childhood joy of traditional Pokémon card games with a digital twist!

## ✨ Features

- **Dynamic Card Distribution**: Random distribution of Pokémon cards at the start of each game
- **AI Opponent**: Play against a computer opponent with strategic stat selection
- **Beautiful UI**: Card-based interface with Pokémon imagery and stats
- **Game Statistics**: Track game progress including cards won/lost
- **API Integration**: Utilizes the PokéAPI for authentic Pokémon data

## 🚀 Getting Started

### Prerequisites

- Python 3.6+
- Required packages: `requests`, `random`, `json`, `time`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OmSingh2005/mypokemon.git
   cd mypokemon
   ```

2. Run the game:
   ```bash
   python main.py
   ```

### How to Play

1. Start the game to receive your hand of Pokémon cards
2. During your turn, select a stat to compare (by typing the stat name)
3. Your card and the AI's card will be compared based on the selected stat
4. The player with the higher stat wins both cards
5. The winner continues with the next turn
6. The game ends when one player has no cards left

## 🧩 Code Structure

- `main.py`: Main game loop and player interaction
- `pokemon.py`: Pokémon class definition and methods
- `utils.py`: Utility functions for fetching data and game logic
- `api_handler.py`: Functions for interacting with the PokéAPI

## 🛠️ Technical Implementation

- **PokéAPI Integration**: Fetches real Pokémon data including stats and abilities
- **Object-Oriented Design**: Utilizes classes to represent game entities
- **Game State Management**: Tracks and updates the state of the game across rounds
- **Error Handling**: Robust error handling for API requests and user input

## 🔮 Future Enhancements

- Graphical user interface (GUI) for improved player experience
- Expanded gameplay mechanics (Special abilities, type advantages)
- Multiplayer support
- Custom card creation
- Save/load game functionality
- Sound effects and animations

## 📋 Game Rules

1. The game starts with an equal distribution of cards between player and AI
2. Player gets the first turn in round 1
3. The stat with the higher value wins the round
4. In case of a tie, both cards go back to their respective owners
5. The winner of each round gets to choose the stat for the next round
6. Game ends when all cards are collected by either player or AI

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- Inspiration from childhood Pokémon card games
- All Pokémon characters and images are property of The Pokémon Company and Nintendo

---

Made with ❤️ by [Om Singh](https://github.com/OmSingh2005)
