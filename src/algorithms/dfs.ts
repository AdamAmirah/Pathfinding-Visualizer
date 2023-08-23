type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;
type ArrayPair = Array<[ArrayElement, ArrayElement]>;

export const dfs = (
  grid: TwoDimensionalArray,
  start: [number, number],
  target: [number, number]
) => {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const directions: ArrayPair = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  const visited: { [key: string]: number } = {};
  const parent: { [key: string]: [number, number] } = {};
  const steps: Array<[number, number]> = [];

  const found = dfsRecursive(
    grid,
    start,
    target,
    directions,
    visited,
    numRows,
    numCols,
    parent,
    steps
  );

  return {
    path: found ? constructPath(parent, start, target) : [],
    steps: steps.slice(),
    distances: {},
  };
};

const dfsRecursive = (
  grid: TwoDimensionalArray,
  current: [number, number],
  target: [number, number],
  directions: ArrayPair,
  visited: { [key: string]: number },
  numRows: number,
  numCols: number,
  parent: { [key: string]: [number, number] },
  steps: Array<[number, number]>
): boolean => {
  const [row, col] = current;

  if (row === target[0] && col === target[1]) {
    return true;
  }

  if (
    !isValidCell(row, col, numRows, numCols) ||
    grid[row][col] === 1 ||
    visited[`${row},${col}`]
  ) {
    return false;
  }

  visited[`${row},${col}`] = 1;
  steps.push([row, col]);

  for (const [dx, dy] of directions) {
    const newRow: number = row + dx;
    const newCol: number = col + dy;

    if (
      dfsRecursive(
        grid,
        [newRow, newCol],
        target,
        directions,
        visited,
        numRows,
        numCols,
        parent,
        steps
      )
    ) {
      parent[`${newRow},${newCol}`] = [row, col];
      return true;
    }
  }

  return false;
};

const isValidCell = (
  row: number,
  col: number,
  numRows: number,
  numCols: number
): boolean => {
  return row >= 0 && row < numRows && col >= 0 && col < numCols;
};

const constructPath = (
  parent: { [key: string]: [number, number] },
  start: [number, number],
  target: [number, number]
): Array<[number, number]> => {
  const path: Array<[number, number]> = [];
  let current: [number, number] | undefined = target;

  while (current && (current[0] !== start[0] || current[1] !== start[1])) {
    path.unshift(current);
    current = parent[`${current[0]},${current[1]}`];
  }

  path.unshift(start);
  return path;
};
