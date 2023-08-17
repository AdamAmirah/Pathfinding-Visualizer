type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;
type ArrayPair = Array<[ArrayElement, ArrayElement]>;

export const bfs = (
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

  const queue: ArrayPair = [start];
  const visited = new Set<string>();
  const parent: { [key: string]: [number, number] } = {};
  const steps: Array<[number, number]> = []; // Track the steps taken during the search

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    if (row === target[0] && col === target[1]) {
      return {
        path: constructPath(parent, start, target),
        steps: steps.slice(), // Return the steps taken during the search
      };
    }

    for (const [dx, dy] of directions) {
      const newRow: number = row + dx;
      const newCol: number = col + dy;

      if (
        isValidCell(newRow, newCol, numRows, numCols) &&
        !visited.has(`${newRow},${newCol}`) &&
        grid[newRow][newCol] !== 1
      ) {
        queue.push([newRow, newCol]);
        visited.add(`${newRow},${newCol}`);
        parent[`${newRow},${newCol}`] = [row, col];
        steps.push([newRow, newCol]); // Track the new step taken
      }
    }
  }

  return {
    path: [],
    steps: steps.slice(), // Return the steps taken during the search
  };
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
