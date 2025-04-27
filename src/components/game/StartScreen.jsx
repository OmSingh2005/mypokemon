import Link from 'next/link';
import styles from '../../app/game/ai/AiGame.module.css';

export default function StartScreen({ 
  difficulty, 
  numCards, 
  onDifficultyChange, 
  onNumCardsChange, 
  onStart 
}) {
  return (
    <div className={styles.startScreen}>
      <h2>Battle Against Dexter!</h2>
      {/* <p>Select stats to beat the AI in this Pokémon card battle!</p> */}
      
      <div className={styles.selector}>
        <div className={styles.difficultySelector}>
          <label htmlFor="difficulty">Choose the difficulty:</label>
          <select 
            id="difficulty" 
            value={difficulty} 
            onChange={onDifficultyChange}
            className={styles.selectField}
          >
            <option value="easy">Easy - Simple Game </option>
            <option value="hard">Hard - Strategic Selection</option>
            <option value="nightmare">Nightmare - Dexter Cheats!</option>
          </select>
        <div className={styles.cardSelector}>
          <label htmlFor="numCards">Deck Size: </label>
          <input 
            id="numCards" 
            type="number" 
            value={numCards} 
            onChange={onNumCardsChange}
            className={styles.inputField}
            min="1" 
            max="60" 
            placeholder="Enter deck size"
          /></div>
        </div>
      </div>
      
      <button className={styles.button} onClick={onStart}>Start Game</button>
      <Link href="/" className={styles.homeLink}>Back to Home</Link>
    </div>
  );
}