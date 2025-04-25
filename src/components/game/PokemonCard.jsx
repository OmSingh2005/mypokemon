"use client";
import { useState } from 'react';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon, onStatSelect, showBack = false, selectedStat = null }) {
  const [flipped, setFlipped] = useState(showBack);
  
  // Stats colors for the stat orbs
  const statColors = {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    specialAttack: '#9DB7F5',
    specialDefense: '#A7DB8D',
    speed: '#FA92B2'
  };

  const handleCardClick = () => {
    // Only allow flipping if we're not in the middle of a battle
    if (!selectedStat) {
      setFlipped(!flipped);
    }
  };

  const handleStatClick = (statName) => {
    if (onStatSelect && flipped) {
      onStatSelect(statName);
    }
  };

  return (
    <div 
      className={`${styles.card} ${flipped ? styles.flipped : ''}`} 
      onClick={handleCardClick}
    >
      <div className={styles.cardInner}>
        {/* Front of Card (Pokémon Image) */}
        <div className={styles.cardFront}>
          <div className={styles.pokemonName}></div>
          <div className={styles.imageContainer}>
            {/* We'll use a placeholder for now */}
            <div className={styles.pokemonImage}>
            {pokemon.sprite ? (
                <img 
                  src={`/images/pokemon/${pokemon.id}.png`} // Corrected path
                  alt={pokemon.name} 
                  onError={() => setImageError(true)} // Set error state if image fails to load
                />
              ) : (
                <div className={styles.placeholder}>{pokemon.name.charAt(0)}</div>
              )}
            </div>
          </div>
          <div className={styles.pokemonType}>{pokemon.type}</div>
        </div>

        {/* Back of Card (Stats) */}
        <div className={styles.cardBack}>
          <div className={styles.pokemonName}>{pokemon.name}</div>
          <div className={styles.imageContainer}>
            {/* We'll use a placeholder for now */}
            <div className={styles.pokemonImage}>
            {pokemon.sprite ? (
                <img 
                  src={`/images/pokemon/${pokemon.id}.png`} // Corrected path
                  alt={pokemon.name} 
                  onError={() => setImageError(true)} // Set error state if image fails to load
                />
              ) : (
                <div className={styles.placeholder}>{pokemon.name.charAt(0)}</div>
              )}
            </div>
          </div>
          <div className={styles.statsContainer}>
            {Object.entries(pokemon.stats).map(([stat, value]) => (
              <div 
                key={stat}
                className={`${styles.statOrb} ${selectedStat === stat ? styles.selectedStat : ''}`}
                style={{ 
                  backgroundColor: statColors[stat],
                  opacity: selectedStat && selectedStat !== stat ? 0.5 : 1
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatClick(stat);
                }}
              >
                <div className={styles.statName}>{stat}</div>
                <div className={styles.statValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}