/*-------------User Stories-------------*/

// As a user, I want to be able to select keyboard keys to create a 5-letter word
// As a user, I want to be able to submit my word and see it displayed in the word-box
// As a user, I want to be able to clearly see the letters change colors based on the "color-change criteria"
// As a user, I want to see a clear message indicating that I have won or lost
// As a user I want to be able to reset the game to play again

/*-------------- Constants -------------*/

const keys = document.querySelectorAll(".keys");

const backspace = document.querySelector("#backspace");

/*---------- Variables (state) ---------*/
let mysteryWord = ""; // random() select
let letterBoxes = document.querySelectorAll(".letter-box");
let currentBoxIndex = 0;

/*----- Cached Element References  -----*/

/*-------------- Functions -------------*/

// Need function that selects a mystery word from the "words" array

// Need function that stores the letters selected from the keyboard
// Need a function that runs the color change critera

// Need a function that changes the colors of the letter boxes based on the color-change criteria

// Need a function that shows a win or lose message depending on outcome

// Need a function that will reset the game if the "reset" button is clicked

/*----------- Event Listeners ----------*/

keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    console.log("key text:", event.target.innerText);
    // letterBoxes[0].innerHTML = event.target.innerText;
    for (let i = 0; i < letterBoxes.length; i++) {
      if (letterBoxes[i].innerHTML === "") {
        letterBoxes[i].innerHTML = event.target.innerText;
        currentBoxIndex = currentBoxIndex + 1;
        break;
      }
    }
  });
});

backspace.addEventListener("click", (event) => {
  letterBoxes[i] === "";
});

// if user is at the final index (4) and doesn't click submit, show error message

/*------------Code Graveyard------------
console.log("hello world");
console.log(words);

*/
