var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);
ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = 'red';
    document.body.appendChild(this.viewContent);

    this.squareArr = [];

    for (let y = 0; y < tr; y++) {
        this.squareArr[y] = new Array(td);
        for (let x = 0; x < td; x++) {
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                //围墙
                var newSquare = new SquareFac.create('wall', x, y, '#000')
            } else {
                //地板
                var newSquare = new SquareFac.create('floor', x, y, '#ccc')
            }
            this.squareArr[y][x] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}
// ground.init();

ground.remove = function (x, y) {
    var cont = this.squareArr[y][x];
    this.viewContent.removeChild(cont.viewContent);
    this.squareArr[y][x] = null;
}

ground.append = function(square) {
    this.viewContent.appendChild(square.viewContent);
    this.squareArr[square.y][square.x] = square;
}