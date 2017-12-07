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
  ultWin: 'Congratulations! You won the whole game! To play again, refresh page',
  ultLose: 'Sorry! You lost the game! Try again in four years! To play again, refresh page',
  guessed: 'You already guessed this letter, please try again...',
  invalidLetter: 'Please enter a letter from A-Z',
  trueLetter: '',
  newWordWon: 'You got it! Start guessing the new word',
  newWordLost: 'Womp Womp! Start guessing the new word',
}

//set wins to zero
var wins = 0;

//set losses to zero
var losses = 0;

//set number of guesses left
var guessesLeft

//set the starting file number for hangman image
var hangman

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
  hangman = 1
  guessesLeft = 9
  usedLetters = []
  document.getElementById("guess").innerHTML = hiddenAnswerStr;
  document.getElementById("guessesLeft").innerHTML = "# of guesses left: " + guessesLeft;
  document.getElementById("wins").innerHTML = "Wins: " + wins;
  document.getElementById("losses").innerHTML = "Losses: " + losses;
  document.getElementById("alreadyUsed").innerHTML = ""
  usedLetters.pop(usedLetters.length)
  //hideButton()
  getInput()
}

// check if in alphabet and if used already
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


// pull in all functions to check answer
function checkGuess(guess) {
  guess = guess.key
  guess = guess.toLowerCase()
  if (isGuessValid(guess) === true && answer.indexOf(guess) > -1) {
    document.getElementById("output").innerHTML = messages.trueLetter
    replaceUnderscores(guess)
    didUserWin()
  } else if (isGuessValid(guess) === true) {
    document.getElementById("output").innerHTML = messages.trueLetter
    document.getElementById("guessesLeft").innerHTML = "# of guesses left: " + guessesLeft;
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
    document.getElementById("output").innerHTML = messages.newWordWon
    if (wins === 5) {
      document.getElementById("output").innerHTML = messages.ultWin
    } else {
      getInput()
      start()
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
    document.getElementById("output").innerHTML = messages.newWordLost
    if (losses === 5) {
      document.getElementById("output").innerHTML = messages.ultLose
    } else {
      getInput()
      start()
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
