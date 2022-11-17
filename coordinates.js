const prompt = require("prompt-sync")({ sigint: true });
const boardFile = require("./board");

module.exports = {
  // retun input
  getPlayerMove: function (board, currentPlayer) {
    /*
        Should return the read coordinates for the tic tac toe board from the terminal.
        The coordinates should be in the format  letter, number where the letter is 
        A, B or C and the number 1, 2 or 3.
        If the user enters an invalid coordinate (like Z0 or 1A, A11, sadfdsaf) 
        than a warning message should appear and the coordinates reading process repeated.
        If the user enters a coordinate that is already taken on the board.
        than a warning message should appear and the coordinates reading process repeated.
        If the user enters the word "quit" in any format of capitalized letters the program
        should stop.
        */
    let userInput = "";
    let rowNames = ["A", "B", "C"];
    let freeFields = this.getFreeFields(board);

    while (userInput !== "QUIT") {
      let coordinates = [];

      userInput = prompt("   Please enter the coordinates: ")
        .toUpperCase()
        .trim();
      // termination case
      if (userInput === "QUIT") {
        console.log("   Sorry to see you go :( !!!");
        continue;
      }
      // conversion to coordinates
      if (/[A-C]/.test(userInput[0]) && /[1-3]/.test(userInput[1])) {
        let y = rowNames.indexOf(userInput[0]);
        let x = Number(userInput[1]) - 1;
        coordinates = [y, x];
      } else if (/[A-C]/.test(userInput[1]) && /[1-3]/.test(userInput[0])) {
        let x = rowNames.indexOf(userInput[1]);
        let y = Number(userInput[0]) - 1;
        coordinates = [y, x];
      } else {
        console.log("   Sorry I didn't understand, please try again.");
        continue;
      }
      // check if coordinates are free and returns them
      if (board[coordinates[0]][coordinates[1]] === ".") {
        return coordinates;
      } else {
        console.log("   This Field is already taken, please try again.");
      }
    }
    // exit with "QUIT" and return none
    return "None";
  },

  getRandomAiCoordinates: function (board, current_player) {
    /*
        Should return a tuple of 2 numbers. 
        Each number should be between 0-2.
        The chosen number should be only a free coordinate from the board.
        If the board is full (all spots taken by either X or O) than "None"
        should be returned.
        */
    let freeFields = this.getFreeFields(board);
    if (freeFields.length === 0) return "None";
    let randomIndex = this.getRandomInteger(freeFields.length);

    return freeFields[randomIndex];
  },
  /**
   * KI that searches for best possible move,
   * The chosen coordinate should always stop the other player from winning or
   * maximize the current player's chances to win.
   * If the board is full (all spots taken by either X or O) than "None" should be returned
   * @param {number[][]} board - TicTacToe board
   * @param {"X"|"O"} current_player
   * @returns {[number,number]|"None"} - array of two coordinate, None if Board full.
   */
  getBeatableAiCoordinates: function (board, current_player) {
    let freeFields = this.getFreeFields(board);
    if (freeFields.length === 0) return "None";
    let otherPlayer = current_player === "X" ?  "O" : "X";

    let goodMoveCurr = this.getBestCoord(board, current_player);
    let goodMoveOpp = this.getBestCoord(board, otherPlayer);

    // check if current player have a win move, take it! 
    if (goodMoveCurr !== "None") {
      return goodMoveCurr;
    }
    // check if other player have a win move, take it! 
    if (goodMoveOpp !== "None") {
      return goodMoveOpp;
    }
    // if middle field is empty, mark it!
    if (board[1][1] === ".") return [1, 1];

    // if nothing works then chose any free field.
    return this.getRandomAiCoordinates(board, current_player);
  },
  // KI that returns unbeatable coordinates for current player
  getUnbeatableAiCoordinates: function (board, current_player) {
    /*
        Should return an array of 2 numbers. 
        Each number should be between 0-2.
        The chosen number should be only a free coordinate from the board.
        The chosen coordinate should always stop the other player from winning or
        maximize the current player's chances to win.
        If the board is full (all spots taken by either X or O) than "None"
        should be returned.
        */

    // make a copy of the board
    let tempBoard = boardFile.getEmptyBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tempBoard[i][j] = board[i][j];
      }
    }
    let coord = this.minmax(tempBoard, current_player, current_player);
    return coord.index;
  },
  ///////////////////////////////////////////////////////////////
  // unbeatable recursive minmax algorithm
  minmax: function (newboard, currentPlayer, aiPlayer) {
    const freeFields = this.getFreeFields(newboard);
    let otherPlayer = "";
    let winner = boardFile.getWinningPlayer(newboard);
    if (currentPlayer === "X" ? (otherPlayer = "O") : (otherPlayer = "X"));

    // termination
    if (winner === aiPlayer) {
      return { score: 10 };
    } else if (winner !== "None") {
      return { score: -10 };
    } else if (freeFields.length === 0) {
      return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < freeFields.length; i++) {
      let newMoves = {};
      newMoves.index = freeFields[i];
      newboard[freeFields[i][0]][freeFields[i][1]] = currentPlayer;

      let result = this.minmax(newboard, otherPlayer, aiPlayer);
      newMoves.score = result.score;

      newboard[freeFields[i][0]][freeFields[i][1]] = ".";
      moves.push(newMoves);
    }

    let best_move = {};
    if (currentPlayer === aiPlayer) {
      let best_score = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > best_score) {
          best_move = moves[i];
          best_score = moves[i].score;
        }
      }
    } else {
      let worst_score = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < worst_score) {
          best_move = moves[i];
          worst_score = moves[i].score;
        }
      }
    }
    return best_move;
  },
  /**The function should search all free Fields,
   * test if the field brings a win, and then return coordinates.
   * If no fiels is found "None is returned"
   * @param {number[][]} board - TicTacToe Board matrix
   * @param {"X"|"O"} player - current player
   * @returns {number[y,x]|"None"} touple of numbers that represent x,y coordinates
   */
  getBestCoord: function (board, player) {
    let freeFields = this.getFreeFields(board);
    for (const field of freeFields) {
      board[field[0]][field[1]] = player;
      let winner = boardFile.getWinningPlayer(board);
      board[field[0]][field[1]] = ".";

      if (winner === player) return field;
    }
    return "None";
  },
  /**Captures free fields in board
   * Itarates through the board and returns coordinates of all free fields
   * @param {number[][]} board - TicTacToe board
   * @returns {number[[number.number],...]} retuns a list of touples
   */
  getFreeFields: function (board) {
    // retrutn list of all cordinates that are availble for move
    const freeField = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === ".") freeField.push([row, col]);
      }
    }
    return freeField;
  },
  /**Random function that takes in a number
   * returns random integer [0,maxValue) maxValue excluded
   * @param {maxValue} takes in the maximum value
   * @returns
   */
  getRandomInteger: function (maxValue) {
    return Math.floor(Math.random() * maxValue);
  },
  /**Sleep function
   * @param {number} ms - milliseconds
   * @returns {Promise} - wait for ms milliseconds
   */
  sleep: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  /**
   * @deprecated resource demanding function, replaced with  getBestCoord()
   */
  getBestCoordOriginal: function (board, player) {
    // check for two in line for player
    let boardLine = this.getBestLine(board, player, 2);

    if (boardLine.length === 0) {
      // if no two in lines are found take the middle field,
      if (board[1][1] === ".") return [1, 1];
    } else {
      // if there are two in line return the empty one
      for (const coord of boardLine) {
        if (board[coord[0]][coord[1]] === ".") return coord;
      }
    }
    return "None";
  },
  /**
   * @deprecated replaced with one line code
   */
  isFieldFree: function (fieldList, coordinates) {
    for (const field of fieldList) {
      if (field[0] === coordinates[0] && field[1] === coordinates[1])
        return true;
    }
    return false;
  },
  /**
   * @deprecated not elegant, and too long replaced with getBestCoord
   */
  getBestLine: function (board, player, numSimilars) {
    let counterPlayer = 0;
    let counterDot = 0;

    for (let row = 0; row < board.length; row++) {
      // check horizontally
      counterPlayer = 0;
      counterDot = 0;
      for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === player) counterPlayer += 1;
        if (board[row][i] === ".") counterDot += 1;
      }
      if (counterPlayer === numSimilars && counterPlayer + counterDot === 3) {
        return [
          [row, 0],
          [row, 1],
          [row, 2],
        ];
      }

      // check vertically
      counterPlayer = 0;
      counterDot = 0;
      for (let i = 0; i < board[row].length; i++) {
        if (board[i][row] === player) counterPlayer += 1;
        if (board[i][row] === ".") counterDot += 1;
      }
      if (counterPlayer === numSimilars && counterPlayer + counterDot === 3) {
        return [
          [0, row],
          [1, row],
          [2, row],
        ];
      }

      // check diagonals R
      counterPlayer = 0;
      counterDot = 0;
      for (let i = 0; i < board[row].length; i++) {
        if (board[i][i] === player) counterPlayer += 1;
        if (board[i][i] === ".") counterDot += 1;
      }
      if (counterPlayer === numSimilars && counterPlayer + counterDot === 3) {
        return [
          [0, 0],
          [1, 1],
          [2, 2],
        ];
      }

      // check diagonals L
      counterPlayer = 0;
      counterDot = 0;
      for (let i = 0; i < board[row].length; i++) {
        if (board[i][2 - i] === player) counterPlayer += 1;
        if (board[i][2 - i] === ".") counterDot += 1;
      }
      if (counterPlayer === numSimilars && counterPlayer + counterDot === 3) {
        return [
          [0, 2],
          [1, 1],
          [2, 0],
        ];
      }
    }
    return [];
  },
};

