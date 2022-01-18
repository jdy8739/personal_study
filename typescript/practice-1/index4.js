;
var person = { student: true, age: 20 };
function 함수(_a) {
    var student = _a.student, age = _a.age;
    console.log(student, age);
}
함수({ student: true, age: 20 });
var returnMax = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var max = rest.reduce(function (a, b) {
        return a > b ? a : b;
    });
    return max;
};
returnMax(1, 2, 3, 4, 5, 6, 7, 8, 9);
;
var foo5 = function (_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(JSON.stringify({ user: user, comment: comment, admin: admin }));
};
foo5({ user: 'kim', comment: [3, 5, 4], admin: false });
var foo6 = function (_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    console.log(a, b, c);
};
