var title = document.getElementById('title');
if (title instanceof Element) {
    setTimeout(function () {
        title.innerText = 'HI!';
    }, 1000);
}
var link = document.getElementById('link');
if (link instanceof HTMLAnchorElement) {
    link.href = 'https://www.naver.com';
}
var btn = document.getElementById('sexy-button');
if (btn instanceof HTMLButtonElement) {
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () {
        var innerTxt = btn.innerText;
        btn.innerText = "super sexy ".concat(innerTxt);
    });
}
//Q1
var img = document.getElementById('image');
var isFirstImg = true;
var manupulateBtn = document.getElementById('img-changer');
manupulateBtn === null || manupulateBtn === void 0 ? void 0 : manupulateBtn.addEventListener('click', function () {
    if (img instanceof HTMLImageElement) {
        if (isFirstImg) {
            img.src = 'img.jpg';
            isFirstImg = false;
        }
        else {
            img.src = 'helpbox-contact.jpg';
            isFirstImg = true;
        }
    }
});
//Q2
var naverLinks = document.getElementsByClassName('naver');
for (var i = 0; i < naverLinks.length; i++) {
    var a = naverLinks[i];
    if (a instanceof HTMLAnchorElement) {
        a.href = 'https://www.daum.net';
    }
}
//Q1
var Car = /** @class */ (function () {
    function Car(model, price) {
        this.model = model;
        this.price = price;
    }
    Car.prototype.calcTax = function () {
        return this.price * 0.1;
    };
    return Car;
}());
var myCar = new Car('셰보레', 2000000);
//alert(myCar.calcTax());
//Q2
var Word = /** @class */ (function () {
    function Word(a) {
        var tmpStr = [];
        var tmpNum = [];
        if (typeof a === 'string') {
            for (var i = 0; i < a.length; i++) {
                tmpStr.push(a[i]);
            }
            this.strArr = tmpStr;
        }
        else if (typeof a === 'number') {
            a = a.toString();
            for (var i = 0; i < a.length; i++) {
                tmpNum.push(parseInt(a[i]));
            }
            this.numArr = tmpNum;
        }
    }
    return Word;
}());
var newWord = new Word('가나다라마바사');
var newWord2 = new Word(123456789);
alert(newWord2.numArr);
var prodArr = { brand: 'Samsung', serialNumber: 1360, model: ['TV', 'phone'] };
;
var productArr = [{ product: '청소기', price: 7000 }, { product: '삼다수', price: 800 }];
;
var productArr2 = [{ product: '청소기', price: 7000, card: true }];
;
var calc = {
    plus: function (a, b) {
        return a + b;
    },
    minus: function (a, b) {
        return a - b;
    }
};
alert(calc.plus(1, 4));
alert(calc.minus(1, 4));
