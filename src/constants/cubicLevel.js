/* eslint-disable no-unused-vars */
export const levelMap = {

};

let cubeId = -1;
export const level = [...new Array(10)].map((xRow, x) => [...new Array(10)]
  .map((yRow, y) => [...new Array(10)].map((zRow, z) => {
    cubeId += 1;
    return cubeId;
  })));
