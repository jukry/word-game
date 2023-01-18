const page = document
const API_ENDPOINT = "https://words.dev-apis.com/word-of-the-day/"
const grid = document.getElementsByClassName("grid1")
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

async function fetchWord(url) {
    const response = await fetch(url)
    const responseBody = await response.json()
    const {word} = responseBody
    return word
}

let wordToGuess = await fetchWord(API_ENDPOINT)
console.log(wordToGuess)
page.addEventListener("keydown",(e) => {
    if (alphabet.includes(e.key.toUpperCase()) || e.key == "Enter") {
        doStuff(e.key)
    }
})

const wordArr = []
function doStuff(keyPressed) {
    if (keyPressed == "Enter") {
        checkWord()
        return
    } 
    
    if (wordArr.length < 5) {
        grid[0].children[wordArr.length].innerHTML = keyPressed
        wordArr.push(keyPressed)
    }
}

function checkWord() {
    let word = wordArr.toString().replaceAll(",","")
    if (word == wordToGuess) {
        // winner, do something
    } else {
        // not correct, do something
    }
    
}
