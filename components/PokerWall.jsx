import React from 'react';
import PokerWallContent from './PokerWallContent';
import * as THREE from 'three';

const PokerWall = ({ position, rotation, onCameraRotate }) => {
  const wallWidth = 9.5;
  const wallHeight = 7.5;

  const borderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#ff0000') }, // Neon Red
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[wallWidth, wallHeight]} />
        <primitive object={borderMaterial} attach="material" />
      </mesh>
      <group position={[0, 0, 0.01]}>
        <PokerWallContent onCameraRotate={onCameraRotate} />
      </group>
    </group>
  );
};

export default PokerWall;
