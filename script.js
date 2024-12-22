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
    "When the sun sets and the world quiets, the thoughts in my mind get louder.",
    
    "It’s in these moments of solitude that I truly begin to understand myself, even if the clarity is fleeting.",
    
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
    const wpmElement = document.querySelector(".right-section p");
    const leftSection = document.querySelector(".left-section");
    const totalWordsInText = randomTextDisplay.innerText.split(/\s+/).filter(word => word.length > 0).length;

    let timerActive = false; // To track if the timer has started
    let correctWordTyped = ""; // Keep track of correctly typed text
    let firstMistake = false; // Reset mistake tracking for current input
    let wordCount = 0; // Count words typed correctly
    let startTime = null; // Track the start time
    let leftSectionOffset = 0; // Current offset for moving `.left-section`
    let timerInterval = null; // Store the timer interval
    let wpmInterval = null; // Store the WPM interval

    const randomText = randomTextDisplay.innerText;
    randomTextDisplay.textContent = randomText;

    function updateDisplay() {
        const inputText = correctWordTyped + textInput.value; 
        firstMistake = false;

        const highlightedText = randomText
            .split("")
            .map((char, index) => {
                if (inputText[index] === undefined) {
                    if (index === inputText.length) {
                        return `<span class='blinker'>|</span>${char}`; // Add blinker before the next letter to type
                    }
                    return char;
                } else if (firstMistake || inputText[index] !== char) {
                    firstMistake = true; 
                    return `<span class='incorrect'>${char}</span>`;
                } else {
                    return `<span class='correct'>${char}</span>`;
                }
            })
            .join("");

        randomTextDisplay.innerHTML = highlightedText;
    }

    function moveLeftSection() {
        leftSectionOffset += 500 / totalWordsInText; 
        leftSection.style.marginLeft = `${leftSectionOffset}px`;
    }

    function updateWPM() {
        if (!startTime) return;

        const elapsedTime = (new Date() - startTime) / 60000; 
        const wordsPerMinute = elapsedTime > 0 ? Math.round(wordCount / elapsedTime) : 0;
        wpmElement.textContent = `${wordsPerMinute} wpm`;
    }

    function stopTimer() {
        clearInterval(timerInterval); 
        clearInterval(wpmInterval); 
    }

    function showResults() {
        const elapsedTime = (new Date() - startTime) / 1000; 
        const finalWPM = Math.round(wordCount / (elapsedTime / 60));
    
        const resultsBox = document.createElement("div");
        resultsBox.classList.add("results-box");
        resultsBox.innerHTML = `
            <h2>Race Results</h2>
            <p>Your Speed: <strong>${finalWPM} WPM</strong></p>
            <p>Time: <strong>${Math.floor(elapsedTime / 60)}:${Math.floor(elapsedTime % 60).toString().padStart(2, "0")}</strong></p>
        `;
    
        const centerBox = document.querySelector(".center-box");
        centerBox.appendChild(resultsBox);
    }
    

    function activateTimer() {
        timerElement.style.display = "inline"; 
        startTime = new Date(); 
        let timeLeft = 120; 

        timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval); 
                inputPanel.style.display = "none"; 
            }

            timeLeft--; 
        }, 1000);

        wpmInterval = setInterval(updateWPM, 1000);
    }

    updateDisplay(); 

    textInput.addEventListener("input", () => {
        if (!timerActive && textInput.value.length > 0) {
            timerActive = true;
            activateTimer();
        }

        updateDisplay();

        if (textInput.value.endsWith(" ") && !firstMistake) {
            correctWordTyped += textInput.value;
            textInput.value = ""; 
            wordCount++; 
            moveLeftSection(); 

            if (wordCount === totalWordsInText) {
                inputPanel.style.display = "none";
                stopTimer(); 
                showResults();
            }
        }
    });
}

handleTyping("randomTextDisplay", "textInput");


function restartPage() {
    location.reload();
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



