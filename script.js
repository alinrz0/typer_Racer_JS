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
    const timerElement = document.querySelector(".timer");
    const inputPanel = document.querySelector(".input-panel");
    const wpm = document.querySelector(".right-section");
    const leftSection = document.querySelector(".left-section");
    const totalWordsInText = randomTextDisplay.innerText.split(/\s+/).filter(word => word.length > 0).length;

    let timerActive = false; // To track if the timer has started
    let correctWordTyped = ""; // Keep track of correctly typed text
    let firstMistake = false; // Reset mistake tracking for current input
    let wordCount = 0; // Count words typed correctly
    let startTime = null; // Track the start time
    let leftSectionOffset = 0; // Current offset for moving `.left-section`

    const randomText = randomTextDisplay.innerText;
    randomTextDisplay.textContent = randomText;

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

    function moveLeftSection() {
        leftSectionOffset += 500/totalWordsInText; // Increment the offset for movement
        leftSection.style.marginLeft = `${leftSectionOffset}px`; // Apply the new margin
    }

    function updateWPM() {
        if (!startTime) return; // If no typing has started yet, skip

        const elapsedTime = (new Date() - startTime) / 60000; // Time in minutes
        const wordsPerMinute = elapsedTime > 0 ? Math.round(wordCount / elapsedTime) : 0;
        wpm.textContent = `${wordsPerMinute} wpm`;
    }

    // Function to show and start the timer
    function activateTimer() {
        timerElement.style.display = "inline"; // Show the timer
        startTime = new Date(); // Record the starting time
        let timeLeft = 120; // Timer starts at 2:00 (120 seconds)

        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Stop timer when it reaches 0
                inputPanel.style.display = "none"; // Hide the input panel
            }

            timeLeft--; // Decrease time
        }, 1000);

        // Start updating WPM every second
        setInterval(updateWPM, 1000);
    }

    // Initialize display with blinker before the first letter
    updateDisplay();

    textInput.addEventListener("input", () => {
        // Start timer when the first character is typed
        if (!timerActive && textInput.value.length > 0) {
            timerActive = true;
            activateTimer();
        }

        updateDisplay();

        // Clear input after space if all previous characters were correct
        if (textInput.value.endsWith(" ") && !firstMistake) {
            correctWordTyped += textInput.value; // Add correct input to tracked text
            textInput.value = ""; // Clear the input field
            wordCount++; // Increment word count

            // Move the left-section
            moveLeftSection();
        }
    });

}

// Initialize the function with appropriate IDs
handleTyping("randomTextDisplay", "textInput");

function restartPage() {
    location.reload(); // This will refresh the page
}



document.getElementById('formatTrigger').addEventListener('click', () => {
    document.getElementById('fontFamilyModal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('fontFamilyModal').style.display = 'none';
});

document.getElementById('applyFontFamily').addEventListener('click', () => {
    const fontFamily = document.getElementById('fontFamilyInput').value;
    document.getElementById('randomTextDisplay').style.fontFamily = fontFamily;
    document.getElementById('fontFamilyModal').style.display = 'none';
});



