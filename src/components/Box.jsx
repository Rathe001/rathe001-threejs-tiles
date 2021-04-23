import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { levelMap } from 'constants/cubicLevel';

const Box = ({ cubeId, position }) => {
  const mesh = useRef(null);
  const [active, setActive] = useState(true);
  // const [hovered, setHovered] = useState(false);
  const dirtTexture = useLoader(TextureLoader, 'textures/mc-dirt.jpeg');
  const grassTexture = useLoader(TextureLoader, 'textures/mc-grass.png');

  return active && (
    <mesh
      castShadow
      receiveShadow
      position={position}
      ref={mesh}
      cube={levelMap[cubeId]}
      onClick={(e) => {
        e.stopPropagation();
        setActive((state) => !state);
      }}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial map={dirtTexture} transparent opacity={1} side={THREE.DoubleSide} attachArray="material" />
      <meshStandardMaterial map={dirtTexture} transparent opacity={1} side={THREE.DoubleSide} attachArray="material" />
      <meshStandardMaterial map={grassTexture} transparent opacity={1} side={THREE.DoubleSide} attachArray="material" />
      <meshStandardMaterial map={dirtTexture} transparent opacity={1} side={THREE.DoubleSide} attachArray="material" />
      <meshStandardMaterial map={dirtTexture} transparent opacity={1} side={THREE.DoubleSide} attachArray="material" />
      <meshStandardMaterial map={dirtTexture} transparent opacity={1} side={THREE.DoubleSide} attachArray="material" />
    </mesh>

  );
};

Box.propTypes = {
  cubeId: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Box;
