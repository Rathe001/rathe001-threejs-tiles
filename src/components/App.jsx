import { Canvas } from '@react-three/fiber';
import Scene from 'components/Scene';

const App = () => (
  <Canvas
    gl={{ antialias: false }}
    pixelRatio={window.devicePixelRatio}
    colorManagement
    shadowMap
    camera={{ fov: 45 }}
  >
    <Scene />
  </Canvas>
);

export default App;
