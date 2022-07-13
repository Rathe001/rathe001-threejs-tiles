import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import getFacing from '../../constants/getFacing';

const getRotationRadians = (rotations) => Math.PI * (rotations / 2);

function Camera({
  fov, rotation, x, y, z,
}) {
  const cameraRef = useRef(null);
  const cameraOffset = 0.80;
  let adjustedX = x;
  const adjustedY = y * 0.75;
  let adjustedZ = z;
  if (getFacing(rotation) === 'N') adjustedZ += cameraOffset;
  if (getFacing(rotation) === 'S') adjustedZ -= cameraOffset;
  if (getFacing(rotation) === 'E') adjustedX -= cameraOffset;
  if (getFacing(rotation) === 'W') adjustedX += cameraOffset;

  const positionVec1 = new THREE.Vector3(adjustedX, adjustedY, adjustedZ);

  useFrame(() => {
    cameraRef.current.position.lerp(positionVec1, 0.6);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      rotation={[0, getRotationRadians(rotation), 0]}
      fov={fov}
      near={1}
      far={1000}
    >
      <pointLight
        decay={2}
        distance={5}
        intensity={2}
      />
    </PerspectiveCamera>
  );
}

Camera.propTypes = {
  fov: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number.isRequired,
};

export default Camera;
