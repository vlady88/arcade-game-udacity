// Block dimensions
const blockWidth = 101;
const blockHeight = 83;

// Canvas dimensions
const canvasWidth = 5 * blockWidth;
const canvasHeight = 6 * blockHeight;

const enemiesCount = 4;

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    
    this.init();
};

// Initialize enemy
Enemy.prototype.init = function() {
    // Assign random starting position on x axis
    this.x = -blockWidth - getRandomInt(4) * blockWidth;
    // Assign random lane on y axis
    this.y = getRandomInt(3) * blockHeight + blockHeight * 0.75;
    // Assign random speed
    this.speed = 100 + 10 * getRandomInt(40);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x > canvasWidth) {
        // If the enemy goes out of canvas, re-initialize it
        this.init();
    } else {
        // Otherwise update its position
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';

    this.init();
};

// Initialize player
Player.prototype.init = function() {
    // Position on x axis
    this.x = canvasWidth / 2 - blockWidth / 2;
    // Position on y axis
    this.y = canvasHeight - blockHeight * 1.25;
    // Hide the winning modal
    $('.modal').modal('hide');
}

// Move the player on the board and prevent it from exiting the canvas
Player.prototype.handleInput = function(key) {
    if(key == 'up' && this.y > 0) {
        this.y -= blockHeight;
    }
    if(key == 'down' && this.y < canvasHeight - 2 *  blockHeight) {
        this.y += blockHeight;
    }
    if(key == 'right' && this.x < canvasWidth - blockWidth) {
        this.x += blockWidth;
    }
    if(key == 'left' && this.x > 0) {
        this.x -= blockWidth;
    }
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // Check for collision with enemies
    for(const enemy of allEnemies) {
        if(player.y == enemy.y && player.x < enemy.x + 0.5 * blockWidth && 
                player.x > enemy.x - 0.5 * blockWidth) {
            player.init();
        }
    }

    // Check for winning the game
    if(player.y < 0) {
        $('.modal').modal();
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// All enemy objects
let allEnemies = [];
// The player object
let player = new Player();

// Create the enemies
while(allEnemies.length < enemiesCount) {
    allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Computes a random integer between 0 and max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
