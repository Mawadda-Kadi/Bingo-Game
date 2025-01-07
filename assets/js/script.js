// --------------------- VARIABLES

const gameState = {
    card: null, // The current Bingo card
    drawnNumbers: new Set(), // Store drawn numbers
};


// --------------------- EVENT LISTENERS

document.getElementById("draw-button").addEventListener("click", () => {
    const number = drawNumber(); // Draw a random number
    if (number === null) {  // Check if the game is over
        document.getElementById("drawn-number").textContent = "Game Over: All numbers drawn!";
        return;
    }
    document.getElementById("drawn-number").textContent = `Number drawn: ${number}`;  // Display number
    markCard(gameState.card, number); // Mark the number on the card
});



// ------------------ FUNCTIONS

// Generate Bingo Card
function generateBingoCard() {
    const card = []; // Initialize an empty card
    const ranges = [[1, 15], [16, 30], [31, 45], [46, 60], [61, 75]]; // Number ranges for each column

    for (let col = 0; col < 5; col++) { // Loop through each column
        const columnNumbers = []; // Initialize a column
        while (columnNumbers.length < 5) { // Generate 5 numbers per column
            const number = Math.floor(Math.random() * (ranges[col][1] - ranges[col][0] + 1)) + ranges[col][0];
            if (!columnNumbers.includes(number)) columnNumbers.push(number); // Avoid duplicates
        }
        if (col === 2) columnNumbers[2] = "FREE"; // Assign "FREE" to the center square (third col and third row)
        card.push(columnNumbers); // Add the column to the card
    }
    return card; // Return the completed Bingo card
}


// Render Bingo Card
function renderBingoCard(card) {
    const container = document.getElementById("bingo-card"); // Find the container
    const table = document.createElement("table"); // Create a table

    // Create header row
    const headerRow = document.createElement("tr"); // Make a row for the header
    ["B", "I", "N", "G", "O"].forEach(letter => { // Loop through each letter
        const th = document.createElement("th");   // Make a "box" for the letter
        th.textContent = letter;  // Put the letter in the box
        headerRow.appendChild(th);  // Add the box to the row
    });
    table.appendChild(headerRow); // Add the row to the table

    // Create rows for card numbers
    for (let row = 0; row < 5; row++) { // Loop through 5 rows
        const tr = document.createElement("tr"); // Make a row
        for (let col = 0; col < 5; col++) {   // Loop through 5 columns in each row
            const td = document.createElement("td"); // Make a "box" for each number
            td.textContent = card[col][row]; // Put the number in the box
            if (card[col][row] === "FREE") td.classList.add("marked"); // Mark "FREE" space
            tr.appendChild(td); // Add the box to the row
        }
        table.appendChild(tr); // Add the row to the table
    }

    container.innerHTML = ""; // Clear previous content or old card
    container.appendChild(table); // Add the table to the container
}


// Draw a Random Number
function drawNumber() {
    if (gameState.drawnNumbers.size >= 75) return null; // Stop if all numbers are drawn

    let number;
    do {
        number = Math.floor(Math.random() * 75) + 1; // Generate a random number between 1 to 75
    } while (gameState.drawnNumbers.has(number)); // Repeat if the number is already drawn to avoid repetation

    gameState.drawnNumbers.add(number); // Add the number to the set
    return number; // Return the drawn number
}


// Mark the Card
function markCard(card, number) {
    const cells = document.querySelectorAll("td"); // Get all cells
    cells.forEach(cell => { // loop through all td cells
        if (cell.textContent == number) { // Check if the number matches
            cell.classList.add("marked"); // Mark the cell
        }
    });
}

// Check for Winning Conditions
function checkWin(card) {

}

// Restrart the Game
function restartGame() {

}


// Initialize Game
function startGame() {
    const card = generateBingoCard(); // Create the card
    renderBingoCard(card); // Render the card on the screen
}


startGame()