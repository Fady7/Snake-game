var tr = 30; //行，高度
var td = 30; //列，宽度
var squareWidth = 20; //格子大小
var positionX = 200;
var positionY = 100;
var intervalTime = 200; //移动间隔时间

function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

// 更新单例对象的x，y
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
}

var Ground = tools.single(Square); //场景
var Floor = tools.extends(Square); //地板
var Wall = tools.extends(Square); //围墙

var SnakeHead = tools.single(Square);
var SnakeBody = tools.extends(Square);
var Snake = tools.single(Square);

var Food = tools.single(Square);
var Game = tools.single();

var colliedType = {
    move: 'move',
    eat: 'eat',
    die: 'die'
}