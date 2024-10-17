import React from 'react';
import { Html } from '@react-three/drei';
import styles from './WallContent.module.css';

const SpadesWallContent = ({ onCameraRotate }) => {
  return (
    <Html
      transform
      occlude
      scale={0.288}
      style={{
        width: '950px',
        height: '750px',
      }}
    >
      <div className={styles.wallContent}>
        <h1 className={styles.title}>BUX Spades</h1>
        <div className={styles.content}>
          <p>Enjoy the classic card game of Spades in the BUX ecosystem.</p>
          <ul>
            <li>Play with friends or join random matches</li>
            <li>Compete in daily and weekly tournaments</li>
            <li>Earn BUX tokens for winning games</li>
            <li>Climb the leaderboard and showcase your skills</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <p>Challenge your friends to a game of Spades today!</p>
        </div>
      </div>
    </Html>
  );
};

export default SpadesWallContent;
