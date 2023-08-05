var loginBt = document.getElementById('loginButton');
var registerBt = document.getElementById('registerButton')


loginBt.addEventListener('click', function () {
    window.open('login.html', '_blank', 'width=500,height=400');
});
  
registerBt.addEventListener('click', function () {
    window.open('register.html', '_blank', 'width=500,height=400');
});
  

var categoryBtn = document.getElementById('categoryBtn');
// 네비게이션바 안의 버튼을 누를 때 숨겨진 카테고리를 보여주는 함수
categoryBtn.addEventListener("click", function() {
    var hiddenCategory = document.getElementById("hiddenCategory");
    if (hiddenCategory.style.display === "none") {
        hiddenCategory.style.display = "block";
    } else {
        hiddenCategory.style.display = "none";
    }
});
