// Enemies our player must avoid
class Enemy {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/robot.png';
        this.x = -1000 + Math.floor(Math.random() * 1000);
        this.y = 85 * Math.ceil(Math.random() * 3) - 35;
        this.speed = 150 + Math.floor(Math.random() * 100);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed;
        //check collision
        if (this.y == (player.y - 50) 
        && (this.x >= (player.x - 70) && this.x <= (player.x + 40))
        ) {
            player.y = 355;
        }
        if (this.x > 470) {
            this.x = -800 + Math.floor(Math.random() * 700);
            this.y = 85 * Math.ceil(Math.random() * 3) - 35;
            this.speed = 150 + Math.floor(Math.random() * 100);
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/cat.gif';
        this.x = 200;
        this.y = 355;
        this.deltaX = 0;
        this.deltaY = 0;
    }

    handleInput(keyCode){
        switch(keyCode) {
            case 'left':
                this.deltaX--;
                break;
            case 'right':
                this.deltaX++;
                break;
            case 'up':
                this.deltaY--;
                break;
            case 'down':
                this.deltaY++;
                break;
            default:
                break;
        }
    }

    update(dt) {
        this.x += 100 * this.deltaX;
        this.x = (this.x > 400 ? 400 : this.x);
        this.x = (this.x < 0 ? 0 : this.x);
        this.y += 85 * this.deltaY;
        this.y = (this.y > 440 ? 440 : this.y);
        if (this.y < 100) {
            this.y = 355;
            winCount++;
            $('#goal_text').css('display', 'none');
            $('#progress_text').css('display', 'block');
            $('#win_num').text(winCount);
        }
        this.deltaX = 0;
        this.deltaY = 0;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let winCount = 0;
let player = new Player();
let allEnemies = [];
for (enemyIter = 0; enemyIter < 6; enemyIter++ ) {
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
