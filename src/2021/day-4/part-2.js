const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const formatInput = (input) => {
  const [numbers, ...rest] = input.split('\n\n');

  return {
    numbers: numbers.split(','),
    boards: rest.map((board) =>
      board.split('\n').map((row) => row.split(' ').filter((n) => !!n))
    )
  };
};

const initEmptyBoards = (boards) => {
  return boards.map((board) => board.map((row) => row.map(() => false)));
};

const processInput = ({ numbers, boards }) => {
  const emptyBoards = initEmptyBoards(boards);
  const winningBoards = [];
  let winningNumber;

  for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    // 1. Iterate over the boards to dispatch the current number to the according row column of the current board
    // 2. check if the emptyBoard at index i contains a row or column with all `true` value

    for (let j = 0; j < boards.length; j++) {
      const currentBoard = boards[j];

      for (let k = 0; k < currentBoard.length; k++) {
        const currentRow = currentBoard[k];

        for (let l = 0; l < currentRow.length; l++) {
          if (currentRow[l] === currentNumber && !winningBoards.includes(j)) {
            emptyBoards[j][k][l] = true;

            if (i >= currentRow.length) {
              const tmpRow = emptyBoards[j][k];
              const tmpColumn = emptyBoards[j].map((el) => el[l]);

              const isRowFull = tmpRow.every((n) => !!n);
              const isColumnFull = tmpColumn.every((n) => !!n);

              if ((isRowFull || isColumnFull) && !winningBoards.includes(j)) {
                winningBoards.push(j);
                winningNumber = currentNumber;
              }
            }
          }
        }
      }
    }
  }

  const lastWinningIndex = winningBoards[winningBoards.length - 1];

  const flattedCurrentBoard = boards[lastWinningIndex].flat();
  const flattedEmptyBoard = emptyBoards[lastWinningIndex].flat();

  const unmarkedNumbers = flattedCurrentBoard.map((num, index) =>
    !flattedEmptyBoard[index] ? Number(num) : 0
  );

  const sum = unmarkedNumbers.reduce((acc, curr) => curr + acc, 0);

  return sum * winningNumber;
};

const formattedInput = formatInput(puzzleInput);
const result = processInput(formattedInput);

console.log('result :', result);
