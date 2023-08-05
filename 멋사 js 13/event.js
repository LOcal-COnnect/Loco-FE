//<h1 id="brand-title" onclick="alert('click!);">
//</h1>
/**
 * 이벤트(event)
 * 
 * 
 * 폼 이벤트
 * -제출, 초기화
 * 마우스 이벤트
 * -클릭, 더블클릭, 마우스이동
 * 키보드 이벤트
 * - keydown, keypress, keyup
 * 
 * on + 이벤트 타입
 * 
 */


var el = document.getElementById('brand-title');

var myfunc = function () {
    alert('addEventListener');
};

el.addEventListener("click",myfunc);