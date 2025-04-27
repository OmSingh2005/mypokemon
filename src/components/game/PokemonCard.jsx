"use client";
import { useState } from 'react';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon, onStatSelect, showBack = false, selectedStat = null , aiSelectedStat = null}) {
  const [flipped, setFlipped] = useState(showBack);
  const [imageError, setImageError] = useState(false);
  
  // Stats colors for the stat values
  const statColors = {
    HP: '#FAE078',       // Health Points
    ATK: '#FF5959',      // Attack
    DEF: '#F5AC78',      // Defense
    SPATK: '#FA92B2',    // Special Attack
    SPDEF: '#A7DB8D',    // Special Defense
    SPD: '#9DB7F5'       // Speed
  };

  // Type colors
  const typeColors = {
    NORMAL: '#A8A878',
    FIRE: '#F08030',
    WATER: '#6890F0',
    ELECTRIC: '#F8D030',
    GRASS: '#78C850',
    ICE: '#98D8D8',
    FIGHTING: '#C03028',
    POISON: '#A040A0',
    GROUND: '#E0C068',
    FLYING: '#A890F0',
    PSYCHIC: '#F85888',
    BUG: '#A8B820',
    ROCK: '#B8A038',
    GHOST: '#705898',
    DRAGON: '#7038F8',
    DARK: '#705848',
    STEEL: '#B8B8D0',
    FAIRY: '#EE99AC'
  };

  const handleCardClick = () => {
    if (!selectedStat) {
      setFlipped(!flipped);
    }
  };

  const handleStatClick = (statName) => {
    if (onStatSelect && flipped) {
      onStatSelect(statName);
    }
  };

  const getTypeColor = (type) => {
    return typeColors[type.toUpperCase()] || '#A8A878'; // Default to normal
  };

  return (
    <div 
      className={`${styles.card} ${flipped ? styles.flipped : ''}`} 
      onClick={handleCardClick}
    >
      <div className={styles.cardInner}>
        {/* Front of Card (Pokémon Image) - Unchanged */}
        <div className={styles.cardFront}>
          {/* <div className={styles.pokemonName} >{pokemon.name}</div> */}
          <div className={styles.imageContainerf}>
            <div className={styles.pokemonImage}>
              {pokemon.sprite && !imageError ? (
                <img 
                  // src={`/images/pokemon/${pokemon.id}.png`}
                  // alt={pokemon.name}
                  src = "/Poké_Ball_icon.svg.png"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.placeholder}>{pokemon.name.charAt(0)}</div>
              )}
            </div>
          </div>
          {/* <div className={styles.typeBadgesf}>
            {pokemon.type.split('/').map(type => (
              <span 
                key={type}
                className={styles.typeBadge}
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div> */}
        </div>
        
        {/* Back of Card (Stats) */}
        <div className={styles.cardBack}>
          <div className={styles.header}>
            <h3 className={styles.pokemonName}>{pokemon.name}</h3>
          </div>
          
          <div className={styles.topSection}>
            <div className={styles.imageContainer}>
              {pokemon.sprite && !imageError ? (
                <img 
                  src={`/images/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className={styles.pokemonImage}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.placeholder}>{pokemon.name.charAt(0)}</div>
              )}
            </div>
            
            <div className={styles.metaData}>
              <div className={styles.pokemonId}>{pokemon.id}.</div>
              <div className={styles.typeBadges}>
                {pokemon.type.split('/').map(type => (
                  <span 
                    key={type}
                    className={styles.typeBadge}
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statsGrid}>
              {Object.entries(pokemon.stats).map(([stat, value]) => (
                <div 
                  key={stat}
                  className={`${styles.statCell} ${selectedStat === stat || aiSelectedStat === stat ? styles.selectedStat : ''}`}
                  style={{ backgroundColor: statColors[stat] }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatClick(stat);
                  }}
                >
                  <div className={styles.statValue}>{value}</div>
                  <div className={styles.statName}>{stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}