//Q2
var User = /** @class */ (function () {
    function User() {
    }
    User.addOne = function (param) {
        User.x += param;
    };
    User.showX = function () {
        console.log(User.x);
    };
    User.prototype.protoF = function () {
        alert('hi.');
    };
    User.x = 10;
    User.y = 20;
    return User;
}());
//Q3
var body = document.getElementsByTagName('body')[0];
var aniBox = document.createElement('div');
var len = '400px';
aniBox.style.width = len;
aniBox.style.height = len;
body.append(aniBox);
var Square = /** @class */ (function () {
    function Square(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    Square.prototype.draw = function () {
        if (aniBox) {
            var newBox = document.createElement('div');
            newBox.style.position = 'absolute';
            newBox.style.backgroundColor = 'red';
            newBox.style.width = this.width + 'px';
            newBox.style.height = this.height + 'px';
            var x = Math.random() * 400 + 1;
            var y = Math.random() * 400 + 1;
            newBox.style.top = x + 'px';
            newBox.style.left = y + 'px';
            aniBox.append(newBox);
        }
    };
    return Square;
}());
var sq = new Square(30, 30, 'red');
sq.draw();
var boxMaker = document.querySelector('#box-maker');
if (boxMaker instanceof HTMLButtonElement) {
    boxMaker.addEventListener('click', function () {
        sq.draw();
    });
}
