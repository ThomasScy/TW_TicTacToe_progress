const menu = require("./menu"); // use it e.g. like menu.get_menu_option()
const board = require("./board");
const coordinate = require("./coordinates");
const { getPlayerMove, getRandomAiCoordinates, getUnbeatableAiCoordinates, getBeatableAiCoordinates } = require("./coordinates");
const { isBoardFull, displayBoard } = require("./board");

const HUMAN_VS_HUMAN = 1;
const RANDOM_AI_VS_RANDOM_AI = 2;
const HUMAN_VS_RANDOM_AI = 3;
const HUMAN_VS_UNBEATABLE_AI = 4;
const SLEEPTIME = 2000; // in ms

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function main() {
  let gameMode = menu.getMenuOption();
  let gameBoard = board.getEmptyBoard();
  let isGameRunning = true;
  let currentPlayer = "O";
  
  while (isGameRunning) {
    if (gameMode === "quit") {
      console.log("   Sorry to see you go :( !!!");
      break;
    }
    console.clear();
    board.displayBoard(gameBoard, gameMode);

    /* TODO 
  
        based on the values of `winning_player` and `its_a_tie` the program
        should either stop displaying a winning/tie message 
        OR continue the while loop
        */
    let winningPlayer = board.getWinningPlayer(gameBoard);
    let itsATie = board.isBoardFull(gameBoard);
    
    //added by Thomas
    if (winningPlayer === "X" || winningPlayer === "O") {
      console.log(`   PLAYER ${winningPlayer} WINS!`)
      break;
    } else if (itsATie) {
      console.log(`   It's a tie.`);
      break;
    }
    
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
    coord = coordinate.getPlayerMove(gameBoard, currentPlayer);
  } else if (/[3-5]/.test(gameMode) && currentPlayer === "X") {
    coord = coordinate.getPlayerMove(gameBoard, currentPlayer);
  } else if (gameMode === "2") {
    coord = coordinate.getRandomAiCoordinates(gameBoard, currentPlayer);
      await sleep(SLEEPTIME);
    } else if (gameMode === "3" && currentPlayer === "O") {
      coord = coordinate.getRandomAiCoordinates(gameBoard, currentPlayer);
      await sleep(SLEEPTIME);
    } else if (gameMode === "4" && currentPlayer === "O") {
      coord = coordinate.getUnbeatableAiCoordinates(gameBoard, currentPlayer);
      await sleep(SLEEPTIME);
    } else if (gameMode === "6") {
      coord = coordinate.getUnbeatableAiCoordinates(gameBoard, currentPlayer);
      await sleep(SLEEPTIME);
    } else if (gameMode === "5" && currentPlayer === "O") {
      coord = coordinate.getBeatableAiCoordinates(gameBoard, currentPlayer);
      await sleep(SLEEPTIME);
    }
    
    if (coord === "None") {break};
    
    gameBoard[coord[0]][coord[1]] = currentPlayer;
    
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