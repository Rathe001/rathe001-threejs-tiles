/* eslint-disable no-unused-vars */
export const levelMap = {

};

let cubeId = 0;
export const level = [...new Array(10)].map((xRow, x) => {
  cubeId += 1;
  return [...new Array(10)].map((yRow, y) => {
    cubeId += 1;
    return [...new Array(10)].map((zRow, z) => {
      cubeId += 1;
      return cubeId;
    });
  });
});
