import React from 'react';
import { Plane } from '@react-three/drei';
import HomeWallContent from './HomeWallContent';
import * as THREE from 'three';

const TestHomeWall = () => {
  const wallWidth = 9.5;
  const wallHeight = 7.5;

  const borderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#ffff00') }, // Yellow
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
        float borderWidth = 0.005;
        float cornerRadius = 0.05;
        float margin = 0.025;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius + margin;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float alpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 10.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  return (
    <group position={[0, 0, -8.66]}>
      <Plane args={[wallWidth, wallHeight]} position={[0, 0, -0.01]}>
        <meshBasicMaterial color="#000000" opacity={0.1} transparent />
      </Plane>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[wallWidth, wallHeight]} />
        <primitive object={borderMaterial} attach="material" />
      </mesh>
      <group position={[0, 0, 0.01]} scale={[0.01, 0.01, 0.01]}>
        <HomeWallContent />
      </group>
    </group>
  );
};

export default TestHomeWall;
