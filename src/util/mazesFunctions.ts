type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateMazeWithSolvablePath(
  rows: ArrayElement,
  cols: ArrayElement,
  startPoint: [number, number],
  endPoint: [number, number]
) {
  const mazeGrid: TwoDimensionalArray = Array(rows)
    .fill(1)
    .map(() => Array(cols).fill(1));

  const [startRow, startCol] = startPoint;
  const [endRow, endCol] = endPoint;

  const stack: [number, number][] = [[startRow, startCol]];
  mazeGrid[startRow][startCol] = 0;

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack[stack.length - 1];
    const directions = shuffleArray([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);

    let foundValidDirection = false;

    for (const [dr, dc] of directions) {
      const newRow = currentRow + dr * 2;
      const newCol = currentCol + dc * 2;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        mazeGrid[newRow][newCol] === 1
      ) {
        mazeGrid[newRow][newCol] = 0;
        mazeGrid[currentRow + dr][currentCol + dc] = 0;
        stack.push([newRow, newCol]);
        foundValidDirection = true;
        break;
      }
    }

    if (!foundValidDirection) {
      stack.pop();
    }
  }

  mazeGrid[endRow][endCol] = 0;
  return mazeGrid;
}

// basic maze
// doesn't ensure connectivity
export function generateBasicMaze(
  rows: ArrayElement,
  cols: ArrayElement,
  startPoint: [number, number],
  endPoint: [number, number]
) {
  const mazeGrid: TwoDimensionalArray = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  const numBlockedPoints = Math.floor(Math.random() * 201) + 400;
  for (let i = 0; i < numBlockedPoints; i++) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (
      (row === startPoint[0] && col === startPoint[1]) ||
      (row === endPoint[0] && col === endPoint[1])
    )
      continue;

    mazeGrid[row][col] = 1;
  }

  return mazeGrid;
}
