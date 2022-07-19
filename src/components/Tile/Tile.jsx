import { useRef } from 'react';
import PropTypes from 'prop-types';

function Tile({ position, textures, tile }) {
  const mesh = useRef(null);

  /**
 * Left, right, bottom, top, front, back
 */
  return tile?.isVisible && (
  <mesh
    castShadow
    receiveShadow
    position={position}
    ref={mesh}
  >
    <boxBufferGeometry attach="geometry" args={[1, 0.75, 1]} />
    <meshStandardMaterial map={textures[tile.textures[0]]} attach="material-0" metalness={1} />
    <meshStandardMaterial map={textures[tile.textures[1]]} attach="material-1" metalness={1} />
    <meshStandardMaterial map={textures[tile.textures[2]]} attach="material-2" metalness={1} />
    <meshStandardMaterial map={textures[tile.textures[3]]} attach="material-3" metalness={1} />
    <meshStandardMaterial map={textures[tile.textures[4]]} attach="material-4" metalness={1} />
    <meshStandardMaterial map={textures[tile.textures[5]]} attach="material-5" metalness={1} />
  </mesh>
  );
}

Tile.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  textures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tile: PropTypes.shape({
    isVisible: PropTypes.bool,
    textures: PropTypes.arrayOf(PropTypes.number),
  }),
};

Tile.defaultProps = {
  tile: undefined,
};

export default Tile;
