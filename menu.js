module.exports = {
    getMenuOption: function() {
        /*
        Should print a menu with the following options:
        1. Human vs Human
        2. Random AI vs Random AI
        3. Human vs Random AI
        4. Human vs Unbeatable AI
        The function should return a number between 1-4.
        If the user will enter invalid data (for example 5), than a message will appear
        asking to input a new value.
        */

        const prompt = require("prompt-sync")();
        console.log(`Choose one of the following options!`);
        let startOptions = `
    1. Human vs Human
    2. Random AI vs Random AI
    3. Human vs Random AI
    4. Human vs Unbeatable AI
    5. Human vs Beatable AI
    6. Unbeatable AI vs Unbeatable AI \n`;
        console.log(startOptions);
    
        let userInput = prompt(`Your decision is: `);
    
        let validInput = ["1", "2", "3", "4"]
        while (true) {
           if (validInput.includes(userInput)) {
                return parseInt(userInput);
       
           } else {
                console.log(`"${userInput}" is no option! Choose one of the following options!`);
                console.log(startOptions);
                
                userInput = prompt();
           }
       }
    }
 }

// run this function to test whether you have correctly implemented the other function
function checkOptions()
{
    let option = module.exports.getMenuOption();
    console.log("If the user selected 1, it should print 1");
    console.log(option);
}
checkOptions();