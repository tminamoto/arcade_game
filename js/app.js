'use strict';

// Define game setting
var numOfItems = 0;

// Define variables for Enemy
var enemyInitLocationX = -101;
var enemyInitLocationYArray = [60, 145, 230];
var minimumSpeed = 200;
var coefficientOfSpeed = 500;
var maxNumOfEnemy = 4;

// Define variables for Player
var playerInitPlayerCol = 2;
var playerInitPlayerRow = 5;
var playerInitLocationX = 202;
var playerInitLocationY = 404;
var playerOneStepX = 101;
var playerOneStepY = 85;

// Define variables for Item
var itemInitLocationXArray = [101, 202, 303, 404];
var itemInitLocationYArray = [60, 145, 230];

// Define variables for game canvas
var numOfCols = 5;
var numOfRows = 6;
var colWidth = 101;
var rowHeight = 85;
var rightEndOfCanvas = numOfCols * colWidth;
var lowEndOfCanvas = numOfRows * rowHeight;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initializer();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= rightEndOfCanvas) {
        this.initializer();
    } else {
        this.x += dt * this.speed;
    };

};

// Initialize enemy's position
Enemy.prototype.initializer = function() {

    this.x = enemyInitLocationX;
    this.y = enemyInitLocationYArray[Math.floor(Math.random() * enemyInitLocationYArray.length)];
    this.speed = Math.random() * coefficientOfSpeed + minimumSpeed;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    // Load the image to this.sprite
    this.sprite = 'images/char-boy.png';
    this.initializer();

};

// Initialize player's status and position
Player.prototype.initializer = function() {

    this.x = playerInitLocationX;
    this.y = playerInitLocationY;

};

Player.prototype.update = function() {
    
    // Avoid player to move out over left end.
    if (this.x <= 0) {
        this.x = 0;
    };

    // Avoid player to move off from right end.
    if (this.x >= rightEndOfCanvas - playerOneStepX) {
        this.x = rightEndOfCanvas - playerOneStepX;
    };

    // Avoid player to move off from low end.
    if (this.y >= lowEndOfCanvas - playerOneStepY) {
        this.y = playerInitLocationY;
    };

    // Avoid player to move off from upper end.
    if (this.y <= 0) {
        this.initializer();
    };

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

    // Player move to the direction according to the key code.
    switch (keyCode) {
        case "left":
            this.x -= playerOneStepX;
            break;
        case "up":
            this.y -= playerOneStepY;
            break;
        case "right":
            this.x += playerOneStepX;
            break;
        case "down":
            this.y += playerOneStepY;
            break;
    }

};

var Item = function() {
    this.sprite = 'images/Star.png';
    this.initializer();
};

Item.prototype.initializer = function() {
    this.x = itemInitLocationXArray[Math.floor(Math.random() * itemInitLocationXArray.length)];
    this.y = itemInitLocationYArray[Math.floor(Math.random() * itemInitLocationYArray.length)];
};

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var  gameStatus = "playing";
var  allEnemies = [];

for (var i=0; i< maxNumOfEnemy; i++) {
    allEnemies.push(new Enemy(i));
}

var player = new Player();
var item = new Item();


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
