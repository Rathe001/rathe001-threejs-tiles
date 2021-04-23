import { Suspense } from 'react';
import Box from 'components/Box';
import Camera from 'components/Camera';
import { Stars } from '@react-three/drei';
import { level } from 'constants/cubicLevel';

const Scene = () => {
  const generateCubicLevel = () => level.map(
    (xRow, x) => xRow.map(
      (yRow, y) => yRow.map(
        (zRow, z) => {
          const xPos = x - (level.length / 2) + 0.5;
          const yPos = y - (level[0].length / 2) + 0.5;
          const zPos = z - (level[0][0].length / 2) + 0.5;
          // console.log(levelMap[zRow]);
          return <Box key={zRow} position={[xPos, yPos, zPos]} cubeId={zRow} />;
        },
      ),
    ),
  );

  return (
    <>
      <Camera />
      <fog attach="fog" args={['black', 0, 15]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 4, 10]} intensity={1.5} castShadow />
      <pointLight position={[-10, 5, 10]} color="white" intensity={0.3} />
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade
      />
      <Suspense fallback={null}>
        {generateCubicLevel()}
      </Suspense>
    </>
  );
};

export default Scene;
