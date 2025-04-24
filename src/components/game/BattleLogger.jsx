import { useState } from 'react';
import styles from './Logger.module.css';

export default function BattleLogger({ logs }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? 'Hide logs' : 'Show logs'}
      >
        {isVisible ? '✕' : '📜'}
      </button>
      
      <div 
        className={styles.container} 
        style={{ transform: isVisible ? 'translateX(0)' : 'translateX(120%)' }}
      >
        <h3 className={styles.title}>Battle Log</h3>
        <div className={styles.logs}>
          {logs.map((log, index) => (
            <div key={index} className={`${styles.log} ${styles[log.type]}`}>
              <span className={styles.timestamp}>[{log.timestamp}]</span>
              {log.message}
              {log.type === 'win' && ' 🎉'}
              {log.type === 'lose' && ' 💀'}
              {log.type === 'draw' && ' 🤝'}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}