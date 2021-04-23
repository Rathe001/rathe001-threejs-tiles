import { Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import Box from './Box';

const Scene = () => {
  const { camera, gl: { domElement } } = useThree();
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, 5, 10]} />
      <Suspense fallback={null}>
        <Box position={[-2, -2, 0]} />
        <Box position={[-1, -2, 0]} />
        <Box position={[0, -2, 0]} />
        <Box position={[1, -2, 0]} />
        <Box position={[2, -2, 0]} />

        <Box position={[-2, -1, 0]} />
        <Box position={[-1, -1, 0]} />
        <Box position={[0, -1, 0]} />
        <Box position={[1, -1, 0]} />
        <Box position={[2, -1, 0]} />

        <Box position={[-2, 0, 0]} />
        <Box position={[-1, 0, 0]} />
        <Box position={[0, 0, 0]} />
        <Box position={[1, 0, 0]} />
        <Box position={[2, 0, 0]} />

        <Box position={[-2, 1, 0]} />
        <Box position={[-1, 1, 0]} />
        <Box position={[0, 1, 0]} />
        <Box position={[1, 1, 0]} />
        <Box position={[2, 1, 0]} />

        <Box position={[-2, 2, 0]} />
        <Box position={[-1, 2, 0]} />
        <Box position={[0, 2, 0]} />
        <Box position={[1, 2, 0]} />
        <Box position={[2, 2, 0]} />
      </Suspense>
      <orbitControls args={[camera, domElement]} />
    </>
  );
};

export default Scene;
