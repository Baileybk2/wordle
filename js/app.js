/*-------------User Stories-------------*/

// As a user, I want to be able to select keyboard keys to create a 5-letter word
// As a user, I want to be able to submit my word and see it displayed in the word-box
// As a user, I want to be able to clearly see the letters change colors based on the "color-change criteria"
// As a user, I want to see a clear message indicating that I have won or lost
// As a user I want to be able to reset the game to play again

/*-------------- Constants -------------*/

// grabs all "keys" and makes a usable array
const keysNodeArray = document.querySelectorAll(".keys");
const keys = Array.from(keysNodeArray);

// grabs "backspace" button
const backspace = document.querySelector("#backspace");

// grabs "submit" button
const submit = document.querySelector("#submit");

// grabs "reset" button
const reset = document.querySelector("#reset");

const win = document.querySelector("#win");

/*---------- Variables (state) ---------*/

// grabs all letterboxes and makes a usable array
let letterBoxesNodeArray = document.querySelectorAll(".letter-box");
let letterBoxes = Array.from(letterBoxesNodeArray);
// console.log(letterBoxes);

// creates a current box index variable to be used with button selections later
let currentBoxIndex = 0;

// variables to store used letters
let matchedLetters = [];
let unmatchedLetters = [];

/*----- Cached Element References  -----*/

/*-------------- Functions -------------*/

// Mystery word selection
let generateMysteryWord = (words) => {
  let randomWordIndex = Math.floor(Math.random() * words.length);
  let randomMysteryWord = words[randomWordIndex];
  return randomMysteryWord;
};

// calling function to generate the word for the game
let mysteryWord = generateMysteryWord(words);
console.log("initialization mystery work:", mysteryWord);

// splitting the word in to an array to be compared with the players array
let mysteryWordArray = mysteryWord.split("").map((letter) => {
  return letter.toUpperCase();
});
//console.log(mysteryWordArray);

// Need a function that compares the players choice and the mystery word

// function will need to add the letters in each letter box to an array
// function will need to split the mystery word in to its own array and convert everything to uppercase
// function will then need to compare the letters placement in each array for matching

// Need function that stores the letters selected from the keyboard
// Need a function that runs the color change critera

// if letter in the letterbox is not equal to the letter in the mystery word and the letter doesnt exist in the myster word.. trun grey
// else if the letter in the letterbox is not equal to the letter in the mystery word but exists in the mystery word//turn yellow
// else the letter is in the mystery word and is equal to the letter in the mystery word.

// Need a function that changes the colors of the letter boxes based on the color-change criteria

// Need a function that shows a win or lose message depending on outcome

// Need a function that will reset the game if the "reset" button is clicked

/*----------- Event Listeners ----------*/

keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    for (let i = 0; i < letterBoxes.length; i++) {
      if (letterBoxes[i].innerHTML === "") {
        letterBoxes[i].innerHTML = event.target.innerText;
        currentBoxIndex += 1;
        break;
      }
    }
  });
});

backspace.addEventListener("click", (event) => {
  console.log("key text:", event.target.innerText);
  letterBoxes[currentBoxIndex - 1].innerHTML = "";
  currentBoxIndex -= 1;
});

submit.addEventListener("click", (event) => {
  let submittedChoice = letterBoxes.slice(0, 5);

  let playerChoices = submittedChoice.map((element) => {
    return element.innerHTML;
  });
  console.log(playerChoices);

  compareArrays(mysteryWordArray, playerChoices);
});

reset.addEventListener("click", (event) => {
  resetGame();
});

let resetGame = () => {
  letterBoxes.forEach((box) => {
    box.innerHTML = "";
  });
  mysteryWord = generateMysteryWord(words);
  currentBoxIndex = 0;
  matchedLetters = [];
  unmatchedLetters = [];
  mysteryWordArray = mysteryWord.split("").map((letter) => {
    return letter.toUpperCase();
  });

  console.log("reset mystery word:", mysteryWord);
};

// function to compare arrays
// first just check to see if letter indexes match
let compareArrays = (mysteryWordArray, playerChoices) => {
  console.log(
    "mysteryWordArray, playerChoices",
    mysteryWordArray,
    playerChoices
  );

  let arraysAreEqual = arraysEqual(mysteryWordArray, playerChoices);
  console.log("arrays are equal:", arraysAreEqual);

  if (arraysAreEqual) {
    matchedLetters = playerChoices;
    console.log("You Win!");
  } else {
    matchedLetters = playerChoices.filter((letter) =>
      mysteryWordArray.includes(letter)
    );
    unmatchedLetters = playerChoices.filter(
      (letter) => !mysteryWordArray.includes(letter)
    );
  }
  console.log("matched letters array:", matchedLetters);
  console.log("unmatched letters array:", unmatchedLetters);
};

let arraysEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  let isEqual = true;

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return (isEqual = false);
    }
  }

  return isEqual;
};

// make a "submit" button event listener that on "click" takes the player's choice of letters and crates a new array

// if user is at the final index (4) and doesn't click submit, show error message

/*------------Code Graveyard------------
console.log("hello world");
console.log(words);

*/
// To Do:
// match letter locations in the arrays
// apply all current logic to each row in word-box
// add color changes
// apply functionality to "reset" button
