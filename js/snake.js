var snake = new Snake();

snake.head = null;
snake.tail = null; //蛇尾

snake.directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    down: {
        x: 0,
        y: 1
    },
}

snake.init = function () {
    var snakeHead = new SquareFac.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = new SquareFac.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = new SquareFac.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeHead;
    snake.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.direction = snake.directionNum.right;
}

// 获取蛇头下一个位置
snake.getNextSquare = function () {
    var nextSquare = ground.squareArr[snake.head.y + this.direction.y][snake.head.x + this.direction.x];

    this.nextColliedMethod[nextSquare.collied](nextSquare);
}

// 下一步处理方法
snake.nextColliedMethod = {
    move: function (nextSquare, bool) {
        var newBody = SquareFac.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        // 更新链表
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        var newHead = SquareFac.create('SnakeHead', nextSquare.x, nextSquare.y, 'deeppink');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(nextSquare.x, nextSquare.y);
        ground.append(newHead);

        snake.head = newHead; //更新蛇头
        if (!bool) {
            var newFloor = SquareFac.create('floor', snake.tail.x, snake.tail.y, '#ccc');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);

            snake.tail = snake.tail.last; //更新蛇尾
        }

    },
    eat: function (nextSquare) {
        game.scroe++;
        this.move(nextSquare, true);
        createFood();
    },
    die: function () {
        game.over();
    }
}

// snake.init();
// snake.getNextSquare();