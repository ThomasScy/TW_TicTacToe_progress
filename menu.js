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
        console.log(`   Choose one of the following options! \n`);
        let startOptions = ""
            +"   1. Human vs Human\n" 
            +"   2. Random AI vs Random AI\n"
            +"   3. Human vs Random AI\n"
            +"   4. Human vs Unbeatable AI\n"
            +"   5. Human vs Beatable AI\n"
            +"   6. Unbeatable AI vs Unbeatable AI";
       
        console.log(startOptions +"\n");
    
        let userInput = prompt(`   Your decision is: `);

        let validInput = ["1", "2", "3", "4", "5", "6"];

        while (true) {
            if (validInput.includes(userInput)) {
                //console.clear();
                return userInput;
            } else if (userInput.toLowerCase() === "quit") {
                return "quit"
            } else {
                console.clear();
                console.log(`   "${userInput}" is no option! \n   Choose one of the following options:\n`);
                console.log(startOptions +"\n");
                
                userInput = prompt(` #  Your decision is: `);
                //console.clear();
            }
        }
    }
 }
// TEST FUNCTION
// run this function to test whether you have correctly implemented the other function
function checkOptions()
{
    let option = module.exports.getMenuOption();
    console.log("If the user selected 1, it should print 1");
    console.log(option);
}
//checkOptions();