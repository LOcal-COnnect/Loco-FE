function searchAddress() {
    const postcodeInstance = new daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            localStorage.setItem('selectedCity', addr);

            // 팝업 닫기
            self.close();
            getNearStores();
        }
    }).open();
}


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

function getNearStores() {
    alert(localStorage.getItem('selectedCity'));
    // 다른 작업을 수행하고자 한다면 이곳에 코드 추가
}
