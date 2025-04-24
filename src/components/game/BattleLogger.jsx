import styles from './Logger.module.css'; // Updated import

const BattleLogger = ({ logs }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Battle Logs</h3>
      <div className={styles.logs}>
        {logs.map((log, index) => (
          <div key={index} className={`${styles.log} ${styles[log.type]}`}>
            <span className={styles.timestamp}>{log.timestamp}</span>
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleLogger;