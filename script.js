console.log('SNAME GAME!!')
let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 }
]

const board_border = 'black';
const board_background = "white";

const snake_col = 'lightblue';
const snake_border = 'darkblue';

let dx = 10;
let dy = 0;

let food_x;
let food_y;

let score = 0

const snakeboard = document.querySelector('canvas')
console.log(snakeboard);
const snakeboard_ctx = snakeboard.getContext('2d')

main();
place_food()

function main() {
    if (gameEnded()) {
        return;
    }
    setTimeout(() => {
        clearCanvas();
        drawFood()
        moveSnake();
        drawSnake()
        main()
    }, 100);
}

function clearCanvas() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokeStyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawsnakepart(snakepart) {
    snakeboard_ctx.fillStyle = snake_col
    snakeboard_ctx.strokeStyle = snake_border
    snakeboard_ctx.fillRect(snakepart.x, snakepart.y, 10, 10)
    snakeboard_ctx.strokeRect(snakepart.x, snakepart.y, 10, 10)

}

function drawSnake() {
    snake.forEach(drawsnakepart)
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }
    snake.unshift(head)
    const has_eaten_apple = snake[0].x === food_x && snake[0].y === food_y
    if (has_eaten_apple) {
        place_food()
    } else {
        snake.pop()
    }
}

function chagne_direction(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39
    const DOWN_KEY = 40;

    const keyPresssed = event.keyCode;
    console.log("keyPresssed", keyPresssed);

    const goingUp = dy !== 10
    const goingDown = dy !== -10
    const goingRight = (dx !== -10);
    const goingLeft = dx !== 10

    if (keyPresssed === LEFT_KEY && goingLeft) {
        console.log("left");
        dx = -10;
        dy = 0
    }
    if (keyPresssed === RIGHT_KEY && goingRight) {
        console.log("right");
        dx = 10;
        dy = 0
    }
    if (keyPresssed === UP_KEY && goingUp) {
        console.log("up");
        dx = 0;
        dy = -10;
    }

    if (keyPresssed === DOWN_KEY && goingDown) {
        console.log("down");
        dx = 0;
        dy = 10;
    }
    console.log(dx, dy);
}

function gameEnded() {
    //head collides with its own body

    //snake hits the wall
    const hitLeftWall = snake[0].x < 0;
    const hitRightwall = snake[0].x > snakeboard.width - 10;
    const hitTopwall = snake[0].y < 0;
    const hitBottomwall = snake[0].y > snakeboard.height - 10

    return hitLeftWall || hitRightwall || hitTopwall || hitBottomwall
}

function random_points(min, max) {
    const a = Math.round((Math.random() * (max - min) + min) / 10) * 10
    return a
}

function place_food(part) {
    food_x = random_points(0, snakeboard.width - 10)
    food_y = random_points(0, snakeboard.height - 10)
    console.log("food loaction", food_x, food_y);
    snake.forEach(has_snake_eaten_food = (part) => {
        const has_eaten = part.x === food_x && part.y === food_y
        if (has_eaten) {
            place_food()
        }
    })
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen'
    snakeboard_ctx.strokeStyle = 'darkgreen'
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10)
}

document.addEventListener("keydown", chagne_direction)


