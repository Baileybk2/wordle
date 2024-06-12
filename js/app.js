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
let doesNotExist = [];

let cantContinue = false;
let mustSubmit = false;
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
console.log("initialization mystery word:", mysteryWord);

// splitting the word in to an array to be compared with the players array
let mysteryWordArray = mysteryWord.split("").map((letter) => {
  return letter.toUpperCase();
});

// function will then need to compare the letters placement in each array for matching

// Need a function that runs the color change critera

// if letter in the letterbox is not equal to the letter in the mystery word and the letter doesnt exist in the myster word.. trun grey
// else if the letter in the letterbox is not equal to the letter in the mystery word but exists in the mystery word//turn yellow
// else the letter is in the mystery word and is equal to the letter in the mystery word.

// Need a function that changes the colors of the letter boxes based on the color-change criteria

// Need a function that shows a win or lose message depending on outcome

/*----------- Event Listeners ----------*/

// if 5th (or i % 5 === 0) index is attempted, no text should fill that index and a message should appear telling user to submit
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

// BACKSPACE
backspace.addEventListener("click", (event) => {
  if (!(currentBoxIndex % 5 === 0)) {
    letterBoxes[currentBoxIndex - 1].innerHTML = "";
    currentBoxIndex -= 1;
  }
});

// SUBMIT
// if user clicks submit at the 4, 9, 14, 19, 24, 29 index, run the compare arrays function, otherwise console log "word must be five letter "
// change color of submit button when reaching these indexes?

submit.addEventListener("click", (event) => {
  let submissionIndex = [4, 9, 14, 19, 24, 29];
  let isSubmittable = submissionIndex.includes(currentBoxIndex - 1);
  console.log("Submittable:", isSubmittable);

  if (isSubmittable) {
    let submittedChoice = letterBoxes.slice(
      currentBoxIndex - 5, // 0 start index
      currentBoxIndex // 5 end index
    );

    let playerChoices = submittedChoice.map((element) => {
      return element.innerHTML;
    });

    playerChoices.forEach((letter, index) => {
      let exactMatch = letter === mysteryWordArray[index];
      let partialMatch = mysteryWordArray.includes(letter);
      console.log("mysteryWordArrayindex:", mysteryWordArray[index]);
      console.log("letter:", letter);
      console.log("matched:", exactMatch);

      if (exactMatch) {
        submittedChoice[index].classList.add("matched-success");
      } else if (partialMatch) {
        submittedChoice[index].classList.add("partial-match");
      }
    });

    // the letter is in the array but doesn't match the index

    console.log("playerChoices.length", playerChoices.length);

    if (playerChoices.length === 0) {
      console.log("must submit words with 5 letters");
    }

    console.log(playerChoices);

    compareArrays(mysteryWordArray, playerChoices);
    playerChoices = [];
  }
});

// RESET GAME
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
  letterBoxes.forEach((box) => {
    box.classList.remove("matched-success");
    box.classList.remove("partial-match");
  });
  console.log("reset mystery word:", mysteryWord);
};

// COMPARE ARRAYS
// still need: function to compare the LETTER placement in the array
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
  } else {
    matchedLetters = playerChoices.filter((letter) =>
      mysteryWordArray.includes(letter)
    );
    unmatchedLetters = playerChoices.filter(
      (letter) => !mysteryWordArray.includes(letter)
    );
  }
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

/*------------Code Graveyard------------
console.log("hello world");
console.log(words);

*/
// To Do:
// match letter locations in the arrays
// apply all current logic to each row in word-box
// add color changes
