import PriorityQueue from "ts-priority-queue";

type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;
type ArrayPair = Array<[ArrayElement, ArrayElement]>;
type QueueEntry = {
  node: string;
  cost: number;
};
/// every cell is weighted 1 , TODO : allow weights to be added.
export const dijkstra = (
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

  // keep the visited cells
  const pq = new PriorityQueue<QueueEntry>(
    (a: QueueEntry, b: QueueEntry) => b.cost - a.cost
  );
  pq.enqueue([`${start[0]},${start[1]}`, 0]);

  // distance map
  const distances: { [key: string]: number } = {}; // a map to keep distances
  distances[`${start[0]},${start[1]}`] = 0;
};
