import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { levelMap } from '../../constants/cubicLevel';

function Tile({ cubeId, position }) {
  const mesh = useRef(null);
  const [active, setActive] = useState(true);
  const [aluminumTexture] = useLoader(TextureLoader, [
    'textures/stone1.jpeg',
  ]);

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
      <boxBufferGeometry attach="geometry" args={[1, 0.75, 1]} />
      <meshStandardMaterial map={aluminumTexture} displacementMap={aluminumTexture} attach="material" />
      <meshStandardMaterial map={aluminumTexture} attach="material" metalness={1} />
      <meshStandardMaterial map={aluminumTexture} attach="material" metalness={1} />
      <meshStandardMaterial map={aluminumTexture} attach="material" metalness={1} />
      <meshStandardMaterial map={aluminumTexture} attach="material" metalness={1} />
      <meshStandardMaterial map={aluminumTexture} attach="material" metalness={1} />
    </mesh>

  );
}

Tile.propTypes = {
  cubeId: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Tile;
