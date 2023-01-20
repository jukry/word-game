const page = document
const API_ENDPOINT = "https://words.dev-apis.com/word-of-the-day/"
const grid = document.getElementsByClassName("grid-item")
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const infoEl = document.getElementById("info")
let tryNum = 0
let wordArr = []
let winner = false

async function fetchWord(url) {
    const response = await fetch(url)
    const responseBody = await response.json()
    const {word} = responseBody
    return word
}

let wordToGuess = await fetchWord(API_ENDPOINT)
//let wordToGuess = "ivory"
let wordToGuessArr = wordToGuess.split("")

page.addEventListener("keydown",(e) => {
    
    if ((alphabet.includes(e.key.toUpperCase()) || e.key == "Enter" || e.key == "Backspace") && winner == false) {
        commitLetter(e.key)
    }
})

function commitLetter(keyPressed) {
    // row selector
    const gridElement = grid[tryNum].children
    if (keyPressed == "Backspace") {
        // remove last letter
        wordArr.pop()
        gridElement[wordArr.length].innerHTML = ""
    } else if (keyPressed == "Enter"  && wordArr.length === wordToGuess.length) {
        // check if word is correct or has matching letters when Enter is pressed
        checkWord(wordArr)
        tryNum++
        wordArr = []
    } else if (wordArr.length < 5 && alphabet.includes(keyPressed.toUpperCase())) {
        // add pressed letter in uppercase to the correct row, using wordArr.length value as index
        gridElement[wordArr.length].innerHTML = keyPressed.toUpperCase()
        wordArr.push(keyPressed)
    }
}

let map = makeMap(wordToGuessArr)

function checkWord(word) {
    // wordArr to string
    let wordToString = word.toString().replaceAll(",","")

    if (wordToString == wordToGuess) {
        checkLetters(wordToString)
        infoEl.innerHTML = `Correct, the word is ${wordToGuess}`
        winner = true
        return
    } else {
        checkLetters(wordToString)
    }
}

function checkLetters(wordFromCheckWord) {
    for (let i = 0;i < wordFromCheckWord.length;i++) {
        const gridElement = grid[tryNum].children[i]
        
        if (wordFromCheckWord[i] == wordToGuess[i]) {
            gridElement.classList.toggle("correct")
            map[wordFromCheckWord[i]]--
        }
    }
    for (let i = 0;i < wordFromCheckWord.length;i++) {
        const gridElement = grid[tryNum].children[i]

        if (wordFromCheckWord[i] == wordToGuess[i]) {
            // do nothing
        } else if (wordToGuessArr.includes(wordFromCheckWord[i]) && map[wordFromCheckWord[i]] > 0) {
            gridElement.classList.toggle("includes")
            
        } else {
            gridElement.classList.toggle("wrong")
        }
    }
}

function makeMap(array) {
    const obj = {}
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (obj[letter]) {
            obj[letter]++
        } else {
            obj[letter] = 1
        }
    }
    return obj
}