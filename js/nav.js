// nav.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            // 내비게이션 바가 로드된 후에 이벤트를 설정합니다.
            setupNavigationEvents();
        })
        .catch(error => {
            console.error('Error fetching navbar:', error);
        });
});

window.addEventListener('load', createNavbar);

//
// function search() {
//     var searchText = document.getElementById("searchInput").value;
//     // 여기에 검색 기능을 구현하는 코드를 작성합니다.
//     // 검색할 단어(searchText)를 활용하여 검색 동작을 수행합니다.
//     // 예를 들어, 검색 결과를 보여주거나 검색 페이지로 이동하는 등의 동작을 수행할 수 있습니다.
//     // 이 예제에서는 검색어를 콘솔에 출력하는 것으로 대체합니다.
//     console.log("검색어: " + searchText);
// }
//
//
//
// var homeBtn = document.getElementById('homeButton');
// var loginBtn = document.getElementById('loginButton');
// var registerBtn = document.getElementById('registerButton');
//
// homeBtn.addEventListener('click', function () {
//     window.location.href = 'mainpage.html';
// });
//
// loginBtn.addEventListener('click', function () {
//     window.location.href = '../login.html';
// });
//
// registerBtn.addEventListener('click', function () {
//     window.location.href = '../register.html';
// });
//
// // 카테고리 버튼에 대한 참조를 저장합니다.
// var categoryBtn = document.getElementById('categoryButton');
//
// // 숨겨진 카테고리 요소에 대한 참조를 저장합니다.
// var hiddenCategory = document.getElementById("hiddenCategory");
//
// // 숨겨진 카테고리를 보여주는 함수를 정의합니다.
// function toggleHiddenCategory() {
//     if (hiddenCategory.style.display === "none") {
//         hiddenCategory.style.display = "block";
//     } else {
//         hiddenCategory.style.display = "none";
//     }
// }
//
// // 초기에 카테고리 버튼에 이벤트 리스너를 추가합니다.
// categoryBtn.addEventListener("click", toggleHiddenCategory);
//
// // mypageButton 요소 가져오기
// const mypageButton = document.getElementById('mypageButton');
//
// // mypageButton에 클릭 이벤트 리스너 추가하기
// mypageButton.addEventListener('click', function () {
//      // 사용자가 로그인되었는지 확인합니다. (사용자가 로그인되었다면 여기서 직접 구현할 수 있습니다)
//     const isLoggedIn = false; // 사용자가 로그인되었을 경우 true로 변경합니다.
//
//     // 사용자가 로그인되지 않았다면 login.html 페이지로 이동합니다.
//     if (!isLoggedIn) {
//         window.location.href = '../login.html';
//     } else {
//         // 사용자가 로그인되었으면, 카테고리 버튼의 이벤트 리스너를 제거합니다.
//         categoryBtn.removeEventListener("click", toggleHiddenCategory);
//     }
// });


// 음식 1//
var smallfood1Btn = document.getElementById('smallfood1Button');
smallfood1Btn.addEventListener('click', function () {
    window.location.href = 'smallfood1Btn.html';
});
// 음식 2//
var smallfood2Btn = document.getElementById('smallfood2Button');
smallfood2Btn.addEventListener('click', function () {
    window.location.href = 'smallfood2Btn.html';
});
// 음식 3//
var smallfood3Btn = document.getElementById('smallfood3Button');
smallfood3Btn.addEventListener('click', function () {
    window.location.href = 'smallfood3Btn.html';
})
// 음식 4//
var smallfood4Btn = document.getElementById('smallfood4Button');
smallfood4Btn.addEventListener('click', function () {
    window.location.href = 'smallfood4Btn.html';
})
// 음식 5//
var smallfood5Btn = document.getElementById('smallfood5Button');
smallfood5Btn.addEventListener('click', function () {
    window.location.href = 'smallfood5Btn.html';
})
// 음식 6//
var smallfood6Btn = document.getElementById('smallfood6Button');
smallfood6Btn.addEventListener('click', function () {
    window.location.href = 'smallfood6Btn.html';
})
// 음식 7//
var smallfood7Btn = document.getElementById('smallfood7Button');
smallfood7Btn.addEventListener('click', function () {
    window.location.href = 'smallfood7Btn.html';
})
// 음식 8//
var smallfood8Btn = document.getElementById('smallfood8Button');
smallfood8Btn.addEventListener('click', function () {
    window.location.href = 'smallfood8Btn.html';
})
// 음식 9//
var smallfood9Btn = document.getElementById('smallfood9Button');
smallfood9Btn.addEventListener('click', function () {
    window.location.href = 'smallfood9Btn.html';
})
// 음식 10//
var smallfood10Btn = document.getElementById('smallfood10Button');
smallfood10Btn.addEventListener('click', function () {
    window.location.href = 'smallfood10Btn.html';
})

// 비음식 1//
var smallnonfood1Btn = document.getElementById('smallnonfood1Button');
smallnonfood1Btn.addEventListener('click', function () {
    window.location.href = 'smallnonfood1Btn.html';
})
// 비음식 2//
var smallnonfood2Btn = document.getElementById('smallnonfood2Button');
smallnonfood2Btn.addEventListener('click', function () {
    window.location.href = 'smallnonfood2Btn.html';
})
// 비음식 3//
var smallnonfood3Btn = document.getElementById('smallnonfood3Button');
smallnonfood3Btn.addEventListener('click', function () {
    window.location.href = 'smallnonfood3Btn.html';
})
// 비음식 4//
var smallnonfood4Btn = document.getElementById('smallnonfood4Button');
smallnonfood4Btn.addEventListener('click', function () {
    window.location.href = 'smallnonfood4Btn.html';
})
// 비음식 5//
var smallnonfood5Btn = document.getElementById('smallnonfood5Button');
smallnonfood5Btn.addEventListener('click', function () {
    window.location.href = 'smallnonfood5Btn.html';
})
// 비음식 6//
var smallnonfood6Btn = document.getElementById('smallnonfood6Button');
smallnonfood6Btn.addEventListener('click', function () {
    window.location.href = 'smallnonfood6Btn.html';
})




