import styles from '../../app/game/ai/AiGame.module.css';
import PokemonCard from './PokemonCard';

export default function BattleArena({
  playerCard,
  aiCard,
  currentTurn,
  selectedStat,
  aiSelectedStat,
  battleResult,
  handleStatSelect,
  processingRound
}) {
  return (
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
          <div className={`${styles.statOverlay} ${styles.fadeIn}`}>
            You Chose: <strong>{selectedStat}</strong> <strong>{playerCard.stats[selectedStat]}</strong>
          </div>
        )}
      </div>
      
      <div className={styles.vsSection}>
        <div className={`${styles.vsCircle} ${styles.pulseAnimation}`}>VS</div>
        {battleResult && (
          <div className={`${styles.resultBadge} ${styles[battleResult]} ${styles.fadeIn}`}>
            {battleResult === 'win' ? 'You Win!' : battleResult === 'lose' ? 'AI Wins!' : 'Draw!'}
          </div>
        )}
      </div>
      
      <div className={styles.aiArea}>
        <h2>Dexter's Card {currentTurn === 'ai' && "- AI's Turn"}</h2>
        {aiCard && (
          <div className={battleResult === 'lose' ? styles.winningCard : ''}>
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