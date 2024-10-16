import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import Image from 'next/image';
import styles from './HomeWallContent.module.css';

const HomeWallContent = ({ onCameraRotate }) => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showDiscordPopup, setShowDiscordPopup] = useState(false);
  const [showTwitterPopup, setShowTwitterPopup] = useState(false);

  useEffect(() => {
    const handleCameraRotate = () => {
      setShowInfoPopup(false);
      setShowDiscordPopup(false);
      setShowTwitterPopup(false);
    };

    onCameraRotate(handleCameraRotate);

    return () => {
      onCameraRotate(null);
    };
  }, [onCameraRotate]);

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
                <Image src="/images/logo.png" alt="BUX DAO Logo" width={141} height={141} />
              </div>
              <span className={styles.logoText}>BUX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DAO</span>
            </div>
            <div className={styles.infoIconWrapper}>
              <i 
                className={`fas fa-info-circle ${styles.infoIcon}`}
                onClick={() => setShowInfoPopup(!showInfoPopup)}
              ></i>
            </div>
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
            <button 
              onClick={() => setShowDiscordPopup(!showDiscordPopup)}
              className={styles.socialButton} 
              aria-label="Join our Discord server"
            >
              <i className="fab fa-discord" aria-hidden="true"></i>
            </button>
            <button 
              onClick={() => setShowTwitterPopup(!showTwitterPopup)}
              className={styles.socialButton} 
              aria-label="Follow us on Twitter"
            >
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          <p>Find out how you can start earning TODAY!</p>
        </div>
      </div>
      {showInfoPopup && (
        <div className={styles.infoPopup}>
          <p className={styles.infoPopupContent}>
            "A decentralized autonomous organization (DAO) is a blockchain governance system developed to distribute decision-making, management, and entity ownership."
          </p>
          <p className={styles.infoSource}>- Investopedia</p>
        </div>
      )}
      {showDiscordPopup && (
        <div className={styles.discordPopup}>
          <div className={styles.discordPopupContent}>
            <p>Join our discord server to receive daily eBUX server points.</p>
            <p>Use them to enter raffles to win free NFTs.</p>
            <p>Take part in community poker league.</p>
          </div>
          <a 
            href="https://discord.gg/your-discord-link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.discordCTA}
          >
            Join Discord Server
          </a>
        </div>
      )}
      {showTwitterPopup && (
        <div className={styles.twitterPopup}>
          <div className={styles.twitterPopupContent}>
            <p>Follow our official page</p>
            <span className={styles.twitterLink}>
              https://x.com/buxdao
            </span>
          </div>
          <a 
            href="https://x.com/buxdao" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.twitterCTA}
          >
            Go to X
          </a>
        </div>
      )}
    </Html>
  );
};

export default HomeWallContent;
