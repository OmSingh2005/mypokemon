"use client";
import Link from 'next/link';
import { useState } from 'react';
import '../app/globals.css';

export default function Home() {
  const [showRules, setShowRules] = useState(false);

  return (
    <main className="container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Game Title Card */}
      <div className="card" style={{ 
        textAlign: 'center',
        backgroundColor: '#ff5350',
        color: 'white',
        padding: '30px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Poké Battle!</h1>
        <p style={{ fontSize: '1.2rem' }}>The Ultimate Stat Showdown</p>
      </div>

      {/* Game Mode Selection */}
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Choose Game Mode</h2>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <Link href="/game/ai" style={{ textDecoration: 'none' }}>
            <button className="button" style={{ width: '100%' }}>
              Battle Against Dexter (AI)
            </button>
          </Link>
          <Link href="/game/local" style={{ textDecoration: 'none' }}>
            <button className="button" style={{ 
              width: '100%', 
              backgroundColor: 'var(--secondary)'
            }}>
              Local 2-Player Battle
            </button>
          </Link>
        </div>
      </div>

      {/* Rules Toggle Button */}
      <div className="card">
        <button 
          className="button" 
          style={{ 
            width: '100%',
            backgroundColor: 'var(--accent)',
            color: 'var(--text)'
          }}
          onClick={() => setShowRules(!showRules)}
        >
          {showRules ? 'Hide Rules' : 'Show Rules'}
        </button>
        
        {/* Rules Content - Shows when button is clicked */}
        {showRules && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>How to Play:</h3>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.5' }}>
              <li>Each player receives 26 random Pokémon cards</li>
              <li>On your turn, select one of the six stats to battle with</li>
              <li>The Pokémon with the higher stat wins the round</li>
              <li>The winner collects the loser&apos;s card</li>
              <li>The player who collects all cards wins!</li>
            </ol>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '20px', textAlign: 'center', opacity: '0.7' }}>
        <p>A nostalgic Pokémon card battle experience</p>
      </div>
    </main>
  );
}