let myName1:string = 'Chung Do Young';

let names:string[] = ['Jack', "Saul", 'Isbell'];

let myProfile :{ name?:string, age?:number, isMale?:boolean } = { name: myName, age: 28, isMale: true };
//?는 옵션

const youtName:string | number[] = 'Kim';
//union type, 둘 중 하나 가능

type MyType = string[] | object | number;
// 커스텀 타입 지정 가능
//타입명은 보통 대문자로 시작

const str :MyType = [ 1, 2, 3 ];


function foo1(num:number) :string {
    return num.toString();
}
//인자와 리턴값 타입 지정 가능

type Member = [ string, number, boolean ];
//튜플 타입

const member:Member = [ 'Jack', 28, true ];
