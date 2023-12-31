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

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(name)
}

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

// 리뷰 삭제 ajax
var token = localStorage.getItem('token')
function deleteReview(reviewIdx) {
    $.ajax({
        url: `/reviews/${reviewIdx}`,
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
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

// 리뷰 목록 조회 ajax
var token = localStorage.getItem('token')
function fetchAndDisplayReviews() {
    $.ajax({
        url: `/reviews/users/${userIdx}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        success: function (response) {
            if (response && response.length > 0) {
                const reviewListWrap = $('.reviewListWrap')

                response.forEach((review) => {
                    const reviewCard = $('<div class="noReviewCard"></div>')
                    const reviewCardTop = $('<div class="reviewCardTop"></div>')

                    const reviewStoreName = $(
                        '<div class="reviewStoreName"></div>'
                    )
                    reviewStoreName.append(
                        `<h3>${review.storeName}</h3><img src="img/titleMore.svg" />`
                    )

                    const reviewPhotoNReview = $(
                        '<div class="reviewPhotoNReview"></div>'
                    )
                    const reviewStarWrap = $(
                        '<div class="reviewStarWrap"></div>'
                    )
                    const reviewStar = $('<div class="reviewStar"></div>')

                    for (let i = 0; i < 5; i++) {
                        const starImg = $('<img />')
                        if (i < review.review.reviewStar) {
                            starImg.attr('src', 'img/yesStar.svg')
                        } else {
                            starImg.attr('src', 'img/notStar.svg')
                        }
                        reviewStar.append(starImg)
                    }

                    const reviewStarDate = $(
                        '<div class="reviewStarDate"></div>'
                    )
                    reviewStarDate.text(
                        review.review.createdAt.substring(0, 10)
                    )

                    const reviewContent = $('<div class="reviewContent"></div>')
                    reviewContent.text(review.review.reviewContent)

                    const buttonReview = $('<div class="buttonReview"></div>')
                    const modifyButton = $(
                        `<button class="modifyBt" onclick="window.location.href='makeReviewmodify.html'">수정하기</button>`
                    )
                    const deleteButton = $(
                        '<button class="deleteBt">삭제하기</button>'
                    )

                    // 리뷰 카드에 요소 추가
                    reviewStarWrap.append(reviewStar)
                    reviewPhotoNReview.append(reviewStarWrap)
                    reviewPhotoNReview.append(reviewContent)
                    buttonReview.append(modifyButton)
                    buttonReview.append(deleteButton)

                    reviewCardTop.append(reviewStoreName)
                    reviewCardTop.append(reviewPhotoNReview)
                    reviewCardTop.append(buttonReview)

                    reviewCard.append(reviewCardTop)
                    reviewListWrap.append(reviewCard)
                })
            } else {
                console.log('리뷰 목록이 없습니다.')
            }
        },
        error: function (xhr, status, error) {
            console.log('리뷰 목록을 가져오는 중에 오류가 발생했습니다:', error)
        },
    })
}

$(document).ready(function () {
    fetchAndDisplayReviews()
})

/*
// 더미 데이터로 확인
function fetchAndDisplayReviews() {
    const dummyReviews = [
        {
            storeIdx: 1,
            storeName: '강남구고기짱',
            reviewer: 'asd',
            review: {
                createdAt: '2023-08-17T01:30:45.856244',
                updatedAt: null,
                reviewIdx: 3,
                reviewContent: '별로',
                reviewStar: 1,
            },
        },
    ]

    const reviewListWrap = $('.reviewListWrap')

    dummyReviews.forEach((review) => {
        const reviewCard = $('<div class="noReviewCard"></div>')
        const reviewCardTop = $('<div class="reviewCardTop"></div>')

        const reviewStoreName = $('<div class="reviewStoreName"></div>')
        reviewStoreName.append(
            `<h3>${review.storeName}</h3><img src="img/titleMore.svg" />`
        )

        const reviewPhotoNReview = $('<div class="reviewPhotoNReview"></div>')
        const reviewStarWrap = $('<div class="reviewStarWrap"></div>')
        const reviewStar = $('<div class="reviewStar"></div>')

        for (let i = 0; i < 5; i++) {
            const starImg = $('<img />')
            if (i < review.review.reviewStar) {
                starImg.attr('src', 'img/yesStar.svg')
            } else {
                starImg.attr('src', 'img/notStar.svg')
            }
            reviewStar.append(starImg)
        }

        const reviewStarDate = $('<div class="reviewStarDate"></div>')
        reviewStarDate.text(review.review.createdAt.substring(0, 10))

        const reviewContent = $('<div class="reviewContent"></div>')
        reviewContent.text(review.review.reviewContent)

        const buttonReview = $('<div class="buttonReview"></div>')
        const modifyButton = $(
            `<button class="modifyBt" onclick="window.location.href='makeReviewmodify.html'">수정하기</button>`
        )
        const deleteButton = $('<button class="deleteBt">삭제하기</button>')

        reviewStarWrap.append(reviewStar)
        reviewPhotoNReview.append(reviewStarWrap)
        reviewPhotoNReview.append(reviewContent)
        buttonReview.append(modifyButton)
        buttonReview.append(deleteButton)

        reviewCardTop.append(reviewStoreName)
        reviewCardTop.append(reviewPhotoNReview)
        reviewCardTop.append(buttonReview)

        reviewCard.append(reviewCardTop)
        reviewListWrap.append(reviewCard)
    })
}

$(document).ready(function () {
    fetchAndDisplayReviews()
})
*/
