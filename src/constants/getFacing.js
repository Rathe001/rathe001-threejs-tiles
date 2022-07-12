const getFacing = (rotation) => {
  if (rotation === 0) return 'N';
  if (rotation === -1 || rotation === 3) return 'E';
  if (rotation === 2 || rotation === -2) return 'S';
  if (rotation === 1 || rotation === -3) return 'W';

  return 'N';
};

export default getFacing;
