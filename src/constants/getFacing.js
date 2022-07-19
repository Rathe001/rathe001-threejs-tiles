const getFacing = (rotation) => {
  if (rotation % 4 === 0) return 'N';
  if (rotation % 4 === 1 || rotation % 4 === -3) return 'W';
  if (rotation % 4 === 2 || rotation % 4 === -2) return 'S';
  if (rotation % 4 === 3 || rotation % 4 === -1) return 'E';

  return 'N';
};

export default getFacing;
