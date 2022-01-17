const title = document.getElementById('title');

if(title instanceof Element) {
    setTimeout(function() {
        title.innerText = 'HI!';
    }, 1000);
}

const link = document.getElementById('link');
if(link instanceof HTMLAnchorElement) {
    link.href = 'https://www.naver.com';
}

const btn = document.getElementById('sexy-button');
if(btn instanceof HTMLButtonElement) {
    btn?.addEventListener('click', function() {
        const innerTxt = btn.innerText;
        btn.innerText = `super sexy ${ innerTxt }`;
    });
}


//Q1
const img = document.getElementById('image');

let isFirstImg = true;

const manupulateBtn = document.getElementById('img-changer');
manupulateBtn?.addEventListener('click', () => {
    if(img instanceof HTMLImageElement) {
        if(isFirstImg) {
            img.src = 'img.jpg';
            isFirstImg = false;
        } else {
            img.src = 'helpbox-contact.jpg';
            isFirstImg = true;
        }
    }
});


//Q2
const naverLinks = document.getElementsByClassName('naver');

for(let i=0; i<naverLinks.length; i++) {
    const a = naverLinks[i];
    if(a instanceof HTMLAnchorElement) {
        a.href = 'https://www.daum.net';
    }
}


//Q1
class Car {
    model: string;
    price: number;
    constructor(model: string, price: number) {
        this.model = model;
        this.price = price;
    }
    calcTax() :number {
        return this.price * 0.1;
    }
}

const myCar = new Car('셰보레', 2000000);
//alert(myCar.calcTax());


//Q2
class Word {
    strArr: string[];
    numArr: number[];
    constructor(a: string | number) {
        const tmpStr: string[] = [];
        const tmpNum: number[] = [];
        if(typeof a === 'string') {
            for(let i=0; i<a.length; i++) {
                tmpStr.push(a[i]);
            }
            this.strArr = tmpStr;
        } else if(typeof a === 'number') {
            a = a.toString();
            for(let i=0; i<a.length; i++) {
                tmpNum.push(parseInt(a[i]));
            }
            this.numArr = tmpNum;
        }
    }
}

const newWord = new Word('가나다라마바사');
const newWord2 = new Word(123456789);
alert(newWord2.numArr);


//Q1
interface prod { brand: string, serialNumber: number, model: string[] }
const prodArr: prod = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] };

//Q2
interface Model { product: string, price: number };
const productArr: Model[] = [ { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 } ];

//Q3
interface Model2 extends Model { card: boolean };
const productArr2: Model2[] = [ { product : '청소기', price : 7000, card: true } ];

//Q4
type Plus = (a: number, b: number) => number;
type Minus = (a: number, b: number) => number;

interface Calculator { plus: Plus, minus: Minus };

const calc: Calculator = { 
    plus(a, b) {
        return a + b;
    },
    minus(a, b) {
        return a - b;
    }
};

alert(calc.plus(1, 4));
alert(calc.minus(1, 4));