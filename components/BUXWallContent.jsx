import React from 'react';
import { Html } from '@react-three/drei';
import styles from './WallContent.module.css';

const BUXWallContent = ({ onCameraRotate }) => {
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
        <h1 className={styles.title}>BUX Token</h1>
        <div className={styles.content}>
          <p>BUX is the native token of the BUX DAO ecosystem.</p>
          <p>It powers our community-driven initiatives and rewards active participants.</p>
          <ul>
            <li>Governance voting rights</li>
            <li>Staking rewards</li>
            <li>Access to exclusive features</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <p>Learn more about BUX tokenomics</p>
        </div>
      </div>
    </Html>
  );
};

export default BUXWallContent;
