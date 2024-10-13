import React from 'react';
import { Text, Plane, Html } from '@react-three/drei';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

const TestHomeWall = () => {
  const wallWidth = 9.5;
  const wallHeight = 7.5;

  const handleSocialClick = (platform) => {
    console.log(`${platform} clicked`);
    if (platform === 'discord') {
      window.open('https://discord.gg/your-discord-link', '_blank');
    } else if (platform === 'twitter') {
      window.open('https://twitter.com/your-twitter-handle', '_blank');
    }
  };

  const textProps = {
    fontSize: 0.25,
    maxWidth: wallWidth - 1,
    lineHeight: 1.5,
    textAlign: 'center',
    anchorX: 'center',
    // Removed the font property to use the default font
  };

  return (
    <group>
      <Plane args={[wallWidth, wallHeight]} position={[0, 0, -0.01]}>
        <meshBasicMaterial color="#000000" opacity={0.8} transparent />
      </Plane>
      <group position={[0, 0, 0.01]}>
        <Text
          {...textProps}
          position={[0, wallHeight / 2 - 0.5, 0]}
          fontSize={0.5}
          color="#00ffff"
          anchorY="top"
        >
          Welcome to BUX DAO
        </Text>
        <Text
          {...textProps}
          position={[0, 1.5, 0]}
          color="white"
          anchorY="top"
        >
          We are a community owned enterprise, offering our members a variety of holder benefits designed to generate passive income.{'\n\n'}
          Our $BUX token is backed by our community liquidity pool allowing holders to cash out the tokens they earn.
        </Text>
        <Text
          {...textProps}
          position={[0, -0.5, 0]}
          color="white"
          anchorY="middle"
        >
          Join our discord for more info on giveaways, raffles, poker events and more…
        </Text>
        <Html
          position={[0, -1.2, 0]}
          transform
          occlude
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FaDiscord
            size="0.5"
            style={{ marginRight: '0.2em', cursor: 'pointer' }}
            onClick={() => handleSocialClick('discord')}
          />
          <FaTwitter
            size="0.5"
            style={{ cursor: 'pointer' }}
            onClick={() => handleSocialClick('twitter')}
          />
        </Html>
        <Text
          {...textProps}
          position={[0, -wallHeight / 2 + 0.5, 0]}
          fontSize={0.4}
          color="#ff00ff"
          anchorY="bottom"
        >
          Find out how you can start earning.
        </Text>
      </group>
    </group>
  );
};

export default TestHomeWall;
