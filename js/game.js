var game = new Game();
game.scroe = 0;
game.gameTimer = null;

game.init = function () {
    ground.init();
    snake.init();
    createFood();

    document.onkeydown = function (e) {
        if (e.which == 37 && snake.direction !== snake.directionNum.right) {
            snake.direction = snake.directionNum.left;
        } else if (e.which == 38 && snake.direction !== snake.directionNum.down) {
            snake.direction = snake.directionNum.top;
        } else if (e.which == 39 && snake.direction !== snake.directionNum.left) {
            snake.direction = snake.directionNum.right;
        } else if (e.which == 40 && snake.direction !== snake.directionNum.top) {
            snake.direction = snake.directionNum.down;
        }
    }

    var btn = document.getElementById('startBtn');
    btn.onclick = function () {
        game.start();
    }
    var stopBtn = document.getElementById('stopBtn');
    stopBtn.onclick = function() {
        game.stop();
    }
}

game.start = function () {
    clearInterval(this.gameTimer);
    this.gameTimer = setInterval(function () {
        snake.getNextSquare();
    }, intervalTime)
}
game.stop = function () {
    clearInterval(this.gameTimer);
}
game.over = function () {
    clearInterval(this.gameTimer);
    this.gameTimer = null;
    var flag = alert('游戏结束 得分：' + this.scroe + '。');
}

game.init();

function createFood() {
    var x = 0;
    var y = 0;
    var flag = true;
    while (flag) {
        x = Math.floor(Math.random() * (td - 3) + 1);
        y = Math.floor(Math.random() * (tr - 3) + 1);
        var ok = false;
        for (var node = snake.head; node; node = node.next) {
            if (x != node.x && y != node.y) {
                ok = true;
                break;
            }
        }
        if (ok) {
            flag = false;
        }
    }

    var food = SquareFac.create('Food', x, y, 'red');
    ground.remove(x, y);
    ground.append(food);
}