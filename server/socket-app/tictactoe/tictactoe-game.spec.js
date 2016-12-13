  var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

var createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full', function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

        when =
        {
            type: "JoinGame",
            user: {
                userName: "Gulli"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29"
        };

        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Gulli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }
        ];
    });

});

describe('Place move command', function () {

    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit MovePlaced on first game moved event', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:32",
                side: 'O'
            }
        ];

        when =
        {
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:35",
            side: 'X',
            move: { ROW: 2, COL: 2 }
        };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:35",
                side: 'X',
                move: { ROW: 2, COL: 2 }
            }
        ];

    })

    it('should emit IllegalMove when square is already occupied', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:32",
                side: 'O'
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:35",
                side: 'X',
                move: { ROW: 2, COL: 2 }
            },
        ];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:05",
            side: 'O',
            move: { ROW: 2, COL: 2 }
        };
        then = [
            {
                type: "IllegalMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:05",
                side: 'O',
                move: { ROW: 2, COL: 2 }
            }
        ];
    })

   it('Should emit NotYourMove if attempting to make move out of turn', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:32",
                side: 'O'
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:35",
                side: 'X',
                move: { ROW: 1, COL: 1 }
            },
        ];

        when =
        {
            type: "PlaceMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side: 'X',
            move: { ROW: 1, COL: 2 }
        };
        then = [
            {
                type: "NotYourMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'X',
                move: { ROW: 1, COL: 2 }
            }
        ];
    })

  it('Should emit game won on', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:32",
                side: 'O'
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:35",
                side: 'X',
                move: { ROW: 0, COL: 0 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:40",
                side: 'O',
                move: { ROW: 0, COL: 1 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:45",
                side: 'X',
                move: { ROW: 1, COL: 1 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:50",
                side: 'O',
                move: { ROW: 0, COL: 2 }
            },
       
         
        ];

        when =
        {
            type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:55",
                side: 'X',
                move: { ROW: 2, COL: 2 }
        };
        then = [
            {
            type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:55",
                side: 'X',
                move: { ROW: 2, COL: 2 }
            },
            {
            type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:55",
                side: 'X',
                move: { ROW: 2, COL: 2 }
            }
        ];
    })


    it('Should not emit game draw if no one wins on last move', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:32",
                side: 'O'
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:35",
                side: 'X',
                move: { ROW: 0, COL: 0 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:40",
                side: 'O',
                move: { ROW: 0, COL: 1 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:45",
                side: 'X',
                move: { ROW: 0, COL: 2 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:50",
                side: 'O',
                move: { ROW: 1, COL: 1 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:55",
                side: 'X',
                move: { ROW: 1, COL: 0 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:00",
                side: 'O',
                move: { ROW: 1, COL: 2 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:05",
                side: 'X',
                move: { ROW: 2, COL: 2 }
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:10",
                side: 'O',
                move: { ROW: 2, COL: 0 }
            },
       
         
        ];

        when =
        {
            type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:15",
                side: 'X',
                move: { ROW: 2, COL: 1 }
        };
        then = [
            {
            type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:15",
                side: 'X',
                move: { ROW: 2, COL: 1 }
            },
            {
            type: "GameDraw",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:15",
                side: 'X',
                move: { ROW: 2, COL: 1 }
            }
        ];
    })

});
