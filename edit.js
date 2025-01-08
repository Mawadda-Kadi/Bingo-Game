console.log("JavaScript is running!"); // Debug
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

    // Check for a win
    if (checkWin()) {
        document.getElementById("drawn-number").textContent = "BINGOOO! You Win";
        document.getElementById("draw-button").disabled = true; // Disable further draw
    }
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
    console.log("Generated Bingo Card:", card); // Debug
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
            td.setAttribute("data-number", card[col][row]); // Add a data attribute for easy matching
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
function markCard(number) {
    console.log(`Marking number: ${number}`); // Debug
    const cells = document.querySelectorAll("td[data-number]"); // Get all cells
    cells.forEach(cell => { // loop through all td cells
        console.log(`Checking cell: ${cell.textContent}`); // Debug
        if (cell.getAttribute("data-number") == number) { // Match drawn number to cell content
            cell.classList.add("marked"); // Mark the cell
            console.log(`Marked cell: ${cell.getAttribute("data-number")}`); // Debug
        }
    });
}


// Check Marked Cells
function isCellMarked(number) {
    const cells = document.querySelectorAll("td");
    for (const cell of cells) {
        if (cell.textContent == number && cell.classList.contains("marked")) {
            return true;
        }
    }
    console.log(`Cell ${number} is NOT marked.`); // Debug
    return false;
}


// Check if any raw is a winner
function checkRows() {
    const card = gameState.card;
    for (let row = 0; row < 5; row++) {
        let isWinningRow = true;
        for (let col = 0; col < 5; col++) {
            if (card[col][row] !== "FREE" && !isCellMarked(card[col][row])) {
                isWinningRow = false;
                break;
            }
        }
        if (isWinningRow) return true;
    }
    return false;
}


// Check if any columns is a winner
function checkColumns() {
    const card = gameState.card;
    for (let col = 0; col < 5; col++) {
        let isWinningColumn = true;
        for (let row = 0; row < 5; row++) {
            if (card[col][row] !== "FREE" && !isCellMarked(card[col][row])) {
                isWinningColumn = false;
                break;
            }
        }
        if (isWinningColumn) return true;
    }
    return false;
}


// Check if any diagnals is a winner
function checkDiagonals() {
    const card = gameState.card;
    let isWinningDiagnol1 = true; // For the first diagonal (top-left to bottom-right)
    let isWinningDiagnol2 = true; // For the second diagonal (top-right to bottom-left)
    for (let i = 0; i < 5; i++) { // Loop through each diagonal position

        // Check the first diagonal
        if (card[i][i] !== "FREE" && !isCellMarked(card[i][i])) {
            isWinningDiagnol1 = false;
        }

        // Check the second diagonal
        if (card[4 - i][i] !== "FREE" && !isCellMarked(card[4 - i][i])) {
            isWinningDiagnol2 = false;
        }

    }
    // Return true if any diagonal is a winner
    return isWinningDiagnol1 || isWinningDiagnol2;
}


// Check for Winning Conditions
function checkWin() {
    console.log("Checking rows..."); // Debug
    if (checkRows()) {
        console.log("Winning row found!"); // Debug
        return true;
    }

    console.log("Checking columns..."); // Debug
    if (checkColumns()) {
        console.log("Winning column found!"); // Debug
        return true;
    }

    console.log("Checking diagonals..."); // Debug
    if (checkDiagonals()) {
        console.log("Winning diagonal found!"); // Debug
        return true;
    }

    console.log("No winning conditions met."); // Debug
    return false;

}


// Initialize Game
function startGame() {
    const card = generateBingoCard(); // Create the card
    gameState.card = card; // Store the card in gameState
    console.log("Initialized gameState.card:", gameState.card); // Debug
    renderBingoCard(card); // Render the card on the screen
}


startGame()