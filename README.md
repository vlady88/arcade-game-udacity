# Arcade Game Project

## Dependencies

* Bootstrap - used for displaying modals.

* jQuery - required by Bootstrap.

* Popper - required by Bootstrap.

## Implementation Details

* The following global variables are used:
    - `blockWidth / blockHeight` - block dimensions.
    - `canvasWidth / canvasHeight` - canvas dimensions.
    - `enemiesCount` - the number of enemies; increasing this number will increase the difficulty of the game.
    - `allEnemies` - array with all Enemy objects.
    - `player` - the Player object.

* Player initialization - the method `Player.init()` initializes the player. This is called upon page load, when the player gets hit by an enemy or when the "Play again" button is clicked after finishing a game. `Player.init()` does the following:
    - Sets the player at the bottom of the canvas on the vertical axis.
    - Sets the player at the middle of the canvas on the horizontal axis.

* Player movement - the methods `Player.handleInput()` and `Player.update()` are used to move the player:
    - `Player.handleInput()` - move the player on the board and prevent it from exiting the canvas.
    - `Player.update()` - checks for collitions with the enemies and restart the player's position if it gets hit; upon reaching the water, a winning message is displayed, along with the option to play again.

* Enemy initialization - the method `Enemy.init()` initializes an enemy object. This is called upon page load or when an enemy exits the canvas. `Enemy.init()` does the following:
    - Sets the enemy on a random lane on the vertical axis.
    - Sets the enemy on a random position at the right of the canvas on the horizontal axis.
    - Sets a random speed for the enemy.

* Enemy movement - the method `Enemy.update()` is used for moving the enemy and it does the following:
    - If the enemy goes out of canvas, then re-initialize it.
    - If the enemy is on the canvas, then it moves it to the right.

## Running the game

To run the game, just open `index.html` in a browser. Upon winning the game, click on `Play again` to start a new game.

