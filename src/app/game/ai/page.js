"use client";
import { useState, useEffect, useCallback } from 'react';
import { dealCards } from '../../../lib/data/pokemon';
import PokemonCard from '../../../components/game/PokemonCard';
import { determineWinner, aiSelectStat, getAiTaunt, playSoundEffect } from '../../../lib/game-utils';
import Link from 'next/link';
import styles from './AiGame.module.css';
import BattleLogger from '../../../components/game/BattleLogger';
export default function AiGamePage() {
  // Game state
  const [playerDeck, setPlayerDeck] = useState([]);
  const [aiDeck, setAiDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);
  const [aiSelectedStat, setAiSelectedStat] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("Ready to battle?");
  const [aiMessage, setAiMessage] = useState("");
  const [difficulty, setDifficulty] = useState('easy');
  const [animating, setAnimating] = useState(false);
  const [round, setRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [processingRound, setProcessingRound] = useState(false);
  const [logs, setLogs] = useState([]);


  // Initialize the game
  const initializeGame = useCallback(() => {
    try {
      const { player1Deck, player2Deck } = dealCards(5);
      setPlayerDeck(player1Deck);
      setAiDeck(player2Deck);
      setPlayerCard(player1Deck[0]);
      setAiCard(player2Deck[0]);
      setRound(1);
      setCurrentTurn('player');
      setProcessingRound(false);
      setMessage("Your turn! Choose a stat to battle.");
      setAiMessage("Greetings, challenger. I am Dexter, your digital nemesis!");
      playSoundEffect('cardFlip');
    } catch (error) {
      setMessage("Error setting up the game: " + error.message);
    }
  }, []);

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted, initializeGame]);

  // Process battle result and update decks
  const processBattleResult = useCallback((result, statName) => {
    if (processingRound || !playerCard || !aiCard) return;
    setProcessingRound(true);

    // Get current values
    const currentPlayerCard = playerCard;
    const currentAiCard = aiCard;
    const playerStatValue = currentPlayerCard.stats[statName];
    const aiStatValue = currentAiCard.stats[statName];

    // Calculate new decks
    let newPlayerDeck = [...playerDeck.slice(1)];
    let newAiDeck = [...aiDeck.slice(1)];

    if (result === 'player') {
      newPlayerDeck.push(currentAiCard, currentPlayerCard);
      setMessage(`You win this round! Your ${statName}: ${playerStatValue} beats AI's ${statName}: ${aiStatValue}`);
      setAiMessage(getAiTaunt('lose'));
      playSoundEffect('victory');
    } else if (result === 'ai') {
      newAiDeck.push(currentPlayerCard, currentAiCard);
      setMessage(`AI wins this round! AI's ${statName}: ${aiStatValue} beats your ${statName}: ${playerStatValue}`);
      setAiMessage(getAiTaunt('win'));
      playSoundEffect('defeat');
    } else {
      newPlayerDeck.push(currentPlayerCard);
      newAiDeck.push(currentAiCard);
      setMessage(`It's a draw! Both ${statName} values are ${playerStatValue}`);
      setAiMessage(getAiTaunt('draw'));
      playSoundEffect('draw');
    }

    setBattleResult(result);
    setRound(prev => prev + 1);

    // Update state in sequence
    setTimeout(() => {
      setPlayerDeck(newPlayerDeck);
      setAiDeck(newAiDeck);
      
      if (newPlayerDeck.length === 0 || newAiDeck.length === 0) {
        setGameOver(true);
        setMessage(newPlayerDeck.length === 0 ? "Game Over! AI wins!" : "Game Over! You win!");
        playSoundEffect(newPlayerDeck.length === 0 ? 'defeat' : 'victory');
        return;
      }

      const nextTurn = result === 'player' ? 'player' : result === 'ai' ? 'ai' : currentTurn;
      setCurrentTurn(nextTurn);

      setTimeout(() => {
        setPlayerCard(newPlayerDeck[0]);
        setAiCard(newAiDeck[0]);
        setSelectedStat(null);
        setAiSelectedStat(null);
        setBattleResult(null);
        setAnimating(false);
        setProcessingRound(false);

        // Set messages for next turn
        if (nextTurn === 'player') {
          setMessage("Your turn! Choose a stat to battle.");
          setAiMessage("I await your choice, human...");
        } else {
          setMessage("AI's turn to choose a stat!");
          setAiMessage("Let me think about my next move...");
        }
      }, 500);
    }, 1500);
  }, [playerCard, aiCard, playerDeck, aiDeck, processingRound, currentTurn]);

  // Handle stat selection by player
  const handleStatSelect = useCallback((statName) => {
    if (selectedStat || animating || processingRound || currentTurn !== 'player') return;
    
    setSelectedStat(statName);
    setAnimating(true);
    playSoundEffect('select');

    setTimeout(() => {
      const result = determineWinner(playerCard.stats[statName], aiCard.stats[statName]);
      processBattleResult(result, statName);
    }, 1000);
  }, [selectedStat, animating, processingRound, currentTurn, playerCard, aiCard, processBattleResult]);

  // AI's turn to choose a stat
  useEffect(() => {
    if (currentTurn === 'ai' && !animating && !processingRound && playerCard && aiCard) {
      const aiTimer = setTimeout(() => {
        const aiStat = aiSelectStat(aiCard, playerCard, difficulty);
        setAiSelectedStat(aiStat);
        setAnimating(true);
        playSoundEffect('select');
        
        setTimeout(() => {
          const result = determineWinner(playerCard.stats[aiStat], aiCard.stats[aiStat]);
          processBattleResult(result, aiStat);
        }, 1000);
      }, 1000);
      
      return () => clearTimeout(aiTimer);
    }
  }, [currentTurn, animating, processingRound, playerCard, aiCard, difficulty, processBattleResult]);

  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setMessage("Ready to battle?");
    setAiMessage("");
    setRound(0);
    setCurrentTurn('player');
    setProcessingRound(false);
    setAnimating(false);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const addLog = (message, type = 'action') => {
    setLogs(prev => [
      { message, type, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 49) // Keep max 50 logs
    ]);
  };

  return (
  <div className={styles.gameContainer}>
    {/* Header */}
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
          <div className={styles.roundDisplay}>Round {round}</div>
        )}
      </div>
    </div>

    <div className={styles.messageBox}>{message}</div>

    {/* Game States */}
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
            <span>Dexter Cards: {aiDeck.length}</span>
          </div>
        </div>
        <button className={styles.button} onClick={restartGame}>Play Again</button>
        <Link href="/" className={styles.homeLink}>Back to Home</Link>
      </div>
    ) : (
      <>
        {/* Battle Area + Logger */}
        <div className={styles.mainBattleArea}>
          {/* Cards Area */}
          <div className={styles.battleArea}>
            <div className={styles.playerArea}>
              <h2>Your Card {currentTurn === 'player' && "- Your Turn"}</h2>
              {playerCard && (
                <div className={battleResult === 'win' ? styles.winningCard : ''}>
                  <PokemonCard 
                    pokemon={playerCard} 
                    onStatSelect={currentTurn === 'player' && !selectedStat && !processingRound ? handleStatSelect : null}
                    showBack={true}
                    selectedStat={selectedStat}
                  />
                </div>
              )}
              {selectedStat && (
                <div className={styles.statBadge}>Chose: {selectedStat}</div>
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
              <h2>Dexter Card {currentTurn === 'ai' && "- AI's Turn"}</h2>
              {aiCard && (
                <div className={battleResult === 'lose' ? styles.winningCard : ''}>
                  <PokemonCard 
                    pokemon={aiCard}
                    showBack={true}
                    selectedStat={aiSelectedStat}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Logger */}
          <BattleLogger logs={logs} />
        </div>

        {/* AI Message */}
        {aiMessage && (
          <div className={styles.aiMessageBox}>
            <div className={styles.aiAvatar}>D</div>
            <div className={styles.aiMessageText}>{aiMessage}</div>
          </div>
        )}
      </>
    )}

    {/* Controls */}
    {gameStarted && !gameOver && (
      <div className={styles.gameControls}>
        <button className={styles.smallButton} onClick={restartGame}>
          Restart Game
        </button>
      </div>
    )}
  </div>
);
}