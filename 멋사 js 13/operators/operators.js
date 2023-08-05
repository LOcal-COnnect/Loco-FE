/**
 * 연산자
 * -1개의 표현식에 대해 산술, 대입,
 * 논리, 타입 등을 평가하여 값을 생성하는 작업
 */


// 1. 산술 연산자

var a = 10;
var b = 3;

// console.log(a+b);
// console.log(a-b);
// console.log(a*b);
// console.log(a/b);
// console.log(a%b);

// console.log(a);
// console.log(b);

var c = 7;
//console.log(++c);
//console.log(c++);
//console.log(--c);
//console.log(c--);
//console.log(c);


// 2. 대입 연산자, 할당 연산자

var d = 2;
// d = 10;
// console.log(d);

// console.log(d += 3);    //d = d + 3
// console.log(d -= 3);
// console.log(d *= 3);
// console.log(d /= 3);
// console.log(d %= 3);


// 3. 비교 연산자

// console.log(2 == 2);
// console.log(2 == "2");
// console.log(2 === "2");

// console.log(2 != 2);
// console.log(2 != "2");
// console.log(2 !== "2");


// console.log(4 > 2);
// console.log(4 < 2);
// console.log(4 >= 2);
// console.log(4 <= 2);


// 4. 논리 연산자

// 논리합(or)
// 피연산자 중에 하나라도 참이면 참
// console.log(true || true);
// console.log(true || false || false);
// console.log(false || false);
// console.log(2 > 3 || 5 == 5);

// // 논리곱(and)
// // 피연산자 모두가 참이어야 참
// // console.log(true && true);
// // console.log(true && false && false);
// // console.log(false && false);
// console.log(2 > 3 && 5 == 5);
// console.log(2 < 3 && 5 == 5);

// 부정(not)
// 피연산자의 boolean 값을 부정
// console.log(!true);
// console.log(!false);
// console.log(!(5>4));



// 5. typeof 연산자
console.log(typeof 1);
console.log(typeof "1");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof Symbol());
console.log(typeof null);