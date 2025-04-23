// src/app/game/ai/page.js
"use client";
import { useState, useEffect, useCallback } from 'react';
import { dealCards } from '../../../lib/data/pokemon';
import PokemonCard from '../../../components/game/PokemonCard';
import { determineWinner, aiSelectStat, getAiTaunt, playSoundEffect } from '../../../lib/game-utils';
import Link from 'next/link';
import styles from './AiGame.module.css';

export default function AiGamePage() {
  // Game state
  const [playerDeck, setPlayerDeck] = useState([]);
  const [aiDeck, setAiDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);
  const [aiSelectedStat, setAiSelectedStat] = useState(null);
  const [battleResult, setBattleResult] = useState(null); // 'win', 'lose', 'draw'
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("Ready to battle?");
  const [aiMessage, setAiMessage] = useState("");
  const [difficulty, setDifficulty] = useState('easy');
  const [animating, setAnimating] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentChooser, setCurrentChooser] = useState('player'); // 'player' or 'ai'

  // Function to handle drawing next cards
  const drawNextCards = useCallback((pDeck = playerDeck, aDeck = aiDeck) => {
    if (pDeck.length === 0 || aDeck.length === 0) {
      setGameOver(true);
      setMessage(pDeck.length === 0 ? "Game Over! AI wins!" : "Game Over! You win!");
      playSoundEffect(pDeck.length === 0 ? 'defeat' : 'victory');
      return;
    }

    setPlayerCard(pDeck[0]);
    setAiCard(aDeck[0]);
    setSelectedStat(null);
    setAiSelectedStat(null);
    setBattleResult(null);
    setAiMessage("");
    setAnimating(false);
  }, [playerDeck, aiDeck]);

  // Initialize the game
  useEffect(() => {
    if (!gameStarted) return;

    const initializeGame = () => {
      try {
        const { player1Deck, player2Deck } = dealCards(2); // Starting with 5 cards for testing
        setPlayerDeck(player1Deck);
        setAiDeck(player2Deck);
        setPlayerCard(player1Deck[0]);
        setAiCard(player2Deck[0]);
        setRound(1);
        setPlayerScore(0);
        setAiScore(0);
        setMessage("Choose a stat to battle!");
        setAiMessage("Greetings, human challenger. I am Dexter, your digital nemesis!");
        setCurrentChooser('player'); // Human starts as the chooser
        playSoundEffect('cardFlip');
      } catch (error) {
        setMessage("Error setting up the game: " + error.message);
      }
    };

    initializeGame();
  }, [gameStarted]);

  // Handle stat selection
  const handleStatSelect = useCallback((statName) => {
    if (selectedStat || animating) return; // Prevent multiple selections or actions during animation

    setSelectedStat(statName); // Set the selected stat
    setAnimating(true); // Start animation
    playSoundEffect('select'); // Play selection sound

    setTimeout(() => {
      const playerStatValue = playerCard.stats[statName];
      const aiStatValue = aiCard.stats[statName]; // Compare the same stat for both cards

      const result = determineWinner(playerStatValue, aiStatValue); // Determine the winner

      if (result === 'player') {
        setBattleResult('win');
        setMessage(`You win this round! Your ${statName}: ${playerStatValue} beats AI's ${statName}: ${aiStatValue}`);
        setAiMessage(getAiTaunt('lose'));
        setPlayerScore((prev) => prev + 1);
        setCurrentChooser('player'); // Player gets to choose next round
        playSoundEffect('victory');

        // Update decks
        setPlayerDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          newDeck.shift();
          newDeck.push(aiCard);
          return newDeck;
        });

        setAiDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          newDeck.shift();
          return newDeck;
        });
      } else if (result === 'ai') {
        setBattleResult('lose');
        setMessage(`AI wins this round! AI's ${statName}: ${aiStatValue} beats your ${statName}: ${playerStatValue}`);
        setAiMessage(getAiTaunt('win'));
        setAiScore((prev) => prev + 1);
        setCurrentChooser('ai'); // AI gets to choose next round
        playSoundEffect('defeat');

        // Update decks
        setAiDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          newDeck.shift();
          newDeck.push(playerCard);
          return newDeck;
        });

        setPlayerDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          newDeck.shift();
          return newDeck;
        });
      } else {
        setBattleResult('draw');
        setMessage(`It's a draw! Both ${statName} values are ${playerStatValue}`);
        setAiMessage(getAiTaunt('draw'));
        playSoundEffect('draw');

        // Both cards go to the bottom of their respective decks
        setPlayerDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          newDeck.shift();
          newDeck.push(playerCard);
          return newDeck;
        });

        setAiDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          newDeck.shift();
          newDeck.push(aiCard);
          return newDeck;
        });
      }

      setTimeout(() => {
        setRound((prevRound) => prevRound + 1); // Increment the round
        drawNextCards(); // Draw the next cards
      }, 2500);
    }, 1000);
  }, [selectedStat, animating, playerCard, aiCard, drawNextCards]);

  // Modify the AI's turn to choose a stat
  useEffect(() => {
    if (currentChooser === 'ai' && !selectedStat && !animating) {
      const aiStat = aiSelectStat(aiCard, playerDeck, difficulty); // AI selects a stat
      setAiSelectedStat(aiStat); // Set the AI's selected stat
      playSoundEffect('cardFlip');

      setTimeout(() => handleStatSelect(aiStat), 1000); // Trigger stat comparison
    }
  }, [currentChooser, aiCard, playerDeck, selectedStat, animating, difficulty, handleStatSelect]);

  // Start the game
  const startGame = () => {
    setGameStarted(true);
  };

  // Restart the game
  const restartGame = () => {
    setPlayerDeck([]);
    setAiDeck([]);
    setPlayerCard(null);
    setAiCard(null);
    setSelectedStat(null);
    setAiSelectedStat(null);
    setBattleResult(null);
    setGameOver(false);
    setMessage("Ready to battle?");
    setAiMessage("");
    setRound(0);
    setPlayerScore(0);
    setAiScore(0);
    setGameStarted(false);
    setCurrentChooser('player'); // Reset chooser to player
  };

  // Handle difficulty change
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <h1>Poké Battle!</h1>
        <div className={styles.scoreboard}>
          <div className={styles.score}>
            <span>Your deck:</span>
            <span className={styles.scoreValue}>{playerDeck.length}</span>
          </div>
          <div className={styles.score}>
            <span>AI deck:</span>
            <span className={styles.scoreValue}>{aiDeck.length}</span>
          </div>
          {gameStarted && !gameOver && (
            <div className={styles.roundDisplay}>
              Round {round}
            </div>
          )}
        </div>
      </div>

      <div className={styles.messageBox}>
        {message}
      </div>

      {!gameStarted ? (
        <div className={styles.startScreen}>
          <h2>Battle Against Dexter!</h2>
          <p>Select stats to beat the AI in this Pokémon card battle!</p>
          
          <div className={styles.difficultySelector}>
            <label htmlFor="difficulty">Choose difficulty:</label>
            <select 
              id="difficulty" 
              value={difficulty} 
              onChange={handleDifficultyChange}
              className={styles.selectField}
            >
              <option value="easy">Easy - Random Selection</option>
              <option value="hard">Hard - Strategic Selection</option>
              <option value="nightmare">Nightmare - Dexter Cheats!</option>
            </select>
          </div>
          
          <button className={styles.button} onClick={startGame}>Start Game</button>
          <Link href="/" className={styles.homeLink}>Back to Home</Link>
        </div>
      ) : gameOver ? (
        <div className={styles.gameOverScreen}>
          <h2>{playerDeck.length === 0 ? "You Lost!" : "You Won!"}</h2>
          <div className={styles.finalScore}>
            <p>Final Score</p>
            <div className={styles.scoreDisplay}>
              <span>You: {playerScore}</span>
              <span>Dexter: {aiScore}</span>
            </div>
          </div>
          <button className={styles.button} onClick={restartGame}>Play Again</button>
          <Link href="/" className={styles.homeLink}>Back to Home</Link>
        </div>
      ) : (
        <>
          <div className={styles.battleArea}>
            <div className={styles.playerArea}>
              <h2>Your Card</h2>
              {playerCard && (
                <div className={battleResult === 'win' ? styles.winningCard : ''}>
                  <PokemonCard 
                    pokemon={playerCard} 
                    onStatSelect={handleStatSelect}
                    showBack={true}
                    selectedStat={selectedStat}
                  />
                </div>
              )}
              {selectedStat && (
                <div className={styles.statBadge}>
                  {selectedStat}: {playerCard?.stats[selectedStat]}
                </div>
              )}
            </div>
            
            <div className={styles.vsSection}>
              <div className={styles.vsCircle}>VS</div>
              {battleResult && (
                <div className={`${styles.resultBadge} ${styles[battleResult]}`}>
                  {battleResult === 'win' ? 'You Win!' : battleResult === 'lose' ? 'AI Wins!' : 'Draw!'}
                </div>
              )}
            </div>
            
            <div className={styles.aiArea}>
              <h2>Dexters Card</h2>
              {aiCard && (
                <div className={battleResult === 'lose' ? styles.winningCard : ''}>
                  <PokemonCard 
                    pokemon={aiCard}
                    showBack={!!aiSelectedStat} // Only show the back of the card if the AI has selected a stat // Only show the back of the card if the AI has selected a stat
                    selectedStat={aiSelectedStat} // Highlight the AI's selected stat // Highlight the AI's selected stat
                  />
                </div>
              )}
              {aiSelectedStat && (
                <div className={styles.statBadge}>
                  {aiSelectedStat}: {aiCard?.stats[aiSelectedStat]}
                </div>
              )}
            </div>
          </div>
          
          {aiMessage && (
            <div className={styles.aiMessageBox}>
              <div className={styles.aiAvatar}>D</div>
              <div className={styles.aiMessageText}>{aiMessage}</div>
            </div>
          )}
        </>
      )}

      <div className={styles.instructions}>
        {!gameOver && gameStarted && !selectedStat && !animating && (
          <p>Choose a stat from your card to battle!</p>
        )}
      </div>
      
      {gameStarted && !gameOver && (
        <div className={styles.gameControls}>
          <button 
            className={styles.smallButton} 
            onClick={restartGame}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}