"use client";
import { useState, useEffect, useCallback } from 'react';
import { dealCards } from '../../../lib/data/pokemon';
import PokemonCard from '../../../components/game/PokemonCard';
import { determineWinner, aiSelectStat, getAiTaunt, playSoundEffect } from '../../../lib/game-utils';
import Link from 'next/link';
import styles from './AiGame.module.css';

// AIgamepage
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
  const [round, setRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState('player'); // 'player' or 'ai'
  const [processingRound, setProcessingRound] = useState(false); // Flag to prevent multiple round processing

  // Function to handle drawing next cards
  const drawNextCards = useCallback(() => {
    setProcessingRound(false); // Reset processing flag
    
    // Check if game is over
    if (playerDeck.length === 0 || aiDeck.length === 0) {
      setGameOver(true);
      setMessage(playerDeck.length === 0 ? "Game Over! AI wins!" : "Game Over! You win!");
      playSoundEffect(playerDeck.length === 0 ? 'defeat' : 'victory');
      return;
    }

    // Set top cards from each deck
    const newPlayerCard = {...playerDeck[0]};
    const newAiCard = {...aiDeck[0]};
    setPlayerCard(newPlayerCard);
    setAiCard(newAiCard);
    
    // Add a small timeout to ensure state updates are complete before setting cards
    setTimeout(() => {
      setPlayerCard(playerDeck[0]);
      setAiCard(aiDeck[0]); 
      setSelectedStat(null);
      setAiSelectedStat(null);
      setBattleResult(null);
      setAnimating(false);
      
      // Set message based on who has the turn
      if (currentTurn === 'player') {
        setMessage("Your turn! Choose a stat to battle.");
        setAiMessage("I await your choice, human...");
      } else {
        setMessage("AI's turn to choose a stat!");
        setAiMessage("Let me think about my next move...");
      }
    }, 50); // Small delay to ensure proper rendering sequence
  }, [playerDeck, aiDeck, currentTurn]);

  // Initialize the game
  useEffect(() => {
    if (!gameStarted) return;

    const initializeGame = () => {
      try {
        const { player1Deck, player2Deck } = dealCards(5); // Deal cards evenly between players
        setPlayerDeck(player1Deck);
        setAiDeck(player2Deck);
        setRound(1);
        setCurrentTurn('player'); // Player always starts first
        setProcessingRound(false);
        
        // Set messages
        setMessage("Your turn! Choose a stat to battle.");
        setAiMessage("Greetings, challenger. I am Dexter, your digital nemesis!");
        
        // Play sound
        playSoundEffect('cardFlip');
      } catch (error) {
        setMessage("Error setting up the game: " + error.message);
      }
    };

    initializeGame();
  }, [gameStarted]);

  // Set initial cards when deck changes
  useEffect(() => {
    if (gameStarted && playerDeck.length > 0 && aiDeck.length > 0) {
      setPlayerCard(playerDeck[0]);
      setAiCard(aiDeck[0]);
    }
  }, [gameStarted, playerDeck, aiDeck]);

  // Process battle result and update decks
  const processBattleResult = useCallback((result, statName) => {
    if (processingRound) return;
    setProcessingRound(true);
  
    // Get current card values before any state changes
    const currentPlayerCard = playerCard;
    const currentAiCard = aiCard;
    const playerStatValue = currentPlayerCard.stats[statName];
    const aiStatValue = currentAiCard.stats[statName];
  
    // Calculate new decks based on result
    let newPlayerDeck = [...playerDeck];
    let newAiDeck = [...aiDeck];
    
    // Remove the top card from both decks first
    newPlayerDeck.shift(); // Remove player's top card
    newAiDeck.shift(); // Remove AI's top card
  
    if (result === 'player') {
      // Player wins - add both cards to player's deck bottom
      newPlayerDeck.push(currentAiCard, currentPlayerCard);
      setCurrentTurn('player');
      setMessage(`You win this round! Your ${statName}: ${playerStatValue} beats AI's ${statName}: ${aiStatValue}`);
      setAiMessage(getAiTaunt('lose'));
      playSoundEffect('victory');
    } else if (result === 'ai') {
      // AI wins - add both cards to AI's deck bottom
      newAiDeck.push(currentPlayerCard, currentAiCard);
      setCurrentTurn('ai');
      setMessage(`AI wins this round! AI's ${statName}: ${aiStatValue} beats your ${statName}: ${playerStatValue}`);
      setAiMessage(getAiTaunt('win'));
      playSoundEffect('defeat');
    } else {
      // Draw - return cards to respective decks
      newPlayerDeck.push(currentPlayerCard);
      newAiDeck.push(currentAiCard);
      setMessage(`It's a draw! Both ${statName} values are ${playerStatValue}`);
      setAiMessage(getAiTaunt('draw'));
      playSoundEffect('draw');
    }
  
    setBattleResult(result);
    setRound(prevRound => prevRound + 1);
  
    // Update decks and prepare next round
    setTimeout(() => {
      setPlayerDeck(newPlayerDeck);
      setAiDeck(newAiDeck);
      
      // Check for game over condition
      if (newPlayerDeck.length === 0 || newAiDeck.length === 0) {
        setGameOver(true);
        setMessage(newPlayerDeck.length === 0 ? "Game Over! AI wins!" : "Game Over! You win!");
        playSoundEffect(newPlayerDeck.length === 0 ? 'defeat' : 'victory');
        return;
      }
  
      // Proceed to next round
      setTimeout(() => {
        setPlayerCard(newPlayerDeck[0]);
        setAiCard(newAiDeck[0]);
        setSelectedStat(null);
        setAiSelectedStat(null);
        setBattleResult(null);
        setAnimating(false);
        setProcessingRound(false);
  
        // Set appropriate messages
        if (currentTurn === 'player') {
          setMessage("Your turn! Choose a stat to battle.");
          setAiMessage("I await your choice, human...");
        } else {
          setMessage("AI's turn to choose a stat!");
          setAiMessage("Let me think about my next move...");
        }
      }, 100);
    }, 2000);
  }, [playerCard, aiCard, playerDeck, aiDeck, processingRound, currentTurn]);

  // Handle stat selection by player
  const handleStatSelect = useCallback((statName) => {
    if (selectedStat || animating || processingRound || currentTurn !== 'player') return;
    
    setSelectedStat(statName);
    setAnimating(true);
    playSoundEffect('select');

    // Compare stats and determine winner
    setTimeout(() => {
      const playerStatValue = playerCard.stats[statName];
      const aiStatValue = aiCard.stats[statName];
      const result = determineWinner(playerStatValue, aiStatValue);
      
      processBattleResult(result, statName);
    }, 1000);
  }, [selectedStat, animating, processingRound, currentTurn, playerCard, aiCard, processBattleResult]);

  // AI's turn to choose a stat
  useEffect(() => {
    if (currentTurn === 'ai' && !animating && !processingRound && playerCard && aiCard) {
      const aiTimer = setTimeout(() => {
        // AI selects a stat based on difficulty
        const aiStat = aiSelectStat(aiCard, playerCard, difficulty);
        setAiSelectedStat(aiStat);
        setMessage(`AI chose ${aiStat}!`);
        setAiMessage(`I choose ${aiStat}! Let's see how you compare...`);
        setAnimating(true);
        playSoundEffect('select');
        
        // Process the battle after showing AI's choice
        setTimeout(() => {
          const playerStatValue = playerCard.stats[aiStat];
          const aiStatValue = aiCard.stats[aiStat];
          const result = determineWinner(playerStatValue, aiStatValue);
          
          processBattleResult(result, aiStat);
        }, 1000);
      }, 1500);
      
      return () => clearTimeout(aiTimer);
    }
  }, [currentTurn, animating, processingRound, playerCard, aiCard, difficulty, processBattleResult]);

  // Start the game
  const startGame = () => {
    setGameStarted(true);
  };

  // Restart the game
  const restartGame = () => {
    // Reset all game state
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
    setGameStarted(false);
    setCurrentTurn('player');
    setProcessingRound(false);
    setAnimating(false);
  };

  // Handle difficulty change
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  // Calculate total cards (for debugging)
  const totalCards = playerDeck.length + aiDeck.length;

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
            <p>Final Results</p>
            <div className={styles.scoreDisplay}>
              <span>Your Cards: {playerDeck.length}</span>
              <span>Dexter&apros;s Cards: {aiDeck.length}</span>
            </div>
          </div>
          <button className={styles.button} onClick={restartGame}>Play Again</button>
          <Link href="/" className={styles.homeLink}>Back to Home</Link>
        </div>
      ) : (
        <>
          <div className={styles.battleArea}>
            <div className={styles.playerArea}>
              <h2>Your Card {currentTurn === 'player' && "- Your Turn"}</h2>
              {playerCard && (
                <div className={battleResult === 'win' ? styles.winningCard : ''}>
                  <PokemonCard 
                    pokemon={playerCard} 
                    onStatSelect={currentTurn === 'player' && !selectedStat && !processingRound ? handleStatSelect : null}
                    showBack={true} // Always show stats
                    selectedStat={selectedStat}
                  />
                </div>
              )}
              {selectedStat && (
                <div className={styles.statBadge}>
                  Chose: {selectedStat}
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
              {!battleResult && (
                <div className={`${styles.turnIndicator} ${styles[currentTurn]}`}>
                  {currentTurn === 'player' ? "Your Turn" : "AI's Turn"}
                </div>
              )}
            </div>
            
            <div className={styles.aiArea}>
              <h2>Dexters Card {currentTurn === 'ai' && "- AI's Turn"}</h2>
              {aiCard && (
                <div className={battleResult === 'lose' ? styles.winningCard : ''}>
                  <PokemonCard 
                    pokemon={aiCard}
                    showBack={true} // Always show stats
                    selectedStat={aiSelectedStat}
                  />
                </div>
              )}
              {aiSelectedStat && (
                <div className={styles.statBadge}>
                  Chose: {aiSelectedStat}
                </div>
              )}
            </div>
            
            <div className={styles.aiArea}>
              <h2>Dexters Card {currentTurn === 'ai' && "- AI's Turn"}</h2>
              {gameStarted && (
                <div style={{
                  position: 'fixed', 
                  right: 0, 
                  top: 0, 
                  width: '150px', 
                  height: '100vh', 
                  backgroundColor: 'rgba(0,0,0,0.1)', 
                  padding: '10px',
                  overflowY: 'auto'
                }}>
                  <h4>Player Deck</h4>
                  {playerDeck.map((card, i) => (
                    <div key={`player-${i}`} style={{
                      padding: '5px',
                      margin: '5px 0',
                      backgroundColor: i === 0 ? '#e6ffe6' : 'white',
                      border: '1px solid #ccc'
                    }}>
                      {card.name} (#{i})
                    </div>
                  ))}
                  <h4>AI Deck</h4>
                  {aiDeck.map((card, i) => (
                    <div key={`ai-${i}`} style={{
                      padding: '5px',
                      margin: '5px 0',
                      backgroundColor: i === 0 ? '#ffe6e6' : 'white',
                      border: '1px solid #ccc'
                    }}>
                      {card.name} (#{i})
                    </div>
                  ))}
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
        {gameStarted && !gameOver && currentTurn === 'player' && !selectedStat && !animating && !processingRound && (
          <p>Choose a stat from your card to battle!</p>
        )}
        {gameStarted && !gameOver && currentTurn === 'ai' && !aiSelectedStat && !animating && !processingRound && (
          <p>AI is choosing a stat...</p>
        )}
        {gameStarted && !gameOver && processingRound && (
          <p>Processing round results...</p>
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
