document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('grid');
    const scoreTable = document.querySelector('#scoreTable tbody');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    let timerId;
    let startTime;

    // Function to generate random number within a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to create grid of squares
    function createGrid(rows, cols) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                grid.appendChild(square);
            }
            grid.appendChild(document.createElement('br'));
        }
    }

    // Function to light up a random square
    function lightUpSquare() {
        const squares = document.querySelectorAll('.square');
        const randomIndex = getRandomInt(0, squares.length - 1);
        squares[randomIndex].classList.add('highlight');
        startTime = Date.now();
    }

    // Function to handle square click
    function squareClickHandler(event) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        const row = document.createElement('tr');
        row.innerHTML = `<td>${scoreTable.rows.length + 1}</td><td>${responseTime}</td>`;
        scoreTable.appendChild(row);
        this.classList.remove('highlight');
    }

    // Function to start the game
    function startGame() {
        timerId = setInterval(lightUpSquare, 1000);
        startBtn.disabled = true;
    }

    // Function to reset the game
    function resetGame() {
        clearInterval(timerId);
        startBtn.disabled = false;
        grid.innerHTML = '';
        scoreTable.innerHTML = '';
    }

    // Event listeners
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);

    // Create 4x4 grid initially
    createGrid(4, 4);

    // Event delegation for square click
    grid.addEventListener('click', function(event) {
        if (event.target.classList.contains('square')) {
            squareClickHandler.call(event.target, event);
        }
    });
});
