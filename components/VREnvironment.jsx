import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import HomeWall from './HomeWall';
import BUXWall from './BUXWall';
import NFTsWall from './NFTsWall';
import PokerWall from './PokerWall';
import SpadesWall from './SpadesWall';
import ShopWall from './ShopWall';
import WebGLErrorBoundary from './WebGLErrorBoundary';

// Custom ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

const Wall = ({ position, rotation, content }) => {
  return (
    <group position={position} rotation={rotation}>
      <Text
        position={[0, 0, 0.02]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {content}
      </Text>
    </group>
  );
};

const GridPlane = ({ position, rotation }) => {
  const meshRef = useRef();
  const textureRef = useRef();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;

    const gridSize = 32;
    for (let i = 0; i <= 512; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    textureRef.current = texture;

    if (meshRef.current) {
      meshRef.current.material.map = texture;
      meshRef.current.material.needsUpdate = true;
    }
  }, []);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial transparent opacity={0.2} />
    </mesh>
  );
};

const CameraController = ({ setCurrentWall, currentWall, targetRotation, onCameraRotate }) => {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);
  const isAnimating = useRef(false);
  const targetRotationRef = useRef(targetRotation);

  useEffect(() => {
    targetRotationRef.current = targetRotation;
    isAnimating.current = true;
  }, [targetRotation]);

  useEffect(() => {
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);

    const canvas = gl.domElement;

    const onMouseDown = (event) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
      updateCurrentWall();
    };

    const onMouseMove = (event) => {
      if (!isDragging.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.current.x,
        y: event.clientY - previousMousePosition.current.y
      };

      const rotationSpeed = 0.005;
      currentRotation.current -= deltaMove.x * rotationSpeed;
      updateCameraRotation();

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const updateCurrentWall = () => {
      const wallCount = 6;
      const anglePerWall = (Math.PI * 2) / wallCount;
      let nearestWallIndex = Math.round((-currentRotation.current % (Math.PI * 2)) / anglePerWall);
      nearestWallIndex = (nearestWallIndex + wallCount) % wallCount;
      const walls = ['Home', 'BUX', 'NFTs', 'Poker', 'Spades', 'Shop'];
      const newWall = walls[nearestWallIndex];
      if (newWall !== currentWall) {
        setCurrentWall(newWall);
      }
    };

    const updateCameraRotation = () => {
      camera.rotation.y = currentRotation.current;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [camera, gl, setCurrentWall, currentWall]);

  useFrame(() => {
    if (isAnimating.current) {
      const diff = targetRotationRef.current - currentRotation.current;
      const step = Math.sign(diff) * Math.min(Math.abs(diff), 0.05);
      currentRotation.current += step;
      camera.rotation.y = currentRotation.current;

      if (Math.abs(diff) < 0.01) {
        currentRotation.current = targetRotationRef.current;
        isAnimating.current = false;
      }
    }
  });

  return null;
};

const ContextRestorationHandler = () => {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.log('WebGL context lost. Attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
    };

    gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  return null;
};

const VREnvironment = ({ currentWall, setCurrentWall }) => {
  const [mounted, setMounted] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);
  const onCameraRotateRef = useRef(null);

  const handleCameraRotate = useCallback(() => {
    if (onCameraRotateRef.current) {
      onCameraRotateRef.current();
    }
  }, []);

  useEffect(() => setMounted(true), []);

  const radius = 8.66; // Distance from center to each wall (adjusted for hexagon)
  const walls = [
    { id: 1, content: 'Home', angle: 0 },
    { id: 2, content: 'BUX', angle: Math.PI / 3 },
    { id: 3, content: 'NFTs', angle: 2 * Math.PI / 3 },
    { id: 4, content: 'Poker', angle: Math.PI },
    { id: 5, content: 'Spades', angle: 4 * Math.PI / 3 },
    { id: 6, content: 'Shop', angle: 5 * Math.PI / 3 },
  ];

  useEffect(() => {
    const wall = walls.find(w => w.content === currentWall);
    if (wall) {
      setTargetRotation(-wall.angle);
      handleCameraRotate();
    }
  }, [currentWall, handleCameraRotate]);

  if (!mounted) return null;

  return (
    <div className="vr-container" style={{ 
      width: '100%', 
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      <WebGLErrorBoundary>
        <Canvas camera={{ fov: 75, position: [0, 0, 0], near: 0.1, far: 1000 }}>
          <ContextRestorationHandler />
          <CameraController 
            setCurrentWall={setCurrentWall} 
            currentWall={currentWall} 
            targetRotation={targetRotation}
            onCameraRotate={handleCameraRotate}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={0.8} />
          {walls.map((wall) => {
            const x = Math.sin(wall.angle) * radius;
            const z = -Math.cos(wall.angle) * radius;
            if (wall.content === 'Home') {
              return (
                <HomeWall 
                  key={wall.id} 
                  position={[x, 0, z]} 
                  rotation={[0, -wall.angle, 0]} 
                  onCameraRotate={(callback) => {
                    onCameraRotateRef.current = callback;
                  }}
                />
              );
            } else if (wall.content === 'BUX') {
              return (
                <BUXWall
                  key={wall.id}
                  position={[x, 0, z]}
                  rotation={[0, -wall.angle, 0]}
                  onCameraRotate={(callback) => {
                    onCameraRotateRef.current = callback;
                  }}
                />
              );
            } else if (wall.content === 'NFTs') {
              return (
                <NFTsWall
                  key={wall.id}
                  position={[x, 0, z]}
                  rotation={[0, -wall.angle, 0]}
                  onCameraRotate={(callback) => {
                    onCameraRotateRef.current = callback;
                  }}
                />
              );
            } else if (wall.content === 'Poker') {
              return (
                <PokerWall
                  key={wall.id}
                  position={[x, 0, z]}
                  rotation={[0, -wall.angle, 0]}
                  onCameraRotate={(callback) => {
                    onCameraRotateRef.current = callback;
                  }}
                />
              );
            } else if (wall.content === 'Spades') {
              return (
                <SpadesWall
                  key={wall.id}
                  position={[x, 0, z]}
                  rotation={[0, -wall.angle, 0]}
                  onCameraRotate={(callback) => {
                    onCameraRotateRef.current = callback;
                  }}
                />
              );
            } else if (wall.content === 'Shop') {
              return (
                <ShopWall
                  key={wall.id}
                  position={[x, 0, z]}
                  rotation={[0, -wall.angle, 0]}
                  onCameraRotate={(callback) => {
                    onCameraRotateRef.current = callback;
                  }}
                />
              );
            }
          })}
          <GridPlane position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <GridPlane position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

export default VREnvironment;
