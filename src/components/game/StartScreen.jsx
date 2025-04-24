import Link from 'next/link';
import styles from '../../app/game/ai/AiGame.module.css';

export default function StartScreen({ 
  difficulty, 
  onDifficultyChange, 
  onStart 
}) {
  return (
    <div className={styles.startScreen}>
      <h2>Battle Against Dexter!</h2>
      <p>Select stats to beat the AI in this Pokémon card battle!</p>
      
      <div className={styles.difficultySelector}>
        <label htmlFor="difficulty">Choose difficulty:</label>
        <select 
          id="difficulty" 
          value={difficulty} 
          onChange={onDifficultyChange}
          className={styles.selectField}
        >
          <option value="easy">Easy - Random Selection</option>
          <option value="hard">Hard - Strategic Selection</option>
          <option value="nightmare">Nightmare - Dexter Cheats!</option>
        </select>
      </div>
      
      <button className={styles.button} onClick={onStart}>Start Game</button>
      <Link href="/" className={styles.homeLink}>Back to Home</Link>
    </div>
  );
}