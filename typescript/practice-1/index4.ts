//Q1
interface Info { student: boolean, age: number };

let person: Info = { student : true, age : 20 };

function 함수({student, age}: Info){
  console.log(student, age);
}

함수({ student : true, age : 20 });


//Q2
type Max = (...rest: number[]) => number; 

const returnMax: Max = (...rest) => {
    const max = rest.reduce((a, b) => {
        return a > b ? a : b;
    });
    return max;
};

returnMax(1, 2, 3, 4, 5, 6, 7, 8, 9);


//Q3
interface III { user: string, comment: number[], admin: boolean };
type Foo5 = (obj: III) => void;

const foo5: Foo5 = function({ user, comment, admin }) {
    console.log(JSON.stringify({ user, comment, admin }));
}

foo5({ user : 'kim', comment : [3,5,4], admin : false });


//Q4
type Foo6 = ([ a: number, b: string, c: boolean ]);

const foo6 = ([a, b, c]: Foo6) :void => {
    console.log(a, b, c);
};