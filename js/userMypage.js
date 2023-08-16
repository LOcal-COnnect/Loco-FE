const tabList = Array.from(document.querySelectorAll('.tab'))
const userIdx = 1
const newInfoArray = []

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

function searchAddress() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = '' // 주소 변수
            var extraAddr = '' // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress
                localStorage.setItem('selectedCity', addr)
                document.getElementById('roadAddress').value = addr
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress
                localStorage.setItem('selectedCity', addr)
                document.getElementById('roadAddress').value = addr
            }
        },
    }).open()
}

// 내 정보를 수정할 수 있는 input으로 변경
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false
    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            tab1.classList.add('active')

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item, index) => {
                const img = item.querySelector('img')
                const text = item.textContent.trim()
                const input = document.createElement('input')
                input.type = 'text'
                input.value = text

                if (index === 0) {
                    input.id = 'roadAddress'
                    input.setAttribute('readonly', 'true')
                    input.setAttribute('onclick', 'searchAddress()')
                }
                item.innerHTML = ''
                item.append(img)
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            editing = true
        } else {
            tab1.classList.add('active')

            let infoItems = myInfo.querySelectorAll('div')
            infoItems = [...infoItems]
            infoItems.forEach((item, index, originArr) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                newInfoArray.push(input.value)
                item.innerHTML = ''
                item.append(img)
                item.appendChild(document.createTextNode(text))
            })

            editMyInfo()
            moveEditMyBt.textContent = '내 정보 수정하기'
            moveEditMyBt.removeAttribute('onClick')
            editing = false
            console.log(newInfoArray)
        }
    })
})

function editMyInfo() {
    $.ajax({
        url: host + '/users/' + userIdx,
        method: 'PATCH',
        data: JSON.stringify({
            userId: newInfoArray[3],
            userName: newInfoArray[2],
            userPassword: newInfoArray[4],
            userEmail: newInfoArray[5],
            userPhone: newInfoArray[6],
            userAddress: newInfoArray[0],
            userDetailAddress: newInfoArray[1],
        }),
        success: function () {
            alert('수정되었습니다.')
        },
        error: function () {
            console.log('수정 실패')
        },
    })
}

/*
// 리뷰 목록 ajax
window.addEventListener('load', function () {
    $.ajax({
        url: `/reviews/users/${userIdx}`,
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
            console.log('리뷰 목록 가져오기 오류:', error)
        },
    })
})

function displayReviews(reviews) {
    const length = reviews.reviewList.length;
    const reviewListWrap = document.querySelector('.reviewListWrap')

    for(var i = 0; i < length; i++){
        var reviewCard = document.createElement('div');
        reviewCard.className = 'noReviewCard'
        reviewCard.innerHTML = `
                <div class="reviewCardTop">
                    <div class="reviewStoreName">
                        <h3>김치천국</h3>
                        <img src="img/titleMore.svg" />
                    </div>
                    <div class="reviewPhotoNReview">
                        <div class="reviewStarWrap">
                            <div class="reviewStar">
                                <img src="img/notStar.svg" />
                                <img src="img/yesStar.svg" />
                                <img src="img/yesStar.svg" />
                                <img src="img/yesStar.svg" />
                                <img src="img/yesStar.svg" />
                            </div>
                            <div class="reviewStarDate">${reviews.reviewList[i].createdAt.substring(0,10)}</div>
                        </div>
                        <div class="reviewContent">
                            ${reviews.reviewList[i].reviewContent}
                        </div>
                    </div>
                    <div class="buttonReview">
                        <button class="modifyBt" onClick="window.location.href='makeReviewmodify.html'">수정하기</button>
                        <button class="deleteBt" onClick="deleteReview(${reviews.reviewList[i].reviewIdx});">삭제하기</button>
                    </div>
                </div>
        `
        reviewListWrap.appendChild(reviewCard)
    }
}
*/

// 리뷰 삭제 ajax
function deleteReview(reviewIdx) {
    $.ajax({
        url: `/reviews/${reviewIdx}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                alert('리뷰가 삭제되었습니다.')
                console.log('리뷰 삭제 성공:', response.message)
                window.reload()
            } else {
                console.error('리뷰 삭제 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.log('리뷰 삭제 오류:', error)
        },
    })
}

function handleImageSelection(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            const pictureWrap = event.target.parentElement.parentElement // .pictureInputWrap
            pictureWrap.style.backgroundImage = `url(${imgDataUrl})`
            pictureWrap.textContent = ''
        }

        reader.readAsDataURL(selectedFile)
    }
}
