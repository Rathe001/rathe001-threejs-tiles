import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Camera = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      camera.position.set(5, 5, 5);
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      controls.fov = 15;

      return () => {
        controls.dispose();
      };
    },
    [camera, gl],
  );
  return null;
};

export default Camera;
