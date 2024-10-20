import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import WalletConnection from './WalletConnection'
import ErrorBoundary from './ErrorBoundary'
import styles from '../styles/globals.css'

const ROOM_RADIUS = 10
const ROOM_HEIGHT = 8
const WALL_COUNT = 6
const ACTIVE_WALL_SCALE = 1.1 // Scale factor for the active wall
const CAMERA_DISTANCE = 0.6 // Adjusted to fill about 60% of screen width
const CAMERA_FOV = 50 // Adjusted field of view

const Wall = React.forwardRef(({ position, rotation, size, text, color, isActive }, ref) => {
  const scale = isActive ? [ACTIVE_WALL_SCALE, 1, 1] : [1, 1, 1]
  
  return (
    <mesh position={position} rotation={rotation} ref={ref} scale={scale}>
      <planeGeometry args={size} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={isActive ? 0.5 : 0.2}
        side={THREE.DoubleSide}
      />
      <Html position={[0, 0, 0.1]} transform occlude>
        <div className={`text-white text-4xl font-bold ${styles['vr-wall-content']}`}>{text}</div>
      </Html>
    </mesh>
  )
})

Wall.displayName = 'Wall'

function VRScene({ currentWall }) {
  const { camera } = useThree()
  const [error, setError] = useState(null)

  const walls = [
    { name: 'Home', color: '#00ffff' },
    { name: 'Shop', color: '#ff00ff' },
    { name: 'Spades', color: '#00ff00' },
    { name: 'Poker', color: '#ff0000' },
    { name: 'NFTs', color: '#ffff00' },
    { name: 'BUX', color: '#ff8000' },
  ]

  const wallWidth = 2 * ROOM_RADIUS * Math.sin(Math.PI / WALL_COUNT)
  const inRadius = ROOM_RADIUS * Math.cos(Math.PI / WALL_COUNT)

  useEffect(() => {
    const currentWallIndex = walls.findIndex(wall => wall.name === currentWall)
    if (currentWallIndex !== -1) {
      const angle = (currentWallIndex / WALL_COUNT) * 2 * Math.PI
      const cameraX = Math.cos(angle) * inRadius * CAMERA_DISTANCE
      const cameraZ = Math.sin(angle) * inRadius * CAMERA_DISTANCE
      camera.position.set(cameraX, 0, cameraZ)
      camera.lookAt(Math.cos(angle) * inRadius, 0, Math.sin(angle) * inRadius)
    }
  }, [currentWall, camera, walls, inRadius])

  if (error) {
    return <Html center>{error}</Html>
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, ROOM_HEIGHT/2, 0]} intensity={0.8} />
      {walls.map((wall, index) => {
        const angle = (index / WALL_COUNT) * 2 * Math.PI
        const x = inRadius * Math.cos(angle)
        const z = inRadius * Math.sin(angle)
        return (
          <Wall 
            key={wall.name}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            size={[wallWidth, ROOM_HEIGHT]}
            text={wall.name}
            color={wall.color}
            isActive={currentWall === wall.name}
          >
            <Html transform occlude>
              <div className={styles['vr-wall-content']}>
                {/* Your wall content goes here */}
                <h2>{wall.name} Content</h2>
                <button className={styles['vr-wall-interactive']}>Interactive Button</button>
              </div>
            </Html>
          </Wall>
        )
      })}
      <mesh position={[0, -ROOM_HEIGHT/2, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[ROOM_RADIUS, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, ROOM_HEIGHT/2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <circleGeometry args={[ROOM_RADIUS, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <Html center>
        <div style={{color: 'white'}}>Debug: Current Wall - {currentWall}</div>
      </Html>
    </>
  )
}

function VRWarehouse({ currentWall, setCurrentWall }) {
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && controlsRef.current) {
      canvas.style.touchAction = 'none'; // Prevents default touch actions

      const handleStart = (e) => {
        if (e.target.closest(`.${styles['vr-wall-interactive']}`)) {
          return;
        }
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        lastPositionRef.current = { x: clientX, y: clientY };
      };

      const handleMove = (e) => {
        if (!isDragging) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - lastPositionRef.current.x;
        const deltaY = clientY - lastPositionRef.current.y;
        
        controlsRef.current.rotateLeft(deltaX * 0.005);
        controlsRef.current.rotateUp(deltaY * 0.005);
        
        lastPositionRef.current = { x: clientX, y: clientY };

        // Prevent default behavior to avoid scrolling
        e.preventDefault();
      };

      const handleEnd = () => {
        setIsDragging(false);
      };

      canvas.addEventListener('mousedown', handleStart);
      canvas.addEventListener('touchstart', handleStart, { passive: false });
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
      canvas.addEventListener('mouseleave', handleEnd);

      return () => {
        canvas.removeEventListener('mousedown', handleStart);
        canvas.removeEventListener('touchstart', handleStart);
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchend', handleEnd);
        canvas.removeEventListener('mouseleave', handleEnd);
      };
    }
  }, [isDragging]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }} className={styles['vr-draggable']}>
      <ErrorBoundary>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, ROOM_RADIUS * CAMERA_DISTANCE], fov: CAMERA_FOV }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000')
          }}
        >
          <group>
            <VRScene currentWall={currentWall} />
            <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} />
          </group>
        </Canvas>
      </ErrorBoundary>
      <div style={{ position: 'absolute', top: 10, right: 10 }} className={styles['vr-wall-interactive']}>
        <WalletConnection />
      </div>
    </div>
  )
}

export default VRWarehouse
