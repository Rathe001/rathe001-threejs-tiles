/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getFacing from '../constants/getFacing';

const playerSlice = createSlice({
  initialState: {
    position: {
      rotation: 0,
      x: 0,
      y: 0,
      z: 0,
    },
  },
  name: 'player',
  reducers: {
    moveBackward(state) {
      const dir = getFacing(state.position.rotation);
      if (dir === 'N') state.position.z += 1;
      if (dir === 'E') state.position.x -= 1;
      if (dir === 'S') state.position.z -= 1;
      if (dir === 'W') state.position.x += 1;
    },
    moveDown(state) {
      state.position.y -= 1;
    },
    moveForward(state) {
      const dir = getFacing(state.position.rotation);
      if (dir === 'N') state.position.z -= 1;
      if (dir === 'E') state.position.x += 1;
      if (dir === 'S') state.position.z += 1;
      if (dir === 'W') state.position.x -= 1;
    },
    moveLeft(state) {
      const dir = getFacing(state.position.rotation);
      if (dir === 'N') state.position.x -= 1;
      if (dir === 'E') state.position.z -= 1;
      if (dir === 'S') state.position.x += 1;
      if (dir === 'W') state.position.z += 1;
    },
    moveRight(state) {
      const dir = getFacing(state.position.rotation);
      if (dir === 'N') state.position.x += 1;
      if (dir === 'E') state.position.z += 1;
      if (dir === 'S') state.position.x -= 1;
      if (dir === 'W') state.position.z -= 1;
    },
    moveUp(state) {
      state.position.y += 1;
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
