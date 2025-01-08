// --------------------- VARIABLES

let card = null; // The current Bingo card
const drawnNumbers = new Set(); // Store drawn numbers


// --------------------- EVENT LISTENERS

document.getElementById("draw-button").addEventListener("click", () => {
    const number = drawNumber(); // Draw a random number
    if (number === null) {  // Check if the game is over
        document.getElementById("drawn-number").textContent = "Game Over: All numbers drawn!";
        return;
    }
    document.getElementById("drawn-number").textContent = `Number drawn: ${ number }`;  // Display number
    markCard(card, number); // Mark the number on the card

    // Check if the card has a winning condition
    if (checkWin()) {
        document.getElementById("draw-button").disabled = true; // Disable further draw
    }

    // Display winning numbers
    const winningNumbers = checkWin(); // Get the winning numbers from checkWin()
    if (winningNumbers) {
        document.getElementById("drawn-number").innerHTML =
            `BINGOOO! You win!<br>Winning numbers: ${winningNumbers.join(", ")}`;
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
    if (drawnNumbers.size >= 75) return null; // Stop if all numbers are drawn

    let number;
    do {
        number = Math.floor(Math.random() * 75) + 1; // Generate a random number between 1 to 75
    } while (drawnNumbers.has(number)); // Repeat if the number is already drawn to avoid repetation

    drawnNumbers.add(number); // Add the number to the set
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


// Check Marked Cells
function isCellMarked(number) {
    const cells = document.querySelectorAll("td");
    for (const cell of cells) {
        if (cell.textContent == number && cell.classList.contains("marked")) {
            return true;
        }
    }
    return false;
}


// Check if any raw is a winner
function checkRows() {
    for (let row = 0; row < 5; row++) {
        let isWinningRow = true;
        const winningNumbers = [];
        for (let col = 0; col < 5; col++) {
            const number = card[col][row];
            if (number === "FREE" || isCellMarked(number)) {
                winningNumbers.push(number);
            } else {
                isWinningRow = false;
                break;
            }
        }
        if (isWinningRow) return winningNumbers;
    }
    return null;
}


// Check if any columns is a winner
function checkColumns() {
    for (let col = 0; col < 5; col++) {
        let isWinningColumn = true;
        const winningNumbers = [];
        for (let row = 0; row < 5; row++) {
            const number = card[col][row];
            if (number === "FREE" || isCellMarked(number)) {
                winningNumbers.push(number);
            } else {
                isWinningColumn = false;
                break;
            }
        }
        if (isWinningColumn) return winningNumbers;
    }
    return null;
}


// Check if any diagnals is a winner
function checkDiagonals() {
    const winningNumbers1 = []; // For the first diagonal (top-left to bottom-right)
    const winningNumbers2 = []; // For the second diagonal (top-right to bottom-left)

    let isWinningDiagonal1 = true;
    let isWinningDiagonal2 = true;

    for (let i = 0; i < 5; i++) {
        // Check the first diagonal
        const number1 = card[i][i];
        if (number1 === "FREE" || isCellMarked(number1)) {
            winningNumbers1.push(number1);
        } else {
            isWinningDiagonal1 = false;
        }

        // Check the second diagonal
        const number2 = card[4 - i][i];
        if (number2 === "FREE" || isCellMarked(number2)) {
            winningNumbers2.push(number2);
        } else {
            isWinningDiagonal2 = false;
        }
    }

    if (isWinningDiagonal1) return winningNumbers1;
    if (isWinningDiagonal2) return winningNumbers2;
    return null;
}


// Check for Winning Conditions
function checkWin() {
    const winningRow = checkRows();
    if (winningRow) return winningRow;

    const winningColumn = checkColumns();
    if (winningColumn) return winningColumn;

    const winningDiagonal = checkDiagonals();
    if (winningDiagonal) return winningDiagonal;

    return null;
}


// Initialize Game
function startGame() {
    card = generateBingoCard(); // Create the card
    renderBingoCard(card); // Render the card on the screen
}


startGame()