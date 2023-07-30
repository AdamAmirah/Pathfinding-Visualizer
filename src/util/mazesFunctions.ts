type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

function shuffleArray(array: TwoDimensionalArray) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//TODO:  ensure that the start and the end point are not included later ....

export function generateRecursiveMaze(rows: ArrayElement, cols: ArrayElement) {
  const mazeGrid: TwoDimensionalArray = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  function recursiveBacktracking(row: ArrayElement, col: ArrayElement) {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    shuffleArray(directions);

    for (const [dr, dc] of directions) {
      const newRow = row + dr * 2;
      const newCol = col + dc * 2;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !mazeGrid[newRow][newCol]
      ) {
        mazeGrid[newRow][newCol] = 1;
        mazeGrid[row + dr][col + dc] = 1;

        recursiveBacktracking(newRow, newCol);
      }
    }
  }

  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * cols);

  mazeGrid[startRow][startCol] = 1;
  recursiveBacktracking(startRow, startCol);

  return mazeGrid;
}

// basic maze
// doesn't ensure connectivity
export function generateBasicMaze(rows: ArrayElement, cols: ArrayElement) {
  const mazeGrid: TwoDimensionalArray = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  const numBlockedPoints = Math.floor(Math.random() * 600);

  for (let i = 0; i < numBlockedPoints; i++) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    mazeGrid[row][col] = 1;
  }

  return mazeGrid;
}
