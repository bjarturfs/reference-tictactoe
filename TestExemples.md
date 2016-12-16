# Test Exemples

## 1. Create game command

#### 1.1 should emit game created event
* Given []
* When [CreateGame]
* Then [GameCreated]

## 2. Join game command

#### 2.1 should emit game joined event
* Given [GameCreated]
* When [JoinGame]
* Then [GameJoined]

#### 2.2 should emit FullGameJoinAttempted when game full
* Given [GameCreated, GameJoined]
* When [JoinGame]
* Then [FullGameJoinAttempted]

## 3. Place move command

#### 3.1 should emit MovePlaced on first game move
* Given [GameCreated, GameJoined]
* When [PlaceMove(2,2,X)]
* Then [MovePlaced(2,2,X)]

#### 3.2 should emit IllegalMove when square is already occupied
* Given [GameCreated, GameJoined, MovePlaced(2,2,X)]
* When [PlaceMove(2,2,O)]
* Then [IllegalMove]

#### 3.3 should emit NotYourMove if attempting to make move out of turn
* Given [GameCreated, GameJoined, MovePlaced(1,1,X)]
* When [PlaceMove(1,2,X)]
* Then [NotYourMove]

#### 3.4 should emit game won vertically by X
* Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(0,1,O), MovePlaced(1,1,X), MovePlaced(0,2,O)]
* When [PlaceMove(2,2,X)]
* Then [MovePlaced(2,2,X), GameWon]

#### 3.5 Should emit game won horizontally by O
* Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(1,0,O), MovePlaced(0,1,X), MovePlaced(1,1,O), MovePlaced(2,2,X)]
* When [PlaceMove(1,2,O)]
* Then [MovePlaced(1,2,O), GameWon]

#### 3.6 should not emit game draw if won on last move
* Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(0,1,O), MovePlaced(0,2,X), MovePlaced(1,1,O), MovePlaced(1,0,X), MovePlaced(1,2,O), MovePlaced(2,2,X), MovePlaced(2,0,O)]
* When [PlaceMove(2,1,X)]
* Then [MovePlaced(2,1,X), GameDraw]





