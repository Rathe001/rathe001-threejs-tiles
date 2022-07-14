/* eslint-disable no-unused-vars */
export const levelMap = {
  101: {
    isPassable: true,
  },
  102: {
    isPassable: true,
  },
  103: {
    isPassable: true,
  },
  131: {
    isPassable: true,
  },
  133: {
    isPassable: true,
  },
  161: {
    isPassable: true,
  },
  163: {
    isPassable: true,
  },
  191: {
    isPassable: true,
  },
  192: {
    isPassable: true,
  },
  193: {
    isPassable: true,
  },
  213: {
    isPassable: true,
  },
  214: {
    isPassable: true,
  },
  223: {
    isPassable: true,
  },
  224: {
    isPassable: true,
  },
  233: {
    isPassable: true,
  },
  243: {
    isPassable: true,
  },
  244: {
    isPassable: true,
  },
  252: {
    isPassable: true,
  },
  253: {
    isPassable: true,
  },
  254: {
    isPassable: true,
  },
  40: {
    isPassable: true,
  },
  41: {
    isPassable: true,
  },
  42: {
    isPassable: true,
  },
  43: {
    isPassable: true,
  },
  73: {
    isPassable: true,
  },
};

let cubeId = -1;
export const level = [...new Array(10)].map((xRow, x) => [...new Array(3)]
  .map((yRow, y) => [...new Array(10)].map((zRow) => {
    cubeId += 1;
    return cubeId;
  })));
