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

/*-------------- Functions -------------*/

let generateMysteryWord = (words) => {
  let randomWordIndex = Math.floor(Math.random() * words.length);
  let randomMysteryWord = words[randomWordIndex];
  return randomMysteryWord;
};

let mysteryWord = generateMysteryWord(words);

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

backspace.addEventListener("click", (event) => {
  if (!(currentBoxIndex % 5 === 0)) {
    letterBoxes[currentBoxIndex - 1].innerHTML = "";
    currentBoxIndex -= 1;
  }
});

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

            if (noColor || partialMatch) {
              if (exactMatch) {
                key.classList.remove("partial-match");
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

    compareArrays(mysteryWordArray, playerChoices);
    playerChoices = [];
  }
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
  letterBoxes.forEach((box) => {
    box.classList.remove("matched-success");
    box.classList.remove("partial-match");
  });
  winningMessage.classList.add("hidden");
  losingMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  keys.forEach((key) => {
    key.classList.remove("matched-success");
    key.classList.remove("partial-match");
    key.classList.remove("no-match");
  });
};

let compareArrays = (mysteryWordArray, playerChoices) => {
  let arrayToWord = playerChoices.join("").toLowerCase();
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
