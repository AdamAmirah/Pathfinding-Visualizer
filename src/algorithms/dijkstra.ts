import PriorityQueue from "ts-priority-queue";

type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;
type ArrayPair = Array<[ArrayElement, ArrayElement]>;
type QueueEntry = {
  node: [number, number];
  cost: number;
};
/// every cell is weighted 1 , TODO : allow weights to be added.
export const dijkstra = (
  grid: TwoDimensionalArray,
  start: [number, number],
  target: [number, number]
): {
  path: Array<[number, number]>;
  steps: Array<[number, number]>;
  distances: { [key: string]: number };
} => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const directions: ArrayPair = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];
  // distance map
  const distances: { [key: string]: number } = {}; // a map to keep distances
  distances[`${start[0]},${start[1]}`] = 0;

  // keep the visited cells
  const pq = new PriorityQueue<QueueEntry>({
    comparator: (a, b) => a.cost - b.cost,
  });
  pq.queue({ node: start, cost: 0 });

  const parent: { [key: string]: [number, number] } = {};
  const steps: Array<[number, number]> = []; // Track the steps taken during the search

  while (pq.length != 0) {
    const topElement = pq.peek();
    const node = topElement.node;
    const cost = topElement.cost;
    const [row, col] = node;

    pq.dequeue();
    if (row === target[0] && col === target[1]) {
      console.log(distances);
      return {
        path: constructPath(parent, start, target),
        steps: steps.slice(),
        distances: distances,
      };
    }

    for (const [dx, dy] of directions) {
      const newRow: number = row + dx;
      const newCol: number = col + dy;
      const newPosition = `${newRow},${newCol}`;
      const newCost = cost + 1;
      if (
        isValidCell(newRow, newCol, numRows, numCols) &&
        grid[newRow][newCol] !== 1 &&
        (distances[newPosition] === undefined ||
          newCost < distances[newPosition])
      ) {
        distances[newPosition] = newCost;
        pq.queue({
          node: [newRow, newCol],
          cost: distances[newPosition],
        });
        parent[newPosition] = [row, col];
        steps.push([newRow, newCol]);
      }
    }
  }

  return {
    path: [],
    steps: steps.slice(), // Return the steps taken during the search
    distances: distances,
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
