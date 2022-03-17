document.addEventListener("DOMContentLoaded", () => {
    const PlayField = document.getElementsByClassName("play-field")[0];
    const Score = document.querySelector("#score");
    const StartButton = document.querySelector("#start-button");
    const width = 10;
    // console.log(playField.innerHTML)

    // Create 200 cells to fill play-field
    for (let i = 0; i < 200; i++) {
        let cell = document.createElement("div");
        PlayField.appendChild(cell);
    }
    // Create a row of occupied cells below play-field
    for (let i = 0; i < 10; i++) {
        let cell = document.createElement("div");
        cell.classList.add("taken");
        PlayField.appendChild(cell);
    }

    let cells = Array.from(document.querySelectorAll(".play-field > div"));
    // console.log(cells);

    const L_Tetromino = [
        [1, 2, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2, width * 2 + 1],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ]

    const T_Tetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ]

    const Skew_Tetromino = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
    ]

    const Square_Tetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ]

    const Straight_Tetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ]

    const The_Tetrominoes = [L_Tetromino, T_Tetromino, Skew_Tetromino, Square_Tetromino, Straight_Tetromino];
    // console.log(The_Tetrominoes);

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * The_Tetrominoes.length);
    let current = The_Tetrominoes[random][currentRotation];

    function draw() {
        current.forEach(index => {
            cells[currentPosition + index].classList.add("tetromino");
        })
    }

    function undraw() {
        current.forEach(index => {
            cells[currentPosition + index].classList.remove("tetromino");
        })
    }

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => cells[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => cells[currentPosition + index].classList.add("taken"));
            random = Math.floor(Math.random() * The_Tetrominoes.length);
            current = The_Tetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    // Move Tetromino left or right and detect boundaries
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (current.some(index => cells[currentPosition + index].classList.contains("taken"))) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === 9);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some(index => cells[currentPosition + index].classList.contains("taken"))) {
            currentPosition -= 1;
        }
        draw();
    }

    function drop() {

    }

    function descend() {
        
    }

    function control(e) {
        if (e.keyCode === 37) moveLeft();
        else if (e.keyCode === 38) drop();
        else if (e.keyCode === 39) moveRight();
        else if (e.keyCode === 40) descend();
    }

    // Make Tetromino move down over time
    timerID = setInterval(moveDown, 250);

    // Assign event listener for key input
    document.addEventListener("keyup", control);
});
