import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { levelMap } from '../../constants/cubicLevel';

function Tile({ cubeId, position }) {
  const mesh = useRef(null);
  const [active, setActive] = useState(true);
  const [
    scifiTexture1,
    scifiTexture2,
    scifiTexture3,
    scifiTexture4,
    scifiTexture5,
  ] = useLoader(TextureLoader, [
    'textures/scifi1.png',
    'textures/scifi2.png',
    'textures/scifi3.png',
    'textures/scifi4.png',
    'textures/scifi5.png',
  ]);
  /**
 * Left, right, bottom, top, front, back
 */
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
      <meshStandardMaterial map={scifiTexture1} attach="material-0" metalness={1} />
      <meshStandardMaterial map={scifiTexture2} attach="material-1" metalness={1} />
      <meshStandardMaterial map={scifiTexture3} attach="material-2" metalness={1} />
      <meshStandardMaterial map={scifiTexture5} attach="material-3" metalness={1} />
      <meshStandardMaterial map={scifiTexture4} attach="material-4" metalness={1} />
      <meshStandardMaterial map={scifiTexture4} attach="material-5" metalness={1} />
    </mesh>

  );
}

Tile.propTypes = {
  cubeId: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Tile;
