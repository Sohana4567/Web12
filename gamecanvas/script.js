
// creating a canvas
let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight

//Declaration of all score


let ScoreCount = 0;
let ScoreText = '';
let JumpScore = 0;
let JumpText = '';
let AllPlayer = [];
let max = 0;
let maxRect = 0;

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

// Creating a single circle
const falldown = 1;
class SinglePlayer {
    constructor(position) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.height = 100,
            this.radius = 30
    }
    drawcircle() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'blue';
        c.fillStyle = 'black'
        c.fill();
        c.stroke();
    }

    update() {
        this.drawcircle();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.radius + this.velocity.y < canvas.height) {
            this.velocity.y += falldown;

        } else {
            this.velocity.y = 0;
        }
    }
    reset() {
        this.position.x = 0;
        this.position.y = 0;

    }
}

// Creating all Rectangle box
class Rectangle {
    constructor(position) {
        this.position = position;
        this.height = 100;
        this.width = 100;
        this.colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
    }
    draw() {
        c.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)]
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//  Display all the score of JumpScore,blockedscore and Totalscore
function displayScore(ScoreCount, font) {
    c.fillStyle = "red";
    c.textAlign = "center";
    c.font = font
    ScoreText = "Blocked Score" + ":-" + ScoreCount + "";
    c.fillText(ScoreText, 1700, 90);

}

function displayJump(JumpScore, font) {

    c.fillStyle = "red";
    c.textAlign = "center";
    c.font = font
    JumpText = "Jump Score" + ":-" + JumpScore + "";
    c.fillText(JumpText, 1700, 130);

}
function totalScore(ScoreCount, JumpScore, font) {

    c.fillStyle = "red";
    c.textAlign = "center";
    c.font = font
    let sum = 0;
    if (ScoreCount == 0 && JumpScore == 0) {
        sum = 0;
    } else {
        sum = 100 - (ScoreCount + JumpScore)
    }
    if (sum < 0) {
        sum = 0;

    }
    ScoreText = "Total Score" + ":-" + sum + "";
    c.fillText(ScoreText, 1700, 170);
}

//Calculate the distance of circle and rectangle

function getDistance(x1, y1, x2, y2, CircleRadius, RectHeight, RectWidth) {
    var distX = Math.abs(x1 - x2 - RectWidth / 2);
    var distY = Math.abs(y1 - y2 - RectHeight / 2);

    if (distX > (RectWidth / 2 + CircleRadius)) { return false; }
    if (distY > (RectHeight / 2 + CircleRadius)) { return false; }

    if (distX <= (RectWidth / 2)) { return true; }
    if (distY <= (RectHeight / 2)) { return true; }

    var dx = distX - RectWidth / 2;
    var dy = distY - RectHeight / 2;
    return (dx * dx + dy * dy <= (CircleRadius * CircleRadius));
}
//Calculate the distance of touching point in each rectangle so that it come back to initial position

function resetPlayer(Cx1, Cy1, Rx1, Rx2, CircleRadius, RectangleHeight, RectangleWidth) {
    if (getDistance(Cx1, Cy1, Rx1, Rx2, CircleRadius, RectangleHeight, RectangleWidth)) {

        Player1.reset();
        ScoreCount++;
    }
    if (Player1.position.x >= window.innerWidth) {
        Player1.reset();
        ScoreCount = 0;
    }
    if (Player1.position.y < 0) {

        Player1.position.y = 0;
    }
}

//Creating an object of single player and all player
const Player1 = new SinglePlayer({ x: 30, y: 0 });
const Player2 = new Rectangle({ x: 200, y: 880 });
max = Player2.position.x
function RandomRectangle() {
    maxRect = Math.max(max, max + 300);
    max = maxRect;
    return max;
}
function PlayerCreated() {
    for (let i = 2; i <= 6; i++) {
        AllPlayer.push(new Rectangle({ x: RandomRectangle(), y: 880 }));
    }
}

//Creating an  Automated  animation 
function animated() {
    window.requestAnimationFrame(animated)
    c.fillStyle = '#E5E5E5'
    c.fillRect(0, 0, canvas.width, canvas.height)


    Player1.update();
    Player2.draw();

    if (getDistance(Player1.position.x, Player1.position.y, Player2.position.x, Player2.position.y, Player1.radius, Player2.height, Player2.width)) {
        Player1.reset();
        ScoreCount++;

    }
    for (let i = 0; i < AllPlayer.length; i++) {

        AllPlayer[i].draw();
       resetPlayer(Player1.position.x, Player1.position.y, AllPlayer[i].position.x, AllPlayer[i].position.y, Player1.radius, AllPlayer[i].height, AllPlayer[i].width);
    }
    displayScore(ScoreCount, "30px Arial");
    displayJump(JumpScore, "30px Arial");
    totalScore(ScoreCount, JumpScore, "30px Arial");

    if (keys.d.pressed) {
        Player1.velocity.x = 1;
    } else {
        if (keys.a.pressed) {
            Player1.velocity.x = -1
            if (Player1.velocity.x < 0) {
                Player1.velocity.x = 0;
            }
        }
    }
    resetPlayer();
}



window.onload = function () {
    animated();

}


//Creating a jump functionality,moving functionality
window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            break
        case 'a':
            keys.a.pressed = true;
            break
        case 'w':
            Player1.velocity.y = -15;
            JumpScore++;
            break
    }
})
window.addEventListener('keyup', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
    }
})
PlayerCreated();