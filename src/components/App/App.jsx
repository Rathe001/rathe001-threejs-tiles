import { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import textureMap from '../../constants/textureMap';
import Tile from '../Tile/Tile';
import Camera from '../Camera/Camera';
import useKeyboard from '../../hooks/useKeyboard';
import { actions as gameActions } from '../../state/gameSlice';
import getFacing from '../../constants/getFacing';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const {
    rotation, x, y, z,
  } = useSelector(({ game }) => game.player.position);
  const lightLevel = useSelector(({ game }) => game.player.lightLevel);
  const clipping = useSelector(({ game }) => game.player.clipping);
  const level = useSelector(({ game }) => game.level);
  const levelBounds = useSelector(({ game }) => game.bounds[level]);
  const levelMap = useSelector(({ game }) => game.maps[level]);
  const textures = useLoader(TextureLoader, Object.values(textureMap)).map((texture, i) => {
    const output = texture;
    output.anisotropy = 24;
    if (i === 5) {
      // output.wrapS = THREE.RepeatWrapping;
      // output.wrapT = THREE.RepeatWrapping;
      // output.repeat.set(2, 2);
    }
    return output;
  }).reduce((acc, texture, i) => ({
    ...acc,
    [Object.keys(textureMap)[i]]: texture,
  }), {});
  const generateCubicLevel = () => levelBounds?.map(
    (xRow, xIndex) => xRow.map(
      (yRow, yIndex) => yRow.map(
        (zRow, zIndex) => {
          const zPos = -zIndex;
          const yPos = yIndex * 0.75;
          const xPos = xIndex;
          return (
            <Tile
              key={zRow}
              position={[xPos, yPos, zPos]}
              tile={levelMap[zRow]}
              textures={textures}
            />
          );
        },
      ),
    ),
  );

  useKeyboard({
    1: () => dispatch(gameActions.lightLevelIncrease()),
    2: () => dispatch(gameActions.lightLevelDecrease()),
    ArrowDown: () => dispatch(gameActions.moveBackward()),
    ArrowLeft: () => dispatch(gameActions.turnLeft()),
    ArrowRight: () => dispatch(gameActions.turnRight()),
    ArrowUp: () => dispatch(gameActions.moveForward()),
    a: () => dispatch(gameActions.moveLeft()),
    d: () => dispatch(gameActions.moveRight()),
    e: () => dispatch(gameActions.turnRight()),
    f: () => dispatch(gameActions.moveDown()),
    q: () => dispatch(gameActions.turnLeft()),
    r: () => dispatch(gameActions.moveUp()),
    s: () => dispatch(gameActions.moveBackward()),
    w: () => dispatch(gameActions.moveForward()),
  });

  const getTileId = (xPos, yPos, zPos) => levelBounds?.[xPos]?.[yPos]?.[-zPos] ?? '--';

  useEffect(() => {
    dispatch(gameActions.init(1));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: 500, width: 625 }}>
        <Canvas>
          <Camera
            x={x}
            y={y}
            z={z}
            rotation={rotation}
            fov={40}
            lightLevel={lightLevel}
          />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />
          <Suspense fallback={null}>
            {generateCubicLevel()}
          </Suspense>
          <axesHelper args={[2, 2, 2]} />
        </Canvas>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button type="button" onClick={() => dispatch(gameActions.lightLevelIncrease())}>1: Increase light</button>
        <button type="button" onClick={() => dispatch(gameActions.lightLevelDecrease())}>2: Decrease light</button>
        <button type="button" onClick={() => dispatch(gameActions.turnLeft())}>Q: Turn left</button>
        <button type="button" onClick={() => dispatch(gameActions.turnRight())}>E: Turn right</button>
        <button type="button" onClick={() => dispatch(gameActions.moveForward())}>W: Move forward</button>
        <button type="button" onClick={() => dispatch(gameActions.moveLeft())}>A: Move left</button>
        <button type="button" onClick={() => dispatch(gameActions.moveBackward())}>S: Move backward</button>
        <button type="button" onClick={() => dispatch(gameActions.moveRight())}>D: Move right</button>
        <button type="button" onClick={() => dispatch(gameActions.moveUp())}>R: Move up</button>
        <button type="button" onClick={() => dispatch(gameActions.moveDown())}>F: Move down</button>
        <button type="button" onClick={() => dispatch(gameActions.toggleClipping())}>{`Clipping: ${clipping ? 'ON' : 'OFF'}`}</button>
        <table>
          <tbody>
            <tr>
              <td />
              <td>{`N: ${getTileId(x, y, z - 1)}`}</td>
              <td />
              <td>{`U: ${getTileId(x, y + 1, z)}`}</td>
            </tr>
            <tr>
              <td>{`W: ${getTileId(x - 1, y, z)}`}</td>
              <td>{getTileId(x, y, z)}</td>
              <td>{`E: ${getTileId(x + 1, y, z)}`}</td>
              <td />
            </tr>
            <tr>
              <td />
              <td>{`S: ${getTileId(x, y, z + 1)}`}</td>
              <td />
              <td>{`D: ${getTileId(x, y - 1, z)}`}</td>
            </tr>
          </tbody>
        </table>
        <p className="compass">{getFacing(rotation)}</p>
      </div>
    </div>
  );
}

export default App;
