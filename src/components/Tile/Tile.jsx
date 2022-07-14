import { useRef } from 'react';
import PropTypes from 'prop-types';
import { extend, useLoader } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { levelMap } from '../../constants/cubicLevel';
// import robotoFont from '../../fonts/Roboto/Roboto_Regular.json';

setTimeout(() => extend({ TextGeometry }), 0);

function Tile({ cubeId, position }) {
  // const font = new FontLoader().parse(robotoFont);
  const mesh = useRef(null);
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
  return levelMap?.[cubeId]?.isPassable !== true && (
  <>
    <mesh
      castShadow
      receiveShadow
      position={position}
      ref={mesh}
      cube={levelMap[cubeId]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 0.75, 1]} />
      <meshStandardMaterial map={scifiTexture1} attach="material-0" opacity={0.5} metalness={1} />
      <meshStandardMaterial map={scifiTexture2} attach="material-1" opacity={0.5} metalness={1} />
      <meshStandardMaterial map={scifiTexture3} attach="material-2" opacity={0.5} metalness={1} />
      <meshStandardMaterial map={scifiTexture5} attach="material-3" opacity={0.5} metalness={1} />
      <meshStandardMaterial map={scifiTexture4} attach="material-4" opacity={0.5} metalness={1} />
      <meshStandardMaterial map={scifiTexture4} attach="material-5" opacity={0.5} metalness={1} />
    </mesh>
    {/*
    <mesh
      position={position}
    >
      <textGeometry args={[String(cubeId), { font, height: 0.1, size: 0.1 }]} />
      <meshPhysicalMaterial attach="material" color="red" />
    </mesh>
  */}
  </>
  );
}

Tile.propTypes = {
  cubeId: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Tile;
