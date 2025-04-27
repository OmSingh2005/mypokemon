import styles from '../../app/game/ai/AiGame.module.css';
import PokemonCard from './PokemonCard';

export default function BattleArena({
  playerCard,
  aiCard,
  currentTurn,
  selectedStat,
  aiSelectedStat,
  result,
  handleStatSelect,
  processingRound
}) {
  return (
    <div className={styles.battleArea}>
      <div className={styles.playerArea}>
        <h2>Your Card {currentTurn === 'player' && "- Your Turn"}</h2>
        {playerCard && (
          <div className={result === 'win' ? styles.winningCard : ''}>
            <PokemonCard 
              pokemon={playerCard} 
              onStatSelect={currentTurn === 'player' && !selectedStat && !processingRound ? handleStatSelect : null}
              showBack={true}
              selectedStat={selectedStat}
            />
          </div>
        )}
        {selectedStat && (
          <div className={`${styles.statOverlay} ${styles.fadeIn}`}>
            You Chose: <strong>{selectedStat}</strong> <strong>{playerCard.stats[selectedStat]}</strong>
          </div>
        )}
      </div>
      
      <div className={styles.vsSection}>
        <div className={`${styles.vsCircle} ${styles.pulseAnimation}`}>VS</div>
        {result && (
          <div className={`${styles.resultBadge} ${styles[result]} ${styles.fadeIn}`}>
            {result === 'win' ? 'You Win!' : result === 'lose' ? 'Dex Wins!' : 'draw'}
          </div>
        )}
      </div>
      
      <div className={styles.aiArea}>
        <h2>Dexter's Card {currentTurn === 'ai' && "- AI's Turn"}</h2>
        {aiCard && (
          <div className={result === 'lose' ? styles.winningCard : ''}>
            <div className={styles.aiCardContainer}>
              <PokemonCard
                pokemon={aiCard}
                showBack={true}
                aiSelectedStat={aiSelectedStat} // Highlight AI's chosen stat
              />
              {aiSelectedStat && (
                <div className={`${styles.statOverlay} ${styles.fadeIn}`}>
                  AI Chose: <strong>{aiSelectedStat}</strong> <strong>{aiCard.stats[aiSelectedStat]}</strong>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}