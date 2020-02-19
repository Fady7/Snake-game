function SquareFac() {

}

SquareFac.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.left = square.width * square.x + 'px';
    square.viewContent.style.top = square.height * square.y + 'px';
    square.viewContent.style.backgroundColor = color;

    square.collied = action;
}

SquareFac.prototype.floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, colliedType.move);
    return floor;
}

SquareFac.prototype.wall = function (x, y, color) {
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, colliedType.die);
    return wall;
}

SquareFac.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, colliedType.die);

    snakeHead.upDate(x, y); //更新蛇头单例对象信息

    return snakeHead;
}

SquareFac.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, colliedType.die);
    return snakeBody;
}

SquareFac.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, colliedType.eat);

    food.upDate(x, y);

    return food;
}

SquareFac.create = function (type, x, y, color) {
    if (!SquareFac.prototype[type]) {
        throw 'have no this type';
    }
    SquareFac.prototype[type].prototype = new SquareFac();
    return new SquareFac.prototype[type](x, y, color);
}