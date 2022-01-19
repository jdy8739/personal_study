var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
            newBox.style.backgroundColor = this.color;
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
//Q1
var foo = function (a) {
    return a.length;
};
foo('tottenham hotspur');
var data = '{"name" : "dog", "age" : 1 }';
function foo2(a) {
    return JSON.parse(a);
}
;
var a = foo2(data);
//Q3
var Person = /** @class */ (function () {
    function Person(a) {
        this.name = a;
    }
    return Person;
}());
var aa = new Person('어쩌구');
aa.name; //any 타입이 되었넹 
function 함수(x) {
    return x.length;
}
var aaa = 함수({ length: 'myLength' });
var food1 = ['칠리새우', 10000, true];
var food2 = ['크림새우', 10000, true];
var food3 = ['우동', 10000, true];
//Q2
var arr111 = ['동서녹차', 4000, true, false, true, true, false, true];
var foo3 = function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    console.log(a);
};
foo3('동서녹차', 4000, true, false, true, true, false, true);
var foo4 = function (a, b) {
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
    console.log(a);
    console.log(b);
    console.log(c);
};
foo4('동서녹차', true, 4000, 'a', 'b', 'c', 12, 33);
function foo5() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    var numArr = [];
    var strArr = [];
    a.forEach(function (a) {
        typeof a === 'number' ? numArr.push(a) : null;
        typeof a === 'string' ? strArr.push(a) : null;
    });
    return [__spreadArray([], strArr, true), __spreadArray([], numArr, true)];
}
;
console.log(foo5('동서녹차', 4000, 'a', 'b', 'c', 12, 33, 'myles'));
var Car = /** @class */ (function () {
    function Car() {
        this.model = 'Ferrari';
    }
    Car.prototype.tax = function (a) {
        if (typeof a === 'number') {
            return a * 0.1;
        }
        else {
            return 0;
        }
    };
    return Car;
}());
var obj = {
    kek: 'kim',
    1: '20',
    32: 'seoul'
};
var obj2 = {
    model: 'k5',
    brand: 'kia',
    price: 6000,
    year: 2030,
    date: '6월',
    percent: '5%',
    dealer: '김차장',
};
var obj3 = {
    'font-size': 10,
    'secondary': {
        'font-size': 12,
        'third': {
            'font-size': 14
        }
    }
};
var bus = {
    color: 'red',
    model: 'ak-2',
    price: 2000000
};
var bus2 = {
    color: false,
    model: false,
    price: true
};
var aaaa = 'age';
var bbbb = 'name';
//let cccc :PersonKeys = 'namee'; 
function ab(a) {
    if (typeof a === 'number')
        return a + 2;
}
ab(10);
var aaaaa = 'hi'; //타입이 string
var bbbbb = 33; //타입이 unknown
var aaaaaa = 1;
var bbbbbb = '1';
