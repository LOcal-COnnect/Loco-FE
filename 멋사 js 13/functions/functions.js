/**
 * 함수(functions)
 * - 작업의 묶음
 * - 코드를 반복해서 작성하는 비효율 줄임
 */

//함수 선언문
//function multiply(a,b) {
//    return a * b;
//}

//console.log(multiply(10,5));

//var result = multiply(435, 24);

//console.log(result);

//함수 표현식
//var multiply = function (a,b) {
//    return a * b
//};

//console.log(multiply(10,5));

/**
 * 변수 키워드 - var, let, const
 */


//var a = 10;
//
//while (true) {
//    var a = 1000;
//    break;
//}

//console.log(a);


//호이스팅

//console.log(word);

//word = "happy";

//console.log(word);

//var word;


// let
//let word;

//console.log(word);

//word = "happy";

//console.log(word);


//let a = 10;

//while (true) {
//    let a = 1000;
//    break;
//}

//console.log(a);


// const

//const b = 2;

//console.log(b);

//b = 3; //X


// const로 선언된 변수에 할당된 객체
const student = {
    grade: 1,
    class: 3
}

//student.grade = 2;

//console.log(student);

//student = {
//    num = 20123;
//    grade: 2
//}

//console.log(student); //X

//화살표 함수

//let plus = (a, b) => {
//    return a + b;
//};

//let plus = (a, b) => a + b;

//console.log(plus(2,3));

//let print = word => {
//    console.log(word);
//}

//print("Hello!");


let myfunc = () => {
    return 1;
}

console.log(myfunc());