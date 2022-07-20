import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';
import getFacing from '../../constants/getFacing';

const getRotationRadians = (rotations) => Math.PI * (rotations * 0.5);

function Camera({
  fov, lightLevel, rotation, x, y, z,
}) {
  const cameraRef = useRef(null);
  const cameraOffset = 0.60;
  let adjustedX = x;
  const adjustedY = y * 0.75;
  let adjustedZ = z;
  if (getFacing(rotation) === 'N') adjustedZ += cameraOffset;
  if (getFacing(rotation) === 'S') adjustedZ -= cameraOffset;
  if (getFacing(rotation) === 'E') adjustedX -= cameraOffset;
  if (getFacing(rotation) === 'W') adjustedX += cameraOffset;

  const positionVec1 = new Vector3(adjustedX, adjustedY, adjustedZ);

  useFrame(() => {
    cameraRef.current.position.lerp(positionVec1, 0.2);
    if (cameraRef.current.rotation.y < getRotationRadians(rotation)) {
      cameraRef.current.rotation.x = 0;
      cameraRef.current.rotation.z = 0;
      cameraRef.current.rotation.y += getRotationRadians(0.08);
      if (cameraRef.current.rotation.y > getRotationRadians(rotation)) {
        cameraRef.current.rotation.y = getRotationRadians(rotation);
      }
    }
    if (cameraRef.current.rotation.y > getRotationRadians(rotation)) {
      cameraRef.current.rotation.x = 0;
      cameraRef.current.rotation.z = 0;
      cameraRef.current.rotation.y -= getRotationRadians(0.08);
      if (cameraRef.current.rotation.y < getRotationRadians(rotation)) {
        cameraRef.current.rotation.y = getRotationRadians(rotation);
      }
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      // rotation={[-0.01, getRotationRadians(rotation), 0]}
      // position={[adjustedX, adjustedY, adjustedZ]}
      fov={fov}
      near={0.3}
      far={1000}
    >
      <pointLight
        decay={2}
        distance={lightLevel}
        intensity={lightLevel}
      />
    </PerspectiveCamera>
  );
}

Camera.propTypes = {
  fov: PropTypes.number.isRequired,
  lightLevel: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number.isRequired,
};

export default Camera;
