/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getFacing from '../constants/getFacing';
import { level, levelMap } from '../constants/cubicLevel';

const getTile = (x, y, z) => levelMap?.[level?.[x]?.[y]?.[-z]];
const isPassable = (x, y, z) => getTile(x, y, z)?.isPassable === true;

const playerSlice = createSlice({
  initialState: {
    lightLevel: 3,
    position: {
      rotation: 0,
      x: 1,
      y: 1,
      z: 0,
    },
  },
  name: 'player',
  reducers: {
    lightLevelDecrease(state) {
      if (state.lightLevel > 2) state.lightLevel -= 1;
    },
    lightLevelIncrease(state) {
      if (state.lightLevel < 15) state.lightLevel += 1;
    },
    moveBackward(state) {
      const dir = getFacing(state.position.rotation);
      const { x, y, z } = state.position;
      if (dir === 'N' && isPassable(x, y, z + 1)) state.position.z += 1;
      if (dir === 'E' && isPassable(x - 1, y, z)) state.position.x -= 1;
      if (dir === 'S' && isPassable(x, y, z - 1)) state.position.z -= 1;
      if (dir === 'W' && isPassable(x + 1, y, z)) state.position.x += 1;
    },
    moveDown(state) {
      const { x, y, z } = state.position;
      if (isPassable(x, y - 1, z)) state.position.y -= 1;
    },
    moveForward(state) {
      const dir = getFacing(state.position.rotation);
      const { x, y, z } = state.position;
      if (dir === 'N' && isPassable(x, y, z - 1)) state.position.z -= 1;
      if (dir === 'E' && isPassable(x + 1, y, z)) state.position.x += 1;
      if (dir === 'S' && isPassable(x, y, z + 1)) state.position.z += 1;
      if (dir === 'W' && isPassable(x - 1, y, z)) state.position.x -= 1;
    },
    moveLeft(state) {
      const dir = getFacing(state.position.rotation);
      const { x, y, z } = state.position;
      if (dir === 'N' && isPassable(x - 1, y, z)) state.position.x -= 1;
      if (dir === 'E' && isPassable(x, y, z - 1)) state.position.z -= 1;
      if (dir === 'S' && isPassable(x + 1, y, z)) state.position.x += 1;
      if (dir === 'W' && isPassable(x, y, z + 1)) state.position.z += 1;
    },
    moveRight(state) {
      const dir = getFacing(state.position.rotation);
      const { x, y, z } = state.position;
      if (dir === 'N' && isPassable(x + 1, y, z)) state.position.x += 1;
      if (dir === 'E' && isPassable(x, y, z + 1)) state.position.z += 1;
      if (dir === 'S' && isPassable(x - 1, y, z)) state.position.x -= 1;
      if (dir === 'W' && isPassable(x, y, z - 1)) state.position.z -= 1;
    },
    moveUp(state) {
      const { x, y, z } = state.position;
      if (isPassable(x, y + 1, z)) state.position.y += 1;
    },
    setPosition(state, action) {
      state.position = {
        ...state.position,
        ...action.payload,
      };
    },
    turnLeft(state) {
      if (state.position.rotation === 3) {
        state.position.rotation = 0;
      } else {
        state.position.rotation += 1;
      }
    },
    turnRight(state) {
      if (state.position.rotation === -3) {
        state.position.rotation = 0;
      } else {
        state.position.rotation -= 1;
      }
    },
  },
});

const { actions, reducer } = playerSlice;
export const {
  lightLevelDecrease,
  lightLevelIncrease,
  moveBackward,
  moveDown,
  moveForward,
  moveLeft,
  moveRight,
  moveUp,
  setPosition,
  turnLeft,
  turnRight,

} = actions;

export default reducer;
