module.exports = {
  getEmptyBoard: function () {
    /*
        Should return a list with 3 sublists.
        Each sublist should contain 3 time the "." character
        */
    let Emptyboard = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    return Emptyboard;

  },

  displayBoard: function (board) {
    /*
        Should console.log the tic tac toe board in a format similar to
            1   2   3
            A   X | O | . 
            ---+---+---
            B   X | O | .
            --+---+---
            C   0 | X | . 
            --+---+---
        */

    console.log(`     1   2   3`);
    console.log(`       +   +   `);
    console.log(" A   " +board[0].join(" | "));
    console.log(`   +---+---+---`);
    console.log(" B   " +board[1].join(" | "));
    console.log(`   +---+---+---`);
    console.log(" C   " +board[2].join(" | "));
  },

  isBoardFull: function (board) {
    /*
        should return True if there are no more empty place on the board,
        otherwise should return False
        */
  },

  getWinningPlayer: function (board) {
    /*
      Should return the player that wins based on the tic tac toe rules.
      If no player has won, than "None" is returned.
      */
  },
};

// run this function to test whether you have correctly implemented the other function
function checkBoards() {
  let board = module.exports.getEmptyBoard();
  console.log(board);

  board = [["X", "O", "."], ["X", "O", "."], ["0", "X", "."]];

  console.log(`Should give out:"

        1   2   3
    A   X | O | . 
       ---+---+---
    B   X | O | .
       ---+---+---
    C   0 | X | . 
       ---+---+---`);
       module.exports.displayBoard(board);

  board_1 = [
    ["X", "O", "."],
    ["X", "O", "."],
    ["X", "X", "O"],
  ];
  console.log("Should return False");
  console.log(module.exports.isBoardFull(board_1));

  board_2 = [
    [".", "O", "O"],
    [".", "O", "X"],
    [".", "X", "X"],
  ];
  console.log("Should return False");
  console.log(module.exports.isBoardFull(board_2));

  board_3 = [
    ["O", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "X"],
  ];
  console.log("Should return True");
  console.log(module.exports.isBoardFull(board_3));

  board_4 = [
    ["X", "O", "."],
    ["X", "O", "."],
    ["X", "X", "O"],
  ];
  console.log("Should return X");
  console.log(module.exports.getWinningPlayer(board_4));

  board_5 = [
    ["X", "O", "O"],
    ["X", "O", "."],
    ["O", "X", "X"],
  ];
  console.log("Should return O");
  console.log(module.exports.getWinningPlayer(board_5));

  board_6 = [
    ["O", "O", "."],
    ["O", "X", "."],
    [".", "X", "."],
  ];
  console.log("Should return None");
  console.log(module.exports.getWinningPlayer(board_6));
}
checkBoards();