// run this function to test whether you have correctly implemented the other functions
// function checkCoordinates() {
//   board_1 = [
//     ["X", "X", "."],
//     ["X", ".", "."],
//     ["X", "X", "."],
//   ];
//   console.log(
//     "It should console.log the coordinates selected by the human player"
//   );
//   coordinates = module.exports.getPlayerMove(board_1, "X");
//   console.log(coordinates);
// board_2 = [
//   ["O", "O", "."],
//   ["X", "X", "."],
//   ["X", "X", "O"],
// ];
// console.log("The console.loged coordinate should be only (0,2) or (1,2)");
// console.log(module.exports.getRandomAiCoordinates(board_2));
// console.log("The console.loged coordinate should be only (0,2) or (1,2)");
// console.log(module.exports.getRandomAiCoordinates(board_2));
// console.log("The console.loged coordinate should be only (0,2) or (1,2)");
// console.log(module.exports.getRandomAiCoordinates(board_2));
// board_3 = [
//   ["O", "X", "O"],
//   ["O", "O", "X"],
//   ["X", "X", "X"],
// ];
// console.log("The console.loged coordinate should be None");
// console.log(module.exports.getRandomAiCoordinates(board_3));
// board_4 = [
//   ["X", "O", "."],
//   ["O", ".", "X"],
//   ["O", "O", "X"],
// ];
// console.log(boardFile.getWinningPlayer(board_4));
// console.log(module.exports.getUnbeatableAiCoordinates(board_4, "O"));
// console.log(module.exports.getBeatableAiCoordinates(board_4, "X"));
// console.log("The console.loged coordinate should always be (0, 0)");
// console.log(module.exports.getUnbeatableAiCoordinates(board_4, "X"));
// board_5 = [
//   ["X", "O", "."],
//   ["X", ".", "."],
//   ["O", "O", "X"],
// ];
// console.log("The console.loged coordinate should always be (1, 1)");
// console.log(module.exports.getUnbeatableAiCoordinates(board_5, "O"));
// board_6 = [
//   ["O", "O", "."],
//   ["O", "X", "."],
//   [".", "X", "."],
// ];
// console.log("The console.loged coordinate should either (0, 2) or (2, 0)");
// console.log(module.exports.getUnbeatableAiCoordinates(board_6));
// }

// checkCoordinates();

async function testGame() {
  let board = boardFile.getEmptyBoard();
  let player = "O";
  let move = [];
  while (true) {
    console.clear();
    boardFile.displayBoard(board);
    if (player === "X" ? (player = "O") : (player = "X"));

    if (player === "X") {
      await module.exports.sleep(2000);
      // module.exports.timePosponed(1000);
      move = module.exports.getPlayerMove(board, player);
    } else {
      await module.exports.sleep(2000);
      // module.exports.timePosponed(1000);
      move = module.exports.getBeatableAiCoordinates(board, player);
    }
    board[move[0]][move[1]] = player;

    if (boardFile.getWinningPlayer(board) !== "None") {
      console.clear();
      console.log(boardFile.getWinningPlayer(board));
      boardFile.displayBoard(board);
      console.log("we have a winner");
      break;
    }
    if (boardFile.isBoardFull(board)) {
      console.clear();
      boardFile.displayBoard(board);
      console.log("It's a tie");
      break;
    }
  }
}
// testGame();

