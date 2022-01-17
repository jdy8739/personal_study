var myName = "Jack";
var myAge = 28;
var homeland = 'Seoul Korea';
var myFavList = { artist: 'Slash', song: 'Paradise city' };
var project = {
    member: ['kim', 'park'],
    days: 30,
    started: true
};
var 학교 = {
    score: [100, 97, 84],
    teacher: 'Phil',
    friend: 'John'
};
학교.score[4] = false;
학교.friend = ['Lee', 학교.teacher];
var foo = function (a, b) { return a * b; };
function foo2(a, b) {
    alert(a * b);
}
;
//Q1
function sayHi(name) {
    if (name !== undefined)
        console.log("Hi. ".concat(name));
    else
        console.log('No named.');
}
;
//Q2
function calcLength(word) {
    if (typeof word === 'number')
        return word.toString().length;
    return word.length;
}
;
//Q3
var canYouMarry = function (salary, haveHouse, charmingLevel) {
    var point = salary;
    if (haveHouse)
        point += 500;
    switch (charmingLevel) {
        case '상':
            point += 100;
        case '중':
            point += 0;
        case '하':
            point += 0;
    }
    if (point >= 600)
        return 'Yes. You can marry.';
};
canYouMarry(600, false, '상');
//Q1
var arr = ['1', 2, 3, '4', 5];
function typeChanger(tgArr) {
    var newArr = tgArr.map(function (a) {
        if (typeof a === 'string')
            return parseInt(a);
        else
            return a;
    });
    return newArr;
}
;
typeChanger(arr);
//Q2
var 철수쌤 = { subject: 'math' };
var 영희쌤 = { subject: ['science', 'english'] };
var 민수쌤 = { subject: ['science', 'art', 'korean'] };
function filterSubj(subject) {
    var tgSub = subject.subject;
    if (typeof tgSub === 'string') {
        return tgSub;
    }
    else if (Array.isArray(tgSub)) {
        return tgSub[tgSub.length - 1];
    }
    return;
}
;
var a1 = { color: 'a', size: 12, position: [1, 2, 3] };
var memberArr = [{ name: 'Jack', phone: 123, email: '123@gmail.com' }];
var member1 = { name: 'Jack', phone: 123, email: '123@gmail.com', isAdult: true };
function rockScissorPaper(opt) {
    return [opt];
}
var funcAA = function (x, y) { return x * y; };
funcAA(2, 3);
var objA = {
    a: 'a',
    b: function () {
        alert('b');
    },
    c: function () {
        alert('c');
    },
    d: function () {
        alert('d');
    },
    plusOne: function (a) {
        return a;
    },
    changeName: function () {
    }
};
var bbb = {
    plusOne: function (a) {
        return a;
    },
    changeName: function () {
        console.log('Hi.');
    }
};
var ccc = {
    cutZero: function (a) {
        if (a[0] === '0')
            a.slice(1);
        return a;
    },
    removeDash: function (a) {
        var res = a.replace(/-/g, "");
        return parseInt(res);
    }
};
var phoneNo = '010-8739-2582';
var result = function (a, b) {
    return b.removeDash(b.cutZero(a));
};
result(phoneNo, ccc);
