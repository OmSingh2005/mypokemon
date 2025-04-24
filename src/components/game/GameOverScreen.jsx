import Link from 'next/link';
import styles from '../../app/game/ai/AiGame.module.css';

export default function GameOverScreen({ 
  playerDeck,
  aiDeck, 
  logs,
  onRestart 
}) {
  return (
    <div className={styles.gameOverScreen}>
      <h2>{playerDeck.length === 0 ? "You Lost!" : "You Won!"}</h2>
      <div className={styles.finalScore}>
        <p>Final Results</p>
        <div className={styles.scoreDisplay}>
          <span>Your Cards: {playerDeck.length}</span>
          <span>Dexter's Cards: {aiDeck.length}</span>
        </div>
      </div>
      
      {/* Optional: Show condensed battle history */}
      <div className={styles.finalLogs}>
        <h4>Battle Summary:</h4>
        {logs.map((log, i) => (
          <div key={i} className={styles.finalLog}>
            [{log.timestamp}] {log.message}
          </div>
        ))}
      </div>
      
      <button className={styles.button} onClick={onRestart}>Play Again</button>
      <Link href="/" className={styles.homeLink}>Back to Home</Link>
    </div>
  );
}