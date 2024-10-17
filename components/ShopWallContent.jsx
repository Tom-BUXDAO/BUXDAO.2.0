import React from 'react';
import { Html } from '@react-three/drei';
import styles from './WallContent.module.css';

const ShopWallContent = ({ onCameraRotate }) => {
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
        <h1 className={styles.title}>BUX Shop</h1>
        <div className={styles.content}>
          <p>Welcome to the BUX DAO marketplace!</p>
          <ul>
            <li>Exclusive BUX-themed merchandise</li>
            <li>Limited edition NFT collections</li>
            <li>Redeem BUX tokens for real-world items</li>
            <li>Special offers for active community members</li>
          </ul>
        </div>
        <div className={styles.footer}>
          <p>Explore our unique offerings today!</p>
        </div>
      </div>
    </Html>
  );
};

export default ShopWallContent;
