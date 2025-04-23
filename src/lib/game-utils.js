// src/lib/game-utils.js

// Function to determine winner between two stats
export function determineWinner(playerStatValue, aiStatValue) {
    if (playerStatValue > aiStatValue) {
      return 'player';
    } else if (playerStatValue < aiStatValue) {
      return 'ai';
    } else {
      return 'draw';
    }
  }
  
  // AI difficulty levels for stat selection
  export const aiSelectStat = (aiCard, playerDeck, difficulty = 'easy') => {
    const stats = Object.keys(aiCard.stats);
    
    switch (difficulty) {
      case 'easy':
        // Easy: Random stat selection
        return stats[Math.floor(Math.random() * stats.length)];
        
      case 'hard':
        // Hard: Analyze player's deck to find strengths/weaknesses
        if (!playerDeck || playerDeck.length === 0) {
          return stats[Math.floor(Math.random() * stats.length)];
        }
        
        // Calculate average stats of player's deck
        const deckStats = {};
        stats.forEach(stat => {
          deckStats[stat] = playerDeck.reduce((sum, card) => sum + card.stats[stat], 0) / playerDeck.length;
        });
        
        // Find stat where AI card has highest advantage over player's average
        let bestStat = stats[0];
        let bestAdvantage = aiCard.stats[bestStat] - deckStats[bestStat];
        
        stats.forEach(stat => {
          const advantage = aiCard.stats[stat] - deckStats[stat];
          if (advantage > bestAdvantage) {
            bestStat = stat;
            bestAdvantage = advantage;
          }
        });
        
        return bestStat;
        
      case 'nightmare':
        // Nightmare: Always pick the AI's highest stat
        return stats.reduce((bestStat, currentStat) => 
          aiCard.stats[currentStat] > aiCard.stats[bestStat] ? currentStat : bestStat, 
          stats[0]
        );
        
      default:
        return stats[Math.floor(Math.random() * stats.length)];
    }
  };
  
  // Calculate win probability for a given stat
  export function calculateWinProbability(stat, playerCard, opponentDeck) {
    if (!opponentDeck || opponentDeck.length === 0 || !playerCard) return 0;
    
    const playerStatValue = playerCard.stats[stat];
    
    // Count how many opponent cards the player would beat with this stat
    const winsCount = opponentDeck.filter(card => playerStatValue > card.stats[stat]).length;
    
    // Calculate win percentage
    return (winsCount / opponentDeck.length) * 100;
  }
  
  // Generate a sassy taunt from the AI opponent
  export function getAiTaunt(result) {
    const taunts = {
      win: [
        "Is that all you've got, Trainer?",
        "Your Pokémon needs more training!",
        "Calculating your defeat was simple.",
        "My algorithms predicted that outcome!",
        "Back to Pokémon School for you!"
      ],
      lose: [
        "Impossible! My circuits must be glitching...",
        "You got lucky this time, human.",
        "I'll analyze this defeat for future victories.",
        "Even a Magikarp could have done better than me...",
        "*Sad beeping noises*"
      ],
      draw: [
        "A draw? How statistically improbable!",
        "You're more skilled than my data predicted.",
        "Let's call it a practice round, shall we?",
        "My processors demand a rematch!",
        "Neither victory nor defeat. How unsatisfying."
      ]
    };
    
    const category = taunts[result] || taunts.draw;
    return category[Math.floor(Math.random() * category.length)];
  }
  
  // Add sound effect utilities
  export const playSoundEffect = (soundName) => {
    // This is just a placeholder - you'll need to implement actual sound playing
    // Either using HTML5 Audio API or a library
    const sounds = {
      cardFlip: '/sounds/card-flip.mp3',
      victory: '/sounds/victory.mp3',
      defeat: '/sounds/defeat.mp3',
      draw: '/sounds/draw.mp3',
      select: '/sounds/select.mp3'
    };
    
    if (typeof window !== 'undefined' && sounds[soundName]) {
      const audio = new Audio(sounds[soundName]);
      audio.play().catch(e => console.log('Sound play error:', e));
    }
  };
  
  // Add animation utilities
  export const animationClasses = {
    cardEntrance: 'animate-card-entrance',
    cardExit: 'animate-card-exit',
    cardFlip: 'animate-card-flip',
    statPulse: 'animate-stat-pulse',
    victory: 'animate-victory',
    defeat: 'animate-defeat'
  };