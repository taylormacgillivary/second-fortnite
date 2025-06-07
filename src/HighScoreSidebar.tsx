import React from 'react';
import styles from './HighScoreSidebar.module.css';

export interface Score {
  name: string;
  score: number;
}

interface HighScoreSidebarProps {
  scores: Score[];
}

const HighScoreSidebar: React.FC<HighScoreSidebarProps> = ({ scores }) => {
  return (
    <div className={styles.highScoreSidebar}>
      <h2>High Scores</h2>
      <ol>
        {scores.map((score, index) => (
          <li key={index}>
            <span>{score.name}</span>
            <span>{score.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HighScoreSidebar; 