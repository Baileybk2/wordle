/*-------------User Stories-------------*/

// As a user, I want to be able to select keyboard keys to create a 5-letter word🤩
// As a user, I want to be able to submit my word and see it displayed in the word-box🤩
// As a user, I want to be able to clearly see the letters change colors based on the "color-change criteria"🤩
// As a user, I want to see a clear message indicating that I have won or lost
// As a user I want to be able to reset the game to play again 🤩

/*-------------- Constants -------------*/

const keysNodeArray = document.querySelectorAll(".keys");
const keys = Array.from(keysNodeArray);

const backspace = document.querySelector("#backspace");

const submit = document.querySelector("#submit");

const reset = document.querySelector("#reset");

const winningMessage = document.querySelector("#win");
const losingMessage = document.querySelector("#lose");
const errorMessage = document.querySelector("#error");

/*---------- Variables (state) ---------*/

let letterBoxesNodeArray = document.querySelectorAll(".letter-box");
let letterBoxes = Array.from(letterBoxesNodeArray);

let currentBoxIndex = 0;

let matchedLetters = [];
let unmatchedLetters = [];
let doesNotExist = [];

let cantContinue = false; // use this for stopping at 5 letters
let mustSubmit = false; // use this too for stopping at 5 letters

/*-------------- Functions -------------*/

let generateMysteryWord = (words) => {
  let randomWordIndex = Math.floor(Math.random() * words.length);
  let randomMysteryWord = words[randomWordIndex];
  return randomMysteryWord;
};

let mysteryWord = generateMysteryWord(words);
console.log("initialization mystery word:", mysteryWord);

let mysteryWordArray = mysteryWord.split("").map((letter) => {
  return letter.toUpperCase();
});

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

// BACKSPACE
backspace.addEventListener("click", (event) => {
  if (!(currentBoxIndex % 5 === 0)) {
    letterBoxes[currentBoxIndex - 1].innerHTML = "";
    currentBoxIndex -= 1;
  }
});

// SUBMIT
submit.addEventListener("click", (event) => {
  let submissionIndex = [4, 9, 14, 19, 24, 29];
  let isSubmittable = submissionIndex.includes(currentBoxIndex - 1);

  if (isSubmittable) {
    let submittedChoice = letterBoxes.slice(
      currentBoxIndex - 5,
      currentBoxIndex
    );

    let playerChoices = submittedChoice.map((element) => {
      return element.innerHTML;
    });

    playerChoices.forEach((letter, index) => {
      let exactMatch = letter === mysteryWordArray[index];
      let partialMatch = mysteryWordArray.includes(letter);
      let noMatch = !exactMatch && !partialMatch;

      let updateKeyColors = () => {
        keys.forEach((key) => {
          if (key.innerHTML === letter) {
            let isMatchedSuccess = key.classList.contains("matched-success");
            let isPartialMatch = key.classList.contains("partial-macth");
            let isNoMatch = key.classList.contains("no-match");
            let noColor = !isMatchedSuccess && !isPartialMatch && !isNoMatch;
            if (noColor) {
              if (exactMatch) {
                key.classList.add("matched-success");
              } else if (partialMatch) {
                key.classList.add("partial-match");
              } else if (noMatch) {
                key.classList.add("no-match");
              }
            }
          }
        });
      };

      if (exactMatch) {
        submittedChoice[index].classList.add("matched-success");
        updateKeyColors();
      } else if (partialMatch) {
        submittedChoice[index].classList.add("partial-match");
        updateKeyColors();
      } else if (noMatch) {
        updateKeyColors();
      }
    });

    if (playerChoices.length === 0) {
      console.log("must submit words with 5 letters");
    }

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
  winningMessage.classList.add("hidden");
  losingMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  keys.forEach((key) => {
    key.classList.remove("matched-success");
    key.classList.remove("partial-match");
    key.classList.remove("no-match");
  });
};

// COMPARE ARRAYS

let compareArrays = (mysteryWordArray, playerChoices) => {
  let arrayToWord = playerChoices.join("").toLowerCase();
  console.log("coverted array:", arrayToWord);
  let arraysAreEqual = arraysEqual(mysteryWordArray, playerChoices);

  let lose = !arraysAreEqual && currentBoxIndex === 30;
  let error = !words.includes(arrayToWord) && !lose && !arraysAreEqual;

  if (arraysAreEqual) {
    matchedLetters = playerChoices;
    winningMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  } else if (lose) {
    losingMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  } else if (error) {
    errorMessage.classList.remove("hidden");
    let badBoxes = [
      currentBoxIndex - 1,
      currentBoxIndex - 2,
      currentBoxIndex - 3,
      currentBoxIndex - 4,
      currentBoxIndex - 5,
    ];
    let boxesToReset = letterBoxes.filter((box, index) => {
      return badBoxes.includes(index);
    });

    boxesToReset.forEach((box) => {
      box.classList.remove("matched-success");
      box.classList.remove("partial-match");
      box.innerHTML = "";
    });

    // keys.forEach((key) => {
    //   key.classList.remove("matched-success");
    //   key.classList.remove("partial-match");
    //   key.classList.remove("no-match");
    // });

    currentBoxIndex -= 5;
  } else {
    errorMessage.classList.add("hidden");
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

/*------------Code Graveyard-----------
To Do:
2. change color of submit button when reaching these indexes?
3. if 6th letter is attempted, no text should fill that index and a message should appear telling user to submit
*/
