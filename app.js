function TicTacToe() {
    const self = this;
    let player1 = '';
    let player2 = '';
    let tieCounter = 0;
    this.playsMadeArr = [];
    this.gameStarted = false;
    this.winCondition = 3;
    this.current_player = '';
    this.addClickHandlers = function() {
        $(".x").click(this.setPlayer);
        $(".y").click(this.setPlayer);
    };
    this.setPlayer = function () {
        player1 = this.innerHTML;
        self.current_player = player1;
        if(player1 === 'Y'){
            player2 = 'X';
        }
        else {
            player2 = "Y";
        }
        self.beginGame();
    };
    this.beginGame = function () {
        this.createBoard();
        this.createSquares();
        this.createPlaysMade();
        $(".square").click(this.switchPlayers.bind(this));
        this.gameStarted = true;
    };
    this.createBoard = function () {
        let board = $("<div>", {
            class : "board"
        });
        $(".playArea").append(board);
    };
    this.createSquares = function () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let square = $("<div>", {
                    class: "square",
                    "row": i,
                    "col": j
                });
                $(".board").append(square);
            }
        }
    };
    this.createPlaysMade = function() {
        let size = 3;
        for(let i=0; i < size; i++){
            let temp = [];
            this.playsMadeArr.push(temp);
            for (let j=0; j< size; j++){
                this.playsMadeArr[i][j] = 0;
            }
        }
    };
    this.checkWin = function(row, col, symbolChecking) {
        let size = 3;
        let rowCount = 0;
        for (let i = 0; i < this.playsMadeArr.length; i++) {
            if (this.playsMadeArr[row][i] === symbolChecking) {
                rowCount += 1;
            } else {
                if (rowCount < this.winCondition) {
                    rowCount = 0;
                }
            }
        }
        if (!(rowCount >= this.winCondition)) {
            var colCount = 0;
            for (let j = 0; j < this.playsMadeArr.length; j++) {
                if (this.playsMadeArr[j][col] === symbolChecking) {
                    colCount += 1;
                } else {
                    if (colCount < this.winCondition) {
                        colCount = 0;
                    }
                }
            }
        }
        if (!(rowCount >= this.winCondition) || !(colCount >= this.winCondition)) {
            let upLeft = [];
            let upRight = [];
            let downLeft = [];
            let downRight = [];
            let currentRow = parseInt(row);
            let currentCol = parseInt(col);
            for (let i = 0; i < size; i++) {
                if (this.playsMadeArr.hasOwnProperty(currentRow - i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol - i)) {
                        upLeft.push(this.playsMadeArr[currentRow - i][currentCol - i]);
                    }
                }
                if (this.playsMadeArr.hasOwnProperty(currentRow - i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol + i)) {
                        upRight.push(this.playsMadeArr[currentRow - i][currentCol + i]);
                    }
                }
                if (this.playsMadeArr.hasOwnProperty(currentRow + i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol - i)) {
                        downLeft.push(this.playsMadeArr[currentRow + i][currentCol - i]);
                    }
                }
                if (this.playsMadeArr.hasOwnProperty(currentRow + i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol + i)) {
                        downRight.push(this.playsMadeArr[currentRow + i][currentCol + i]);
                    }
                }
            }
            downRight.shift();
            let leftDiagonalComplete = upLeft.reverse().concat(downRight);
            upRight.shift();
            let rightDiagonalComplete = downLeft.reverse().concat(upRight);
            var countLeft = 0;
            for (let j = 0; j < leftDiagonalComplete.length; j++) {
                if (leftDiagonalComplete[j] === symbolChecking) {
                    countLeft += 1;
                } else if (countLeft < this.winCondition) {
                    countLeft = 0;
                }
            }
            if (countLeft < this.winCondition) {
                var countRight = 0;
                for (let k = 0; k < rightDiagonalComplete.length; k++) {
                    if (rightDiagonalComplete[k] === symbolChecking) {
                        countRight += 1;
                    } else if (countRight < this.winCondition) {
                        countRight = 0;
                    }
                }
            }
        }
        tieCounter++;
        if(rowCount >= this.winCondition || colCount >= this.winCondition
            || countLeft >= this.winCondition || countRight >= this.winCondition) {
            if (symbolChecking === 1) {
                $('.playArea').empty().append('<div>Player 1 Wins</div>');
                setTimeout(this.resetGame, 3000);
            } else {
                $('.playArea').empty().append('<div>Player 2 Wins</div>');
                setTimeout(this.resetGame, 3000);
            }
        }
        else if (tieCounter === 9){
            $('.playArea').empty().append('<div>Tie</div>');
            setTimeout(this.resetGame, 3000);
        }
    };
    this.switchPlayers = function () {
        var self = event.target; // sets the variable self to the cell clicked
        var row = $(self).attr('row');
        var col = $(self).attr('col');
        //prevents people from changing the symbols
        if(!$(self).hasClass('occupied')) {
            //assigns a row and column, switches current player and places the symbol in cell
            if (this.current_player === player1) {
                this.playsMadeArr[row][col] = 1;
                $(self).append(player1);
                this.checkWin(row, col, 1);
                this.current_player = player2;
                $(self).addClass('occupied');
            } else {
                this.playsMadeArr[row][col] = 2;
                $(self).append(player2);
                this.checkWin(row, col, 2);
                this.current_player = player1;
                $(self).addClass('occupied');
            }
        }
    };
    this.resetGame = function () {
        this.current_player = player1;
        this.playsMadeArr = [];
        $('.playArea').empty();
        tieCounter = 0;
        this.gameStarted = false;
    };
}

$(document).ready(function() {
    const game = new TicTacToe();
    game.addClickHandlers();
});