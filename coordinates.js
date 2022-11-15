const prompt = require("prompt-sync")({sigint: true});

module.exports = {
  getPlayerMove: function (board, current_player) {
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

      userInput = prompt("Please enter the coordinates: ").toUpperCase().trim();
      // termination case
      if (userInput === "QUIT") {
        console.log("Sorry to see you go :( !!!");
        continue;
      }
      // conversion to coordinates
      if (/[A-C]/.test(userInput[0]) && /[1-3]/.test(userInput[1])) {
        let y = rowNames.indexOf(userInput[0]);
        let x = Number(userInput[1]) - 1;
        coordinates = [y, x];
      } else {
        console.log("Sorry I didn't understand, please try again.");
        continue;
      }
      // check if coordinates are free and returns them 
      if (this.isFieldFree(freeFields, coordinates)) {
        return coordinates;
      } else {
        console.log("This Field is already taken, please try again.");
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
    return [1, 1];
  },

  getFreeFields: function (board) {
    const freeField = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === ".") freeField.push([row, col]);
      }
    }
    return freeField;
  },

  isFieldFree: function (fieldList, coordinates) {
    for (const field of fieldList) {
      if (field[0] === coordinates[0] && field[1] === coordinates[1])
        return true;
    }
    return false;
  },
  getRandomInteger: function(maxValue){
    return Math.floor(Math.random() * maxValue);
  }
};

// run this function to test whether you have correctly implemented the other functions
function checkCoordinates() {
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

  board_2 = [
    ["O", "O", "."],
    ["X", "X", "."],
    ["X", "X", "O"],
  ];
  console.log("The console.loged coordinate should be only (0,2) or (1,2)");
  console.log(module.exports.getRandomAiCoordinates(board_2));
  console.log("The console.loged coordinate should be only (0,2) or (1,2)");
  console.log(module.exports.getRandomAiCoordinates(board_2));
  console.log("The console.loged coordinate should be only (0,2) or (1,2)");
  console.log(module.exports.getRandomAiCoordinates(board_2));

  board_3 = [
    ["O", "X", "X"],
    ["X", "O", "X"],
    ["X", "O", "X"],
  ];
  console.log("The console.loged coordinate should be None");
  console.log(module.exports.getRandomAiCoordinates(board_3));

  // board_4 = [
  //   [".", "O", "."],
  //   ["X", "O", "."],
  //   ["X", "X", "O"],
  // ];
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
}

checkCoordinates();