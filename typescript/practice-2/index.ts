//Q2
class User {
  private static x = 10;
  public static y = 20;

  static addOne(param: number) {
    User.x += param;
  }

  static showX() :void {
    console.log(User.x)
  }

  protoF() {
    alert('hi.');
  }
}


//Q3
const body = document.getElementsByTagName('body')[0];
const aniBox = document.createElement('div'); 
const len = '400px';
aniBox.style.width = len;
aniBox.style.height = len;

body.append(aniBox);

class Square {
  width;
  height;
  color;
  constructor(width: number, height: number, color: string) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    if(aniBox) {
      const newBox = document.createElement('div');
      newBox.style.position = 'absolute';
      newBox.style.backgroundColor = this.color;
      newBox.style.width = this.width + 'px';
      newBox.style.height = this.height + 'px';

      const x = Math.random() * 400 + 1;
      const y = Math.random() * 400 + 1;

      newBox.style.top = x + 'px';
      newBox.style.left = y + 'px';

      aniBox.append(newBox);
    }
  }
}

const sq = new Square(30, 30, 'red');
sq.draw();

const boxMaker = document.querySelector('#box-maker');

if(boxMaker instanceof HTMLButtonElement) {
  boxMaker.addEventListener('click', () => {
    sq.draw();
  });
}



//Q1
const foo = function<T extends string | []>(a: T) {
  return a.length;
};

foo('tottenham hotspur');


//Q2
interface Animal {
  name : string;
  age : number 
}

let data = '{"name" : "dog", "age" : 1 }'

function foo2<T extends string>(a: T) :Animal {
  return JSON.parse(a);
};

const a: Animal = foo2<string>(data);


//Q3
class Person<T> {
  name;
  constructor(a: T){
    this.name = a;
  }
}

let aa = new Person<string>('어쩌구');
aa.name //any 타입이 되었넹 



interface A {
  length: string
}

function 함수<MyType extends A>(x: MyType) :string {
  return x.length;
}

let aaa = 함수<A>({ length: 'myLength' });


//Q1
type Food = [ string, number, boolean ];

const food1: Food = [ '칠리새우', 10000, true ];
const food2: Food = [ '크림새우', 10000, true ];
const food3: Food = [ '우동', 10000, true ];


//Q2
let arr111 = ['동서녹차', 4000, true, false, true, true, false, true];

type Arr = [ string, number, ...boolean[] ];
type Foo = (...rest: Arr) => void;

const foo3: Foo = (...a) => {
  console.log(a);
};

foo3('동서녹차', 4000, true, false, true, true, false, true);


//Q3
type Foo4 = (...rest: [ string, boolean, ...(number | string)[] ]) => void;

const foo4: Foo4 = function (a, b, ...c) {
  console.log(a);
  console.log(b);
  console.log(c);
};

foo4('동서녹차', true, 4000, 'a', 'b', 'c', 12, 33);


//Q4
type Foo5 = (number | string)[];

function foo5(...a: Foo5) :[string[], number[]] {
  const numArr: number[] = [];
  const strArr: string[] = [];

  a.forEach(a => {
    typeof a === 'number' ? numArr.push(a) : null;
    typeof a === 'string' ? strArr.push(a) : null;
  });

  return [[...strArr], [...numArr]];
};

console.log(foo5('동서녹차', 4000, 'a', 'b', 'c', 12, 33, 'myles'));



interface CarType {
  model: string,
  tax: (price: number) => number;
}

class Car implements CarType {
  model = 'Ferrari';
  tax(a: number) {  
    if(typeof a === 'number') {
      return a * 0.1;
    } else {
      return 0;
    }
  }
}


interface StringOnly {
  [key: string]: string,
}

let obj :StringOnly = {
  kek : 'kim',
  1 : '20',
  32 : 'seoul'
}



//Q1
interface Obj {
  [keies: string]: string | number
}

let obj2: Obj = {
  model : 'k5',
  brand : 'kia',
  price : 6000,
  year : 2030,
  date : '6월',
  percent : '5%',
  dealer : '김차장',
}

//Q2
interface Obj3 {
  [key: string]: number | object;
  'font-size': number | Obj3;
}

let obj3: Obj3 = {
  'font-size' : 10,
  'secondary' : {
    'font-size' : 12,
    'third' : {
      'font-size' : 14
    }
  }
}



//Q1
type Bus = {
  color : string,
  model : boolean,
  price : number
}

type TypeChanger<T> = {
  [key in keyof T]: string | number
}

type NewBus = TypeChanger<Bus>;

const bus: NewBus = {
  color : 'red',
  model : 'ak-2',
  price : 2000000
};


//Q2
type TypeChanger2<T, S> = {
  [key in keyof T]: S
}

type NewBus2 = TypeChanger2<Bus, boolean>

const bus2: NewBus2 = {
  color : false,
  model : false,
  price : true
};


type Person1 = {
  age: number;
  name: string;
}
type PersonKeys = keyof Person1;   //"age" | "name" 타입됩니다

let aaaa :PersonKeys = 'age'; 
let bbbb :PersonKeys = 'name'; 
//let cccc :PersonKeys = 'namee'; 


function ab<T extends number | string>(a: T) {
  if(typeof a === 'number') return a + 2;
}

ab<number>(10);



//Q1
type AAA<T> = T extends [string, ...any] ? string : unknown; 

const aaaaa: AAA<[string, number]> = 'hi'; //타입이 string
const bbbbb: AAA<[boolean, string]> = 33; //타입이 unknown


//Q2
type BBB<T> = T extends (x: infer R) => void ? R : unknown;

const aaaaaa: BBB<(x: number) => void> = 1;
const bbbbbb: BBB<(x: string) => void> = '1';