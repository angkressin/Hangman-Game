//////beginning of all global variables

//identify letters
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//set an array of sports
var sports = [
  'archery', 'athletics', 'badminton', 'basketball', 'volleyball', 'boxing', 'diving', 'fencing', 'football', 'golf', 'gymnastics', 'handball', 'hockey', 'judo', 'pentathlon', 'rowing', 'rugby', 'sailing', 'shooting', 'swimming', 'taekwondo', 'tennis', 'triathlon', 'volleyball', 'weightlifting', 'wrestling',
]

//set object messages
var messages = {
  win: 'You win!',
  lose: 'You lost!',
  ultWin: 'You won the game!',
  ultLose: 'You lost the game! Game Over!',
  guessed: 'You already guessed this letter, please try again...',
  invalidLetter: 'Please enter a letter from A-Z',
  trueLetter: '',
}

//set wins to zero
var wins = 0;

//set losses to zero
var losses = 0;

//set number of guesses left
var guessesLeft = 9

//set the starting file number for hangman image
var hangman = 1

//empty array for letters used
var usedLetters = []

//identify undefined variables
var answer
var hiddenAnswerArr
var hiddenAnswerStr
var userGuess

//////end global variables



/////beginning of functions

// Selects random answer from sports array
function selectWord() {
  var i = Math.floor(Math.random() * (sports.length))
  var selectedWord = sports[i]
  sports.splice(i, 1)
  return selectedWord
}

// Creates array with same num of "_"s as letters in answer
function hideAnsArr(ansToHide) {
  var hidAnsArr = []
  for (var i = 0; i < ansToHide.length; i++) {
    hidAnsArr.push("_")
  }
  return hidAnsArr
}



// Creates string with same num of "_"s as letters in answer (with spaces)
function hideAnsStr(ansToHide) {
  var arrToString = hideAnsArr(ansToHide)
  var blankAnswer = arrToString.join(" ")
  return blankAnswer
}



// Starts or restarts game
function start() {
  answer = selectWord()
  hiddenAnswerArr = hideAnsArr(answer)
  hiddenAnswerStr = hideAnsStr(answer)
  console.log(answer)
  console.log(hiddenAnswerArr)
  console.log(hiddenAnswerStr)
  document.getElementById("guess").innerHTML = hiddenAnswerStr;
  document.getElementById("guessesLeft").innerHTML = "# of guesses left: " + guessesLeft;
  document.getElementById("wins").innerHTML = "Wins: " + wins;
  document.getElementById("losses").innerHTML = "Losses: " + losses;
  getInput()
}



function isGuessValid(guess) {
  if (alphabet.indexOf(guess) === -1) {
    document.getElementById("output").innerHTML = messages.invalidLetter
    return false
  } else if (usedLetters.indexOf(guess) !== -1) {
    document.getElementById("output").innerHTML = messages.guessed
    return false
  } else {
    return true
  }
}



function checkGuess(guess) {
  guess = guess.key
  guess = guess.toLowerCase()
  if (isGuessValid(guess) === true && (answer.indexOf(guess) > -1)) {
    document.getElementById("output").innerHTML = messages.trueLetter
    replaceUnderscores(guess)
    didUserWin()
  } else if (isGuessValid(guess) === true){
    document.getElementById("output").innerHTML = messages.trueLetter
    guessesLeft--
    hangman++
    usedLetters.push(guess)
    document.getElementById("guessesLeft").innerHTML = "# of guesses left: " + guessesLeft
    document.getElementById("hangman").src = "assets/images/hangman" + hangman + ".png"
    document.getElementById("alreadyUsed").innerHTML = usedLetters.join(", ")
    didUserLose()
  } else {
    getInput()
  }
}



// Replaces underscore with userGuess
function replaceUnderscores(guess) {
  for (var i = 0; i < answer.length; i++) {
    if (answer[i] === guess) {
      hiddenAnswerArr[i] = guess
    }
    hiddenAnswerStr = hiddenAnswerArr.join(" ")
    document.getElementById("guess").innerHTML = hiddenAnswerStr
  }
}

// Check to see if user won
function didUserWin() {
  if (hiddenAnswerArr.indexOf("_") === -1) {
    wins++
    document.getElementById("wins").innerHTML = "Wins: " + wins
    //and sports image replaces hangman image
    document.getElementById("hangman").src = "assets/images/sports/" + answer + ".png"
    if (wins === 3) {
      document.getElementById("output").innerHTML = message.ultWin
      /////// create a popup congratulations window
    } else {
      ///////STOP WAITING FOR INPUT AND ADD A BUTTON FOR NEW WORD
      /////// set guessesLeft back to 9
      /////// Create a button that runs start()
    }
  } else {
    getInput()
  }
}

// Check to see if user lost
function didUserLose() {
  if (guessesLeft === 0) {
    losses++
    document.getElementById("losses").innerHTML = "Losses: " + losses
    if (losses === 3) {
      document.getElementById("output").innerHTML = message.ultLose
      ///Create a popup you suck window
    } else {
      ///////
      ///////set guesses back to 9
      /////// Create a button that runs start()
    }
  } else {
    getInput()
  }
}

start()

//listens to input

function getInput() {
  document.addEventListener('keydown', checkGuess, {once: true})
}



//if in alphabet && if letter is already guessed
/*if ((alphabet.indexOf(userGuess) > -1) && (usedLetters.indexOf(userGuess) === -1)) {
    //clears previous inValid message with empty string
    document.getElementById("output").innerHTML = messages.trueLetter
    //check if user guess matches answer
    var correct = false
    for (var j = 0; j < answer.length; j++) {
      if (answer[j] === userGuess) {
        //replaces underscore with userGuess
        correct = true
        hiddenAnswer[j] = userGuess;
        document.getElementById("guess").innerHTML = hiddenAnswer.join(" ");
      }
      //if all underscores are replaced by letter then wins increase by one
      if (hiddenAnswer.indexOf("_") === -1) {
          wins++
          document.getElementById("wins").innerHTML = "Wins: " + wins;
          //and sports image replaces hangman image
          document.getElementById("hangman").src = "assets/images/sports/" + answer + ".png"
          //and button appears for a new word button
        }
      }
      //if userGuess does not match
      if (correct === false) {
      //guess decrease by 1
        if ((guessesLeft >= 1) && (hiddenAnswer.indexOf("_") !== -1)) {
        guessesLeft--
        document.getElementById("guessesLeft").innerHTML = "# of guesses left: " + guessesLeft
          if (guessesLeft === 0) {
          losses++
          document.getElementById("losses").innerHTML = "Losses: " + losses;
            }
        //hangman image changes
        hangman++
        document.getElementById("hangman").src = "assets/images/hangman" + hangman + ".png"
        //record input by pushing to usedLetters array
        usedLetters.push(userGuess)
        //list the usedLetters
        wrongGuesses.push(userGuess)
        var usedLetters = wrongGuesses.join(", ")
        console.log(wrongGuesses)
        document.getElementById("alreadyUsed").innerHTML = usedLetters
      }
    }
}*/
//if remaining guess reaches zero, stop game,
//and losses increase by one
//and button appears for a new word button




//if wins reaches 10, pop-up, You've won the whole game!
//else if loss reaches 10, print Sorry! You lose!
//new word starts
