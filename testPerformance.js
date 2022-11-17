const menu = require("./menu"); // use it e.g. like menu.get_menu_option()
const boardFile = require("./board");
const coordinate = require("./coordinates");
const {
  getPlayerMove,
  getRandomAiCoordinates,
  getUnbeatableAiCoordinates,
  getBeatableAiCoordinates,
} = require("./coordinates");
const { isBoardFull, displayBoard } = require("./board");
const coordinates = require("./coordinates");

/**
 * Fuunction should test performance of given functions
 * during the gameplay
 * @param {*} board
 * @param {*} firstFunc
 * @param {*} secondFunc
 * @param {*} tests
 */
function testPerformanceRvsR(firstFunction, secondFunction, tests) {
  let dataFirstFunc = {
    win_X: 0,
    lose_X: 0,
    tie: 0,
    time: 0,
    tests: tests,
  };
  let today = new Date();
  let startTime = today.getSeconds() + today.getMinutes() * 60;

  for (let i = 0; i < tests; i++) {
    let board = boardFile.getEmptyBoard();
    let player = "O";
    let move = [];

    while (true) {
      if (player === "X" ? (player = "O") : (player = "X"));
      //   move = coordinate.getRandomAiCoordinates(board, player);
      if (player === "X") move = firstFunction(board, player);
      else move = secondFunction(board, player);
      board[move[0]][move[1]] = player;

      if (boardFile.getWinningPlayer(board) !== "None") {
        if (player === "X") dataFirstFunc.win_X += 1;
        if (player === "O") dataFirstFunc.lose_X += 1;
        break;
      }
      if (boardFile.isBoardFull(board)) {
        dataFirstFunc.tie += 1;
        break;
      }
    }
  }

  today = new Date();
  let endTime = today.getSeconds() + today.getMinutes() * 60;

  dataFirstFunc.time += endTime - startTime;

  return dataFirstFunc;
}

//   let aiRandomFunc = coordinate.getRandomAiCoordinates;
// console.log(module.exports.getRandomAiCoordinates(boardFile.getEmptyBoard(),"X"));
function testAll(tests) {
  let allTests = [];
  let data = {};
  let testNum = tests;

  // test Random AI vs Random AI
  data = testPerformanceRvsR(
    (b, p) => coordinates.getRandomAiCoordinates(b, p),
    (b, p) => coordinates.getRandomAiCoordinates(b, p),
    testNum
  );
  data.X_vs_O = "Random AI vs. Random AI";
  allTests.push(data);
  // test Random AI vs Beatable AI
  data = testPerformanceRvsR(
    (b, p) => coordinates.getRandomAiCoordinates(b, p),
    (b, p) => coordinates.getBeatableAiCoordinates(b, p),
    testNum
  );
  data.X_vs_O = "Random AI vs. Beatable AI";
  allTests.push(data);
  // test Random AI vs Unbeatable AI
  data = testPerformanceRvsR(
    (b, p) => coordinates.getRandomAiCoordinates(b, p),
    (b, p) => coordinates.getUnbeatableAiCoordinates(b, p),
    testNum
  );
  data.X_vs_O = "Random AI vs. Unbeatable AI";
  allTests.push(data);
  // test Beatable AI vs Beatable AI
  data = testPerformanceRvsR(
    (b, p) => coordinates.getBeatableAiCoordinates(b, p),
    (b, p) => coordinates.getBeatableAiCoordinates(b, p),
    testNum
  );
  data.X_vs_O = "Beatable AI vs. Beatable AI";
  allTests.push(data);
  // test Beatable AI vs Unbeatable AI
  data = testPerformanceRvsR(
    (b, p) => coordinates.getBeatableAiCoordinates(b, p),
    (b, p) => coordinates.getUnbeatableAiCoordinates(b, p),
    testNum
  );
  data.X_vs_O = "Beatable AI vs. Unbeatable AI";
  allTests.push(data);
  // test Unbeatable AI vs Unbeatable AI
  data = testPerformanceRvsR(
    (b, p) => coordinates.getUnbeatableAiCoordinates(b, p),
    (b, p) => coordinates.getUnbeatableAiCoordinates(b, p),
    testNum
  );
  data.X_vs_O = "Unbeatable AI vs. Unbeatable AI";
  allTests.push(data);

  function displyResults() {
    // display results
    console.clear();
    console.log(Object.keys(allTests[0]).join("\t") + "\n");

    for (let i = 0; i < allTests.length; i++) {
      let line = [];
      for (let key in allTests[i]) {
        line.push(allTests[i][key]);
      }
      console.log(line.join("\t") + "\n");
    }
  }

  console.table(allTests);
}

testAll(1000);
