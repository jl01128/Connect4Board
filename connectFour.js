// Initial references
// Create global variables for the different elements in the document
// The querySelector() method returns the first element that matches a CSS selector 
// The getElementById() method returns the element that matches the ID

// Declare constant container set equal to object document, method querySelector, passing as an argument class ".container"
const container = document.querySelector(".container");
// Declare constant playerTurn set equal to object document, method getElementById, passing as an argument id "playerTurn"
const playerTurn = document.getElementById("playerTurn");
// Declare constant message set equal to object document, method getElementById, passing as an argument id "message"
const message = document.getElementById("message");
// Declare variable initialMatrix as a 2d array, 6 rows, 7 columns, initialized to all 0s
let initialMatrix = Array.from({ length: 6 }, () => Array(7).fill(0));
// Declare variable currentPlayer to store the current player
let currentPlayer;

// Write function gameOverCheck
function gameOverCheck() 
{
//console.log("gameOverCheck");
        
    // Declare variable count, initialized to 0
    let count = 0;
    
    // Iterate through the 2d array initialMatrix
    for (let innerArray of initialMatrix) {
        // If every cell in the row is occupied
        if (innerArray.every(val => val != 0)) {
            count++;
        } else {
            return false;
        }
    }
    
    // If all rows are occupied
    if (count === 6) {
        const message = document.getElementById("message");
        message.innerText = "Game Over";
        return false;
    }
}


// Win check logic
function winCheck (row, column)
{
//console.log("winCheck");
    // Write decision making logic, if function call checkHorizontal, checkVertical, checkPositiveDiagonal, or checkNegativeDiagonal is true, return true
    if (checkHorizontal(row, column) || checkVertical(row, column) || checkPositiveDiagonal(row, column) || checkNegativeDiagonal(row, column)) {
        return true;
    } else {
        return false;
    }
    
}


// Sets the circle to exact points
function setPiece(startCount, colValue) {
//console.log("setPiece");

    try {
        // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
        let rows = document.querySelectorAll(".grid-row");

        // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0   
        if (initialMatrix[startCount][colValue] !== 0) {
            // Decrement parameter startCount by 1
            startCount--;
            // Call function setPiece, passing as arguments parameters startCount and colValue
            setPiece(startCount, colValue);
        }
        // Else
        else {
            // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
            let currentRow = rows[startCount].querySelectorAll(".grid-box");

            // Modify currentRow, index colValue, object classlist, method add, passing as arguments "filled" and `player${currentPlayer}` 
            currentRow[colValue].classList.add("filled", `player${currentPlayer}`);

            // Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
            initialMatrix[startCount][colValue] = currentPlayer;
            // If function call winCheck, passing as arguments parameters startCount and colValue is true
            if (winCheck(startCount, colValue)) {
                // Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins` 
                message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
                // Return false
                return false;
            }
        }
        // Call function gameOverCheck
        gameOverCheck();
    } catch (e) {
        // The catch(e){} block should display and alert dialog box informing the player "Column full, select again"
        alert("Column full, select again");
    }
}

// Write function fillBox 
function fillBox(e) {
    console.log("fillBox");
    // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
    const colValue = parseInt(e.target.getAttribute("data-value"));
    // Call function setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue 
    setPiece(5, colValue);
    // Switch the currentPlayer, if currently 1 then 2, if currently 2, then 1
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function createBoard 
function createBoard() {
    //console.log("createBoard");
    
    // Iterate through the 2d array initialMatrix
    // Write an outer for in loop to iterate through the rows, loop control variable innerArray, in    2d array initialMatrix
    for (let innerArray of initialMatrix) {
        // Declare variable outerDiv set equal to object document, method createElement, passing "div" as an argument
        const outerDiv = document.createElement("div");
        // Modify outerDiv, object classList, calling method add, passing argument "grid-row"
        outerDiv.classList.add("grid-row");
        // Modify outerDiv calling method setAttribute, passing arguments "data-value" and loop control variable innerArray
        outerDiv.setAttribute("data-value", innerArray);
        // Write an inner for in loop to iterate through the columns, loop control variable j, in 2d array initialMatrix, index innerArray    
        for (let j = 0; j < innerArray.length; j++) {
            // Set each element in array initialMatrix to the value of 0
            innerArray[j] = 0;
            // Declare variable innerDiv set equal to object document, method createElement, passing "div" as an argument
            const innerDiv = document.createElement("div");
            // Modify innerDiv, object classList, method add, passing argument "grid-box"
            innerDiv.classList.add("grid-box");
            // Modify innerDiv, calling method setAttribute, passing arguments "data-value" and loop control variable j
            innerDiv.setAttribute("data-value", j);
            // Modify innerDiv, method addEventListener, passing arguments "click" and (e) => { fillBox(e); }
            innerDiv.addEventListener("click", (e) => { fillBox(e); });
            // Modify outerDiv, method appendChild, passing argument innerDiv
            outerDiv.appendChild(innerDiv);
        }
        // Modify container. method appendChild, passing argument outerDiv
        container.appendChild(outerDiv);
    }
}

// Write function startGame 
function startGame() {
    console.log("startGame");

    // Set currentPlayer to 1, player 1 always goes first
    currentPlayer = 1;
    // Set the container's innerHTML to an empty string
    container.innerHTML = "";
    // Call function createBoard
    createBoard();
    // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function checkHorizontal to do the following
function checkHorizontal()
{
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j <= COLUMNS - 4; j++) {
            // if the currentPlayer has four discs in a row horizontally, return true
            if (checkLine(i, j, 0, 1)) {
                return true; // currentPlayer has four discs in a row horizontally
            }
        }
    }
    // return false
    return false;
}


// Function to check for a horizontal win
function checkHorizontal() {
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            // if the currentPlayer has four discs in a row horizontally, return true
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i][j + 1] === currentPlayer && initialMatrix[i][j + 2] === currentPlayer && initialMatrix[i][j + 3] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

// Function to check for a vertical win
function checkVertical() {
    // Write a nest for loop to iterate through the columns and rows
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            // if the currentPlayer has four discs in a row vertically, return true
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i + 1][j] === currentPlayer && initialMatrix[i + 2][j] === currentPlayer && initialMatrix[i + 3][j] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

// Function to check for a positive diagonal win
function checkPositiveDiagonal() {
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            // if the currentPlayer has four discs in a row diagonally, bottom right to top left, return true
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i - 1][j + 1] === currentPlayer && initialMatrix[i - 2][j + 2] === currentPlayer && initialMatrix[i - 3][j + 3] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

// Function to check for a negative diagonal win
function checkNegativeDiagonal() {
    // Write a nest for loop to iterate through the rows and columns
    for (let i = 3; i < 6; i++) {
        for (let j = 3; j < 7; j++) {
            // if the currentPlayer has four discs in a row diagonally, bottom left to top right, return true
            if (initialMatrix[i][j] === currentPlayer && initialMatrix[i - 1][j - 1] === currentPlayer && initialMatrix[i - 2][j - 2] === currentPlayer && initialMatrix[i - 3][j - 3] === currentPlayer) {
                return true;
            }
        }
    }
    return false;
}

// For the window.onload event, call function startGame
window.onload = startGame;

