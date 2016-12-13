var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var full = false;
        var board = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];
        var lastmove = '';

        function processEvent(event) {
            if(event.type === "GameJoined") {
                full = true;
            }

            if(event.type === "MovePlaced") {
                board[event.move.ROW][event.move.COL] = event.side;
                lastmove = event.side;
                
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

        processEvents(history);

        return {
            lastMove: lastMove,
            placeBoard: placeBoard,
            gameFull: gameFull,
            processEvents: processEvents
        } 
    };
};
