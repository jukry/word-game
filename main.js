const page = document
const API_ENDPOINT = "https://words.dev-apis.com/word-of-the-day/"
const grid = document.getElementsByClassName("grid-item")
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const infoEl = document.getElementById("info")
let tryNum = 0

async function fetchWord(url) {
    const response = await fetch(url)
    const responseBody = await response.json()
    const {word} = responseBody
    return word
}

// let wordToGuess = await fetchWord(API_ENDPOINT)
let wordToGuess = "await"
console.log(wordToGuess)

page.addEventListener("keydown",(e) => {
    if (alphabet.includes(e.key.toUpperCase()) || e.key == "Enter" || e.key == "Backspace") {
        doStuff(e.key)
    }
})

let wordArr = []
function doStuff(keyPressed) {
    const gridElement = grid[tryNum].children
    if (keyPressed == "Backspace") {
        // remove last letter
        wordArr.pop()
        gridElement[wordArr.length].innerHTML = ""
    } else if (keyPressed == "Enter") {
        // check if word is correct or has matching letters
        checkWord()
        tryNum++
        wordArr = []
    } else if (wordArr.length < 5) {
        gridElement[wordArr.length].innerHTML = keyPressed.toUpperCase()
        wordArr.push(keyPressed)
    }
}

function checkWord() {
    let word = wordArr.toString().replaceAll(",","")
    if (word == wordToGuess) {
        checkLetters(word)
        infoEl.innerHTML = `Correct, the word is ${wordToGuess}`
        page.removeEventListener("keydown")
        return
    } else {
        checkLetters(word)
    }
}

function checkLetters(wordFromCheckWord) {
    for (let i = 0;i < wordFromCheckWord.length;i++) {
        const gridElement = grid[tryNum].children[i]

        if (wordFromCheckWord[i] == wordToGuess[i]) {
            gridElement.classList.toggle("correct")
            
        } else if (wordToGuess.includes(wordFromCheckWord[i])) {
            console.log(wordToGuess.includes(wordFromCheckWord[i]),wordFromCheckWord[i])
            for (let j = 0; j < wordToGuess.length; j++) {
                gridElement.classList.toggle("includes")
                
            }
            // pitää tarkistaa löytyykö sanasta jostain x kirjain jostain muusta kohtaa
            console.log(`${wordFromCheckWord[i]} ${wordToGuess.split(wordFromCheckWord[i]).length-1}`) // etsi indeksi kirjaimelle
            
        }
    }
}
