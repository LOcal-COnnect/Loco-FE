// // function Callback(callback) {
// //     console.log('callback function');
// //     callback();
// // }
// // Callback(function(){
// //     console.group('callback 호출');
// // })
// // function work() {
// //     setTimeout( handler: () => {
// //         const start = Date.now();
// //         for (let i = 0; i <100000; i==){}
// //         const end = Date.now();
// //         console.log(end = start + 'ms');
// //     })
// // }

// // console.log('작업 시작');
// // work();
// // console.log('작업 끝');

// function goToschool() {
//     console.log("학교에 갑니다.");
// }

// function study() {
//     console.log("공부를 합니다.");
// }

// function arriveAtSchool() {
//     return new Promise( excutor: function(resolve){
//         setTimeout( handler: function(){
//             console.log("학교 도착.");
//             resolve();
//         }, tiemout: 1000);
//     })
// }

// goToschool();
// arriveAtSchool().then(function(){
//     study();
// });

function fetchItems() {
    return new Promise( excutoor: function(resolve, reject){
        var items =[1,2,3];
        resolve(items);
    });
}

async function logItems() {
    var resultItems = await fetchItems();
    console.log(resultItems);
}

logItems();