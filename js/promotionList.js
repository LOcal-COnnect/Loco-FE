const sortButtons = Array.from(document.querySelectorAll('.sortButton'));

sortButtons.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick);
});

function handleSortButtonClick(event) {
    const clickedButton = event.target;

    sortButtons.forEach((button) => {
        button.classList.remove('active');
        if (button === clickedButton) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    if (clickedButton.id === 'recentSort') {
        // 최신순 api
    } else if (clickedButton.id === 'likeSort') {
        // 좋아요순 api
    } else if (clickedButton.id === 'viewSort') {
        // 조회수순 api
    }
}

function searchAddress(){
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
                localStorage.setItem('selectedCity', addr);
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
                localStorage.setItem('selectedCity', addr);
            }
            showNearPlace();
        }
    }).open();
}

function moveDetail(num){
    localStorage.setItem('postNum', num);
    window.location.href = 'promotionDetail.html';
}

function showNearPlace(){
    var city = localStorage.getItem('selectedCity');
    var promotionBtWrap = document.getElementsByClassName('promotionFilterBtWrap')[0];
    var selectedCityBt = document.getElementsByClassName('selectedCityBt')[0];

    if (city) {
        selectedCityBt.innerText = '선택 지역: ' + city;
        selectedCityBt.style.display = 'block';
        promotionBtWrap.style.display = 'none';
    } else {
        selectedCityBt.style.display = 'none';
        promotionBtWrap.style.display = 'block';
    }
}