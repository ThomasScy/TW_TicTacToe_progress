const menu = require("./menu"); // use it e.g. like menu.get_menu_option()
const board = require("./board");
const coordinate = require("./coordinates");
const { getPlayerMove, getRandomAiCoordinates, getUnbeatableAiCoordinates, getBeatableAiCoordinates } = require("./coordinates");
const { isBoardFull } = require("./board");

const HUMAN_VS_HUMAN = 1;
const RANDOM_AI_VS_RANDOM_AI = 2;
const HUMAN_VS_RANDOM_AI = 3;
const HUMAN_VS_UNBEATABLE_AI = 4;

function main() {
  let gameMode = menu.getMenuOption();
  let gameBoard = board.getEmptyBoard();
  let isGameRunning = true;
  let currentPlayer = "O";

  while (isGameRunning) {
    if (gameMode === "quit") {
      console.log(`BYE BYE`);
      break;
    }
    board.displayBoard(gameBoard);
    /* TODO

    in each new iteration of the while loop the program should 
    alternate the value of `currentPlayer` from `X` to `O`
    */

    currentPlayer = changePlayer(currentPlayer); //added by Thomas
    //console.log(currentPlayer); //TEST
    
 

    /* TODO

        based on the value of the variables `game_mode` and `currentPlayer` 
        the programm should choose between the functions
        get_random_ai_coordinates or get_unbeatable_ai_coordinates or get_human_coordinates
        */
    let coord = [];

    
    
    if (gameMode === "1") {
      coord = getPlayerMove(gameBoard, currentPlayer);
    } else if (/[3-5]/.test(parseInt(gameBoard)) && currentPlayer === "X") {
      coord = getPlayerMove(gameBoard, currentPlayer);
    } else if (gameMode === "2") {
      coord = getRandomAiCoordinates(gameBoard, currentPlayer);
    } else if (gameMode === "3" && currentPlayer === "O") {
      coord = getRandomAiCoordinates(gameBoard, currentPlayer);
    } else if (gameMode === "4" && currentPlayer === "O") {
      coord = getUnbeatableAiCoordinates(gameBoard, currentPlayer);
    } else if (gameMode === "6") {
      coord = getUnbeatableAiCoordinates(gameBoard, currentPlayer);
    } else if (gameBoard === "5" && currentPlayer === "O") {
      coord = getBeatableAiCoordinates(gameBoard, currentPlayer);
    }
    
    if (coord === "None") {break};
    
    gameBoard[coord[0]][coord[1]] = currentPlayer;
    
    /* TODO 

        based on the values of `winning_player` and `its_a_tie` the program
        should either stop displaying a winning/tie message 
        OR continue the while loop
        */
    let winningPlayer = board.getWinningPlayer(gameBoard);
    let itsATie = board.isBoardFull(gameBoard);
    
    //added by Thomas
    if (winningPlayer === "X" || winningPlayer === "O") {
      console.log(`PLAYER ${winningPlayer} WINS!`)
      break;
    } else if (itsATie) {
      console.log(`It's a tie.`);
      break;
    }
  }
}

main();



// add by Thoma
// purpose: When the user has chosen a tile, the program switch to another player.
// argument: null
// return: currentPlayer
function changePlayer(currentPlayer) {

  // let playerChange = true; 

  // if (playerChange === true) {
  //   playerChange  = false;
  //   currentplayer = "X"
  // } else if (playerChange === false) {
  //   playerChange = true;
  //   currentPlayer = "O"
  // }
  
  return currentPlayer === "X" ? "O" : "X"
}