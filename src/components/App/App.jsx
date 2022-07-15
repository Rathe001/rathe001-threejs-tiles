import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Stars } from '@react-three/drei';
import { level } from '../../constants/cubicLevel';
import Tile from '../Tile/Tile';
import Camera from '../Camera/Camera';
import useKeyboard from '../../hooks/useKeyboard';
import {
  moveBackward,
  moveForward,
  moveLeft,
  moveRight,
  turnLeft,
  turnRight,
  moveUp,
  moveDown,
  lightLevelIncrease,
  lightLevelDecrease,
} from '../../state/playerSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const playerPosition = useSelector(({ player }) => player.position);
  const lightLevel = useSelector(({ player }) => player.lightLevel);

  const generateCubicLevel = () => level.map(
    (xRow, x) => xRow.map(
      (yRow, y) => yRow.map(
        (zRow, z) => {
          const zPos = -z;
          const yPos = y * 0.75;
          const xPos = x;
          return <Tile key={zRow} position={[xPos, yPos, zPos]} cubeId={zRow} />;
        },
      ),
    ),
  );

  useKeyboard({
    1: () => { dispatch(lightLevelIncrease()); },
    2: () => { dispatch(lightLevelDecrease()); },
    ArrowDown: () => { dispatch(moveBackward()); },
    ArrowLeft: () => { dispatch(turnLeft()); },
    ArrowRight: () => { dispatch(turnRight()); },
    ArrowUp: () => { dispatch(moveForward()); },
    a: () => { dispatch(moveLeft()); },
    d: () => { dispatch(moveRight()); },
    e: () => { dispatch(turnRight()); },
    f: () => { dispatch(moveDown()); },
    q: () => { dispatch(turnLeft()); },
    r: () => { dispatch(moveUp()); },
    s: () => { dispatch(moveBackward()); },
    w: () => { dispatch(moveForward()); },
  });
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: 500, width: 625 }}>
        <Canvas>
          <Camera
            x={playerPosition.x}
            y={playerPosition.y}
            z={playerPosition.z}
            rotation={playerPosition.rotation}
            fov={40}
            lightLevel={lightLevel}
          />
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
          <axesHelper args={[2, 2, 2]} />
        </Canvas>
      </div>
      <div style={{ display: 'flex', 'flex-direction': 'column' }}>
        <button type="button" onClick={() => dispatch(lightLevelIncrease())}>1: Increase light</button>
        <button type="button" onClick={() => dispatch(lightLevelDecrease())}>2: Decrease light</button>
        <button type="button" onClick={() => dispatch(turnLeft())}>Q: Turn left</button>
        <button type="button" onClick={() => dispatch(turnRight())}>E: Turn right</button>
        <button type="button" onClick={() => dispatch(moveForward())}>W: Move forward</button>
        <button type="button" onClick={() => dispatch(moveLeft())}>A: Move left</button>
        <button type="button" onClick={() => dispatch(moveBackward())}>S: Move backward</button>
        <button type="button" onClick={() => dispatch(moveRight())}>D: Move right</button>
        <button type="button" onClick={() => dispatch(moveUp())}>R: Move up</button>
        <button type="button" onClick={() => dispatch(moveDown())}>F: Move down</button>
      </div>
    </div>
  );
}

export default App;
