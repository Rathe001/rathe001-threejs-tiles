/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  level as level1Bounds,
  levelMap as level1Map,
} from '../constants/level1';
import getFacing from '../constants/getFacing';

const isPassable = (x, y, z, bounds, map) => map?.[bounds?.[x]?.[y]?.[-z]]?.isPassable === true;

const gameSlice = createSlice({
  initialState: {
    bounds: {
      1: [],
    },
    level: 1,
    maps: {
      1: {},
    },
    player: {
      clipping: false,
      lightLevel: 3,
      position: {
        rotation: 0,
        x: 1,
        y: 1,
        z: 0,
      },
    },
  },
  name: 'game',
  reducers: {
    init(state, action) {
      state.bounds[1] = level1Bounds;
      state.maps[1] = level1Map;
      state.level = action.payload;
    },
    lightLevelDecrease(state) {
      if (state.player.lightLevel > 2) state.player.lightLevel -= 1;
    },
    lightLevelIncrease(state) {
      if (state.player.lightLevel < 15) state.player.lightLevel += 1;
    },
    moveBackward(state) {
      const dir = getFacing(state.player.position.rotation);
      const { x, y, z } = state.player.position;
      const bounds = state.bounds[state.level];
      const map = state.maps[state.level];
      if (dir === 'N' && (state.player.clipping || isPassable(x, y, z + 1, bounds, map))) state.player.position.z += 1;
      if (dir === 'E' && (state.player.clipping || isPassable(x - 1, y, z, bounds, map))) state.player.position.x -= 1;
      if (dir === 'S' && (state.player.clipping || isPassable(x, y, z - 1, bounds, map))) state.player.position.z -= 1;
      if (dir === 'W' && (state.player.clipping || isPassable(x + 1, y, z, bounds, map))) state.player.position.x += 1;

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    moveDown(state) {
      const { x, y, z } = state.player.position;
      const bounds = state.bounds[state.level];
      const map = state.maps[state.level];
      if (state.player.clipping || isPassable(x, y - 1, z, bounds, map)) {
        state.player.position.y -= 1;
      }

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    moveForward(state) {
      const dir = getFacing(state.player.position.rotation);
      const { x, y, z } = state.player.position;
      const bounds = state.bounds[state.level];
      const map = state.maps[state.level];
      if (dir === 'N' && (state.player.clipping || isPassable(x, y, z - 1, bounds, map))) state.player.position.z -= 1;
      if (dir === 'E' && (state.player.clipping || isPassable(x + 1, y, z, bounds, map))) state.player.position.x += 1;
      if (dir === 'S' && (state.player.clipping || isPassable(x, y, z + 1, bounds, map))) state.player.position.z += 1;
      if (dir === 'W' && (state.player.clipping || isPassable(x - 1, y, z, bounds, map))) state.player.position.x -= 1;

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    moveLeft(state) {
      const dir = getFacing(state.player.position.rotation);
      const { x, y, z } = state.player.position;
      const bounds = state.bounds[state.level];
      const map = state.maps[state.level];
      if (dir === 'N' && (state.player.clipping || isPassable(x - 1, y, z, bounds, map))) state.player.position.x -= 1;
      if (dir === 'E' && (state.player.clipping || isPassable(x, y, z - 1, bounds, map))) state.player.position.z -= 1;
      if (dir === 'S' && (state.player.clipping || isPassable(x + 1, y, z, bounds, map))) state.player.position.x += 1;
      if (dir === 'W' && (state.player.clipping || isPassable(x, y, z + 1, bounds, map))) state.player.position.z += 1;

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    moveRight(state) {
      const dir = getFacing(state.player.position.rotation);
      const { x, y, z } = state.player.position;
      const bounds = state.bounds[state.level];
      const map = state.maps[state.level];
      if (dir === 'N' && (state.player.clipping || isPassable(x + 1, y, z, bounds, map))) state.player.position.x += 1;
      if (dir === 'E' && (state.player.clipping || isPassable(x, y, z + 1, bounds, map))) state.player.position.z += 1;
      if (dir === 'S' && (state.player.clipping || isPassable(x - 1, y, z, bounds, map))) state.player.position.x -= 1;
      if (dir === 'W' && (state.player.clipping || isPassable(x, y, z - 1, bounds, map))) state.player.position.z -= 1;

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    moveUp(state) {
      const { x, y, z } = state.player.position;
      const bounds = state.bounds[state.level];
      const map = state.maps[state.level];
      if (state.player.clipping || isPassable(x, y + 1, z, bounds, map)) {
        state.player.position.y += 1;
      }

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    setPosition(state, action) {
      const bounds = state.bounds[state.level];
      state.player.position = {
        ...state.player.position,
        ...action.payload,
      };

      state.maps[state.level][bounds[
        state.player.position.x][state.player.position.y][-state.player.position.z]
      ].isExplored = true;
    },
    toggleClipping(state) {
      state.player.clipping = !state.player.clipping;
    },
    turnLeft(state) {
      if (state.player.position.rotation === 3) {
        state.player.position.rotation = 0;
      } else {
        state.player.position.rotation += 1;
      }
    },
    turnRight(state) {
      if (state.player.position.rotation === -3) {
        state.player.position.rotation = 0;
      } else {
        state.player.position.rotation -= 1;
      }
    },
  },
});

export const { actions, reducer } = gameSlice;
export default reducer;
