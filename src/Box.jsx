import { useRef } from 'react';
import PropTypes from 'prop-types';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const Box = ({ position }) => {
  const mesh = useRef(null);
  // const [active, setActive] = useState(false);
  // const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, 'textures/stone.jpeg');

  return (
    <mesh
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial map={texture} transparent opacity={0} side={THREE.DoubleSide} attach="material" />
      <meshStandardMaterial map={texture} transparent opacity={0} side={THREE.DoubleSide} attach="material" />
      <meshStandardMaterial map={texture} transparent opacity={0} side={THREE.DoubleSide} attach="material" />
      <meshStandardMaterial map={texture} transparent opacity={0.5} side={THREE.DoubleSide} attach="material" />
      <meshStandardMaterial map={texture} transparent opacity={0.5} side={THREE.DoubleSide} attach="material" />
      <meshStandardMaterial map={texture} transparent opacity={0.5} side={THREE.DoubleSide} attach="material" />
    </mesh>

  );
};

Box.propTypes = {
  position: PropTypes.number.isRequired,
};

export default Box;
