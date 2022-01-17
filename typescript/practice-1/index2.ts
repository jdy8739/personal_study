const myName:string ="Jack";
const myAge:Number = 28;
const homeland:string = 'Seoul Korea';

type myFav = { artist :string, song :string }
const myFavList :myFav = { artist: 'Slash', song: 'Paradise city' };


type pro = { member :string[], days :number, started :boolean };

const project :pro = {
    member : ['kim', 'park'],
    days : 30,
    started : true,
};

let 학교 :{
    score :(Number | boolean)[],
    teacher :string,
    friend :(string | string[])
} = {
    score : [100, 97, 84],
    teacher : 'Phil',
    friend : 'John'
}

학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]


const foo = (a :number, b :number) => a * b;

function foo2(a :number, b? :number) :void {
    alert(a * b);
};


//Q1
function sayHi(name? :string) :void {
    if(name !== undefined) console.log(`Hi. ${ name }`);
    else console.log('No named.')
};

//Q2
function calcLength(word :( string | number )) :number {
    if(typeof word === 'number') return word.toString().length;
    return word.length;
};

//Q3
const canYouMarry = (salary :number, haveHouse :boolean, charmingLevel: string) => {
    let point :number = salary;
    if(haveHouse) point += 500;
    switch (charmingLevel) {
        case '상':
            point += 100;
        case '중':
            point += 0;
        case '하':
            point += 0;
    }
    if(point >= 600) return 'Yes. You can marry.';
};

canYouMarry(600, false, '상');



//Q1
const arr :(string | number)[] = ['1', 2, 3, '4', 5];

function typeChanger(tgArr :(string | number)[]) :number[] {

    const newArr :number[] = tgArr.map(a => {
        if(typeof a === 'string') return parseInt(a);
        else return a;
    });
    return newArr;
};

typeChanger(arr);


//Q2
let 철수쌤 = { subject : 'math' };
let 영희쌤 = { subject : ['science', 'english'] };
let 민수쌤 = { subject : ['science', 'art', 'korean'] };

type subj = { subject :string | string[] };

function filterSubj(subject :subj) :string {
    const tgSub = subject.subject;

    if(typeof tgSub === 'string') {
        return tgSub;
    } else if(Array.isArray(tgSub)) {
        return tgSub[ tgSub.length - 1];    
    }
    return;
};


//Q1
type T1 = { a :number };
type T2 = { b :number };

type T3 = T1 | T2;


//Q2
type A = { color? :string, size: number, readonly position :number[] };
const a1 :A = { color: 'a', size: 12, position: [ 1, 2, 3 ] };


//Q3
type MemberType = { name :string, phone :number, email :string };
type MemberArrType = MemberType[];

const memberArr :MemberArrType = [ { name: 'Jack', phone: 123, email: '123@gmail.com' } ];


type MemberType2 = { isAdult :boolean };
type MemberType3 =  MemberType & MemberType2;

const member1 :MemberType3 = { name: 'Jack', phone: 123, email: '123@gmail.com', isAdult: true };



//리터럴로 타입 만들기
type aa = ('rock' | 'scissor' | 'paper');

type rspArr = (a :aa) => aa[];

function rockScissorPaper(opt :aa) :(aa)[] {
    return [ opt ];
}


//함수타입 표현

type AA = (x :number, y :number ) => number;
const funcAA :AA = (x, y) => x * y;
funcAA(2, 3);


//Q1

type BB = () => void;

const objA = {
    a: 'a',
    b() {
        alert('b');
    },
    c: function() {
        alert('c');
    },
    d: () => {
        alert('d');
    },
    plusOne(a :number) :number {
        return a;
    },
    changeName: function() {

    }
};

type objB = {
    plusOne: (a :number) => number,
    changeName: () => void
}

const bbb :objB = { 
    plusOne: function(a) {
        return a;
    },
    changeName: () => {
        console.log('Hi.');
    }
}



//Q2
type objC = {
    cutZero: (a :string) => string,
    removeDash: (a: string) => number 
}

const ccc :objC = {
    cutZero: function(a) {
        if(a[0] === '0') a.slice(1);
        return a;
    },
    removeDash: function(a) {
        const res = a.replace(/-/g, "");
        return parseInt(res);
    }
}


//Q3
type Machine = (a :string, b :objC) => number;
const phoneNo = '010-8739-2582';

const result :Machine = (a, b) => {
    return b.removeDash(b.cutZero(a));
};

result(phoneNo, ccc);
