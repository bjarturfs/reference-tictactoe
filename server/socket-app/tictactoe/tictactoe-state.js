var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var full = false;

        function processEvent(event) {
            if(event.type === "GameJoined") {
                full = true;
            }    
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return full;
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            processEvents: processEvents
        } 
    };
};
