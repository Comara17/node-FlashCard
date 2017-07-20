//inquirer provides CLI 
//FS is required to store previous entries in a log.txt
var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require('./basicCard.js');
var ClozeCard = require("./clozeCard.js");

console.log("____________________________ FlashCards ____________________________");
//Starting prompt 
function start() {
    inquirer.prompt({
            type: "list",
            message: "Welcome to node FlashCards, select an option.",
            choices: ["Create a new card", "Practice your cards"],
            name: "intro"
        })
        .then(function (response) {
            console.log("\n");
            if (response.intro == "Create a new card") {
                createCard();
            } else {
               console.log("practiceSet() function is not complete.")
               start();
            }
        })
}
//flashCard.js can only store one set of flashcards, of type basic or cloze
//Ask user which type of card they wish to create
function createCard() {
    inquirer.prompt({
            type: "list",
            message: "Choose a card type:",
            choices: ["Basic Card", "Cloze Deletion Card"],
            name: "cardChoice"
        })
        .then(function (response) {
            if (response.cardChoice === "Basic Card") {
                basicCard();
            } else {
                clozeCard();
            }
        })
};
//basicCard() asks for a front and back text value and stores them in a new BasicCard object 
function basicCard() {
    inquirer.prompt([{
            type: "input",
            message: "Please input the front of your flashcard:",
            name: "front"
        },
        {
            type: "input",
            message: "Please input the back of your flashcard:",
            name: "back"
        }
    ])
    .then(function (response) {
        var newCard = new BasicCard(response.front, response.back);
        fs.appendFileSync("log.txt", JSON.stringify(newCard.full));
        start();
    })
};
//clozeCard() asks for a full question and a string to remove from that text, and stores them in a new ClozeCard object
function clozeCard() {
    inquirer.prompt([{
        type: "input",
        message: "A Cloze Deletion card has one part of a question missing.\n Please enter your entire question: ",
        name: "fullText"
    },
    {
        type: "input",
        message: "Input which part of the question you want to appear missing: ",
        name: "deletion"
    }])
    .then(function (response) {
        var newCard = new ClozeCard(response.fullText, response.deletion);
        fs.appendFileSync("log.txt", JSON.stringify(newCard.full));
        start();
    })
}

//Initializes CLI
start();