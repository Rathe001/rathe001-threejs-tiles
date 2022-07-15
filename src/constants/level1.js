let cubeId = -1;
export const level = [...new Array(10)] // x
  .map(() => [...new Array(3)] // y
    .map(() => [...new Array(10)] // z
      .map(() => {
        cubeId += 1;
        return cubeId;
      })));
/**
 * Textures:
 * 0: W
 * 1: E
 * 2: D
 * 3: U
 * 4: S
 * 5: N
 */
export const levelMap = level.flat().flat().reduce((acc, id) => {
  const tile = {
    isExplored: false,
    isPassable: false,
    isVisible: true,
    textures: ['panel1', 'panel2', 'panel3', 'panel7', 'panel5', 'panel6'],
  };

  /** Carve a clear path through level */
  if (id === 101
    || id === 102 || id === 103 || id === 131 || id === 133 || id === 161 || id === 163
    || id === 191 || id === 192 || id === 193 || id === 213 || id === 214 || id === 223
    || id === 224 || id === 233 || id === 243 || id === 244 || id === 252 || id === 253
    || id === 254 || id === 40 || id === 41 || id === 42 || id === 43 || id === 73) {
    tile.isPassable = true;
    tile.isVisible = false;
  }

  if (id === 12) {
    tile.textures[0] = 'door1';
  }

  return {
    ...acc,
    [id]: tile,
  };
}, {});
