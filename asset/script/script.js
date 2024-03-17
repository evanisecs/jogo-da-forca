const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `asset/hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");          
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //Selecting a random word and hint from  the  wordlist
    const{ word, hint} = wordlist[Math.floor(Math.random() * wordlist.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();    
}   
    
const gameOver =(isVictory) => {
    //After 600ms of game complete.. showing modal with relevant details
    setTimeout(() =>{
        const modaltext = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `asset/hangman-game-images/images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modaltext} <b>${currentWord}</b>`;
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
playAgainBtn.addEventListener("click", getRandomWord);