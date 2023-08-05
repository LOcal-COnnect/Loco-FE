/**
 * 객체(Object)
 * - 속성의 모음으로 이루어진 데이터
 * - 속성에는 어던 데이터 타입이라도 할당 가능
 * - 속성의 구분 ,
 * - 속성의 정의 속성명(키):속성값
 */

var student ={
    grade: 1,
    school : "lion school"
};

//객체의 값 호출
var gradeInfo = student.grade;
console.log(gradeInfo);

// 객체의 키 호출
var key = Object.keys(student)[0];
console.log(key);

// 객체에 속성 추가
student.class = 3;
console.log(student);

console.log(student['class']);
console.log(student.class);


//비어 있는 객체
var teacher = new Object();
var teacher ={

};