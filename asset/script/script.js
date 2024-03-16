const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
    //Selecting a random word and hint from  the  wordlist
    const{ word, hint} = wordlist[Math.floor(Math.random() * wordlist.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver =(isVictory) => {
    setTimeout(() =>{
        gameModal.classList.add("show");
    }, 300)
}

const initGame = (button, clickedLetter) => {
    // checking if clickedLetter is exist on the currentword
    if (currentWord.includes(clickedLetter)) {
        //Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `asset/hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Caling gameOver buttons and adding event listeners
    if (wrongGuessCount === maxGuesses) return gameOver(false) ;
    if (correctLetters.length === currentWord.length) return gameOver(true) ;
        
    }

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();