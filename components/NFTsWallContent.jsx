import React from 'react';
import { Html } from '@react-three/drei';
import styles from './WallContent.module.css';

const NFTsWallContent = ({ onCameraRotate }) => {
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
        <h1 className={styles.title}>BUX NFTs</h1>
        <div className={styles.content}>
          <p>Explore unique digital assets in the BUX ecosystem.</p>
          <ul>
            <li>Exclusive BUX DAO NFT collections</li>
            <li>NFT staking for additional rewards</li>
            <li>Community-driven NFT marketplace</li>
            <li>Regular NFT drops and events</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <p>Discover the world of BUX NFTs</p>
        </div>
      </div>
    </Html>
  );
};

export default NFTsWallContent;
