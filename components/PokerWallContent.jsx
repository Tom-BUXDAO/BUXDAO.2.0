import React from 'react';
import { Html } from '@react-three/drei';
import styles from './WallContent.module.css';

const PokerWallContent = ({ onCameraRotate }) => {
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
        <h1 className={styles.title}>BUX Poker</h1>
        <div className={styles.content}>
          <p>Experience the thrill of poker in the BUX ecosystem.</p>
          <ul>
            <li>Daily tournaments with BUX token prizes</li>
            <li>Exclusive VIP tables for high-stakes players</li>
            <li>Learn-to-play sessions for beginners</li>
            <li>Monthly championship events</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <p>Join the BUX Poker community today!</p>
        </div>
      </div>
    </Html>
  );
};

export default PokerWallContent;
