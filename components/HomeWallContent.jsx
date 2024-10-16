import React from 'react';
import { Html } from '@react-three/drei';
import Image from 'next/image';
import styles from './HomeWallContent.module.css';

const HomeWallContent = () => {
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
        <div className={styles.logoContainerWrapper}>
          <div className={styles.logoContainer}>
            <span className={styles.welcomeText}>Welcome to</span>
            <div className={styles.logoWrapper}>
              <div className={styles.logoBackground}>
                <Image src="/images/logo.png" alt="BUX DAO Logo" width={160} height={160} />
              </div>
              <span className={styles.logoText}>BUX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DAO</span>
            </div>
            <i className={`fas fa-info-circle ${styles.infoIcon}`}></i>
          </div>
        </div>
        <div className={styles.mainContent}>
          <p>
            We are a community owned enterprise, providing our holding members with a variety of benefits designed to generate passive income.
          </p>
          <br />
          <p>Our $BUX token is backed by our community liquidity pool allowing holders to cash out the tokens they earn.</p>
        </div>
        <div className={styles.socialLinks}>
          <div className={styles.socialButtons}>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialButton} aria-label="Join our Discord server">
              <i className="fab fa-discord" aria-hidden="true"></i>
              <span className={styles.tooltip}>Join Discord</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialButton} aria-label="Follow us on Twitter">
              <i className="fab fa-twitter" aria-hidden="true"></i>
              <span className={styles.tooltip}>Follow on Twitter</span>
            </a>
          </div>
        </div>
        <div className={styles.footer}>
          <p>Find out how you can start earning TODAY!</p>
        </div>
      </div>
    </Html>
  );
};

export default HomeWallContent;
