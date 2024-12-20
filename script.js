// Array of car image paths
const carImages = [
    'icon/1.png',
    'icon/2.png',
    'icon/3.png',
    'icon/4.png'
]

function setRandomCarImage() {
    const randomIndex = Math.floor(Math.random() * carImages.length);
    const randomCarImage = carImages[randomIndex];

    const carImageElement = document.getElementById('randomCarImage');
    if (carImageElement) {
        carImageElement.src = randomCarImage;
    }
}

// Call the function when the script is loaded
setRandomCarImage();


// Array of predefined longer texts
const textOptions = [
    "Picking up the pieces, half alive in a nine 'til five, vacant eyes.",
    
    "When the sun sets and the world quiets, the thoughts in my mind get louder. It’s in these moments of solitude that I truly begin to understand myself, even if the clarity is fleeting.",
    
    "There are moments in life when the pressure becomes unbearable, when the walls close in. You wonder if there's any escape, but then you realize that it's okay to let go and just breathe.",
    
    "The world spins at an ever-increasing pace, and we are caught in its whirlwind. Between work, responsibilities, and the constant rush, it’s easy to lose sight of what matters most. Yet, in the silence of the night, when everything settles, you begin to reflect. The simple things, the quiet moments, and the deep connections we make are what truly hold meaning. It’s in those fleeting moments that life reveals its depth and beauty, even when the world around us seems chaotic.",
    
    "Life is full of unexpected twists and turns, and we are constantly navigating through them. One day, everything seems to fall into place, and the next, it feels like you're starting over. But that’s the beauty of life – it’s never static. The highs and lows, the successes and failures, they all shape us. It's in the struggle that we learn the most about ourselves, and it's in the moments of peace that we appreciate how far we've come. The journey is the reward, and it’s only by embracing the unknown that we can truly grow."
];

function setRandomText() {
    const randomIndex = Math.floor(Math.random() * textOptions.length);
    const randomText = textOptions[randomIndex];

    const textDisplayElement = document.getElementById('randomTextDisplay');
    if (textDisplayElement) {
        textDisplayElement.innerText = randomText;
    }
}

// Call the function when the script is loaded
setRandomText();



function handleTyping(randomTextDisplayId, textInputId) {
    const randomTextDisplay = document.getElementById(randomTextDisplayId);
    const textInput = document.getElementById(textInputId);

    const randomText = randomTextDisplay.innerText;
    randomTextDisplay.textContent = randomText;

    let correctWordTyped = ""; // Keep track of correctly typed text

    function updateDisplay() {
        const inputText = correctWordTyped + textInput.value; // Combine correct words with current input
        firstMistake = false; // Reset mistake tracking for current input

        const highlightedText = randomText
            .split("")
            .map((char, index) => {
                if (inputText[index] === undefined) {
                    if (index === inputText.length) {
                        return `<span class='blinker'>|</span>${char}`; // Add blinker before the next letter to type
                    }
                    return char; // No input yet
                } else if (firstMistake || inputText[index] !== char) {
                    firstMistake = true; // Mark as first mistake
                    return `<span class='incorrect'>${char}</span>`;
                } else {
                    return `<span class='correct'>${char}</span>`;
                }
            })
            .join("");

        randomTextDisplay.innerHTML = highlightedText;
    }

    // Initialize display with blinker before the first letter
    updateDisplay();

    textInput.addEventListener("input", () => {
        updateDisplay();

        // Clear input after space if all previous characters were correct
        if (textInput.value.endsWith(" ") && !firstMistake) {
            correctWordTyped += textInput.value; // Add correct input to tracked text
            textInput.value = ""; // Clear the input field
        }
    });
}


// Initialize the function with appropriate IDs
handleTyping("randomTextDisplay", "textInput");
