// script.js
window.onload = function() {
    const nameForm = document.getElementById('nameForm');
    const player1Input = document.getElementById('player1Name');
    const player2Input = document.getElementById('player2Name');
    const startGameButton = document.getElementById('startGame');
    
    const gameContainer = document.getElementById('game');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const victoryModal = document.getElementById('victoryModal');
    const closeModal = document.getElementById('closeModal');
    const victoryMessage = document.getElementById('victoryMessage');
    const trophyImage = document.getElementById('trophyImage');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    let player1Name = '';
    let player2Name = '';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        statusDisplay.textContent = `Vez do jogador ${currentPlayerName}`;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === null || b === null || c === null) {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winningPlayer = currentPlayer === 'X' ? player1Name : player2Name;
            statusDisplay.textContent = `Jogador ${winningPlayer} venceu!`;
            gameActive = false;
            victoryMessage.textContent = `Parabéns, ${winningPlayer} venceu!`;
            trophyImage.style.display = "block";
            victoryModal.style.display = "flex";
            return;
        }

        const roundDraw = !board.includes(null);
        if (roundDraw) {
            statusDisplay.textContent = 'Empate!';
            gameActive = false;
            victoryMessage.textContent = 'Empate!';
            trophyImage.style.display = "none";
            victoryModal.style.display = "flex";
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== null || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        board = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        statusDisplay.textContent = `Vez do jogador ${player1Name}`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        victoryModal.style.display = "none";
        trophyImage.style.display = "none";
    }

    startGameButton.addEventListener('click', () => {
        player1Name = player1Input.value.trim() || 'Jogador 1';
        player2Name = player2Input.value.trim() || 'Jogador 2';
        nameForm.style.display = "none";
        gameContainer.style.display = "flex";
        statusDisplay.textContent = `Vez do jogador ${player1Name}`;
    });

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', handleRestartGame);
    closeModal.addEventListener('click', () => victoryModal.style.display = "none");
};
