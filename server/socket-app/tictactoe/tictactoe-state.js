var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var full = false;
        var board = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];
        var lastmove = '';
        var moves = 0;

        function processEvent(event) {
            if(event.type === "GameJoined") {
                full = true;
            }

            if(event.type === "MovePlaced") {
                board[event.move.ROW][event.move.COL] = event.side;
                lastmove = event.side;
                moves++;
                
            }
    
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return full;
        }

        function placeBoard(move) {
            return board[move.ROW][move.COL];
        }

        function lastMove(side) {
            return side === lastmove;
        }

        function gameWon(side) {
            for(var i = 0; i < 3; i++){
                    if(board[i][0] === side && board[i][1] === side &&  board[i][2] === side){
                        return true;
                    }
                    if(board[0][i] === side && board[1][i] === side && board[2][i] === side){
                        return true;
                    }
            }

            if(board[0][0] === side && board[1][1] === side && board[2][2] === side){
            return true;
            }

            if(board[0][2] === side && board[1][1] === side && board[2][0] === side){
            return true;
            }

            else{
                return false;
            }
       
        }

        function getMoves() {
            return moves === 9;
        }

        processEvents(history);

        return {
            getMoves: getMoves,
            gameWon: gameWon,
            lastMove: lastMove,
            placeBoard: placeBoard,
            gameFull: gameFull,
            processEvents: processEvents
        } 
    };
};
