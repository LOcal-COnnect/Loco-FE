const tabList = Array.from(document.querySelectorAll('.tab'))

tabList.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick)
})

function handleSortButtonClick(event) {
    const clickedTab = event.target

    tabList.forEach((button) => {
        button.classList.remove('active')
        if (button === clickedTab) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })

    var tab1 = document.getElementsByClassName('tab1')[0]
    var tab2 = document.getElementsByClassName('tab2')[0]
    var tab3 = document.getElementsByClassName('tab3')[0]
    if (clickedTab.id === 'tab1') {
        tab1.style.display = 'block'
        tab2.style.display = 'none'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab2') {
        tab1.style.display = 'none'
        tab2.style.display = 'block'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab3') {
        tab1.style.display = 'none'
        tab2.style.display = 'none'
        tab3.style.display = 'block'
    }
}

//리뷰수정완료 누르면 바로 tab3으로 이동하기 위한 함수
function activateTab(tabId) {
    const tabToActivate = document.getElementById(tabId)
    if (tabToActivate) {
        handleSortButtonClick({ target: tabToActivate })
    }
}

// URL에서 쿼리 파라미터 추출하는 함수
function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(name)
}

// 페이지가 로드될 때 실행되는 이벤트 리스너
window.addEventListener('load', function () {
    const sourcePage = getQueryParam('source')

    if (sourcePage === 'completeCreateReview') {
        handleSortButtonClick(tab3)
    }
})

// 페이지 이동 (수정 완료 버튼)
function completeCreateReview() {
    window.location.href = 'makeReivewmodify.html' // 리뷰수정.html로 이동
}
/*
document
    .getElementById('moveEditMyBt')
    .addEventListener('click', completeCreatePromotion)
*/

// 리뷰 삭제 버튼
function deleteReview() {
    window.location.href = 'userMypage.html' // mypage.html로 이동
}

//

// 내 정보 수정하기
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            tab1.classList.add('active')

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const text = item.textContent

                const input = document.createElement('input')
                input.type = 'text'
                input.value = text

                item.innerHTML = ''
                item.append(img)
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            editing = true
        } else {
            tab1.classList.add('active')

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                item.innerHTML = ''
                item.append(img)
                item.appendChild(document.createTextNode(text))
            })

            moveEditMyBt.textContent = '내 정보 수정하기'
            editing = false
        }
    })
})
/*
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt');
    const tab1 = document.querySelector('#tab1');
    const myInfo = document.querySelector('.myInfo');
    const infoItems = myInfo.querySelectorAll('div');
    let editing = false;

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            tab1.classList.add('active');

            infoItems.forEach((item) => {
                const text = item.textContent.trim();
                const input = document.createElement('input');
                input.type = 'text';
                input.value = text;
                item.innerHTML = '';
                item.appendChild(input);
            });

            moveEditMyBt.textContent = '수정 완료';
            editing = true;
        } else {
            infoItems.forEach((item) => {
                const input = item.querySelector('input');
                const text = input.value;
                const newText = document.createElement('div');
                newText.textContent = text;
                item.innerHTML = '';
                item.appendChild(newText);
            });

            moveEditMyBt.textContent = '내 정보 수정하기';
            editing = false;
        }
    });
});
*/

// 리뷰 목록 ajax
window.addEventListener('load', function () {
    $.ajax({
        url: `/reviews/users/{userIdx}`,
        type: 'GET',
        success: function (response) {
            if (response.code === 200) {
                const reviews = response.data
                displayReviews(reviews)
            } else {
                console.error('리뷰 목록 가져오기 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('리뷰 목록 가져오기 오류:', error)
        },
    })
})

function displayReviews(reviews) {
    const reviewListWrap = document.querySelector('.reviewListWrap')

    reviews.forEach((review) => {
        const reviewCard = document.createElement('div')
        reviewCard.classList.add('yesReviewCard')

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('deleteBt')
        const deleteLink = document.createElement('a')
        deleteLink.href = '#'
        deleteLink.classList.add('delete')
        deleteLink.innerHTML = '<h2>삭제하기</h2>'
        deleteLink.addEventListener('click', function () {
            deleteReview(review.id)
        })
        deleteButton.appendChild(deleteLink)

        reviewCard.querySelector('.buttonReview').appendChild(deleteButton)

        reviewListWrap.appendChild(reviewCard)
    })
}

// 리뷰 삭제 ajax
function deleteReview(reviewIdx) {
    $.ajax({
        url: `/reviews/${reviewIdx}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                console.log('리뷰 삭제 성공:', response.message)
            } else {
                console.error('리뷰 삭제 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('리뷰 삭제 오류:', error)
        },
    })
}

document.querySelectorAll('.deleteBt').forEach(function (button) {
    button.addEventListener('click', function () {
        const reviewIdx = 123
        deleteReview(reviewIdx)
    })
})
