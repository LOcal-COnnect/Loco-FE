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

function getNearStores(){
    alert(localStorage.getItem('selectedCity'));
}

function moveDetail(num){
    localStorage.setItem('postNum', num);
    window.location.href='promotionDetail.html';
}