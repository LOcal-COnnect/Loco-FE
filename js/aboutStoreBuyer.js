var userIdx = 1

// 가게 대표사진
window.addEventListener('load', function () {
    const storePhotoElement = document.querySelector('#storePhoto img')
    const imageUrl = 'http://example.com/path/to/storePhotoImage.jpg'

    fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob)
            storePhotoElement.src = url
        })
        .catch((error) => {
            console.error('Failed to fetch the image:', error)
        })
})

// 가게 소개 박스
const introBox = document.querySelector('.introBox')
const introScript = document.querySelector('.introScript')

function adjustIntroBoxHeight() {
    const lineHeight = parseInt(window.getComputedStyle(introScript).lineHeight)
    const numLines = Math.ceil(introScript.clientHeight / lineHeight)

    if (numLines > 5) {
        introBox.style.height = `${lineHeight * 5}px`
    }
}

window.addEventListener('load', adjustIntroBoxHeight)
window.addEventListener('resize', adjustIntroBoxHeight)

// 가게 사진 하단 찜하기
const image = document.getElementById('heartnum')
let isFullHeart = false

var imgElement = document.getElementById('heartnum')

image.addEventListener('click', () => {
    if (isFullHeart) {
        image.classList.remove('active')
        imgElement.src = 'svg/icon _heart_.svg'
    } else {
        image.classList.add('active')
        imgElement.src = 'svg/icon _heart outline_.svg'
    }
    isFullHeart = !isFullHeart

    $.ajax({
        url: host + `/mine/${useridx}/store/${window.postId}`,
        method: 'GET',
        success: function (data) {
            // 서버에서 받아온 좋아요 여부 값으로 isFullHeart 업데이트
            isFullHeart = data.isFullHeart
        },
        error: function () {
            // 에러 처리
            console.error('찜하기 여부를 불러오는 데 실패했습니다.')
        },
    })
})

// // 가게 사진 하단 찜하기
// window.addEventListener('load', function () {
//     const heartOutIcon = document.querySelector('.heartOut img')

//     const fullHeart = 'svg/icon _heart_.svg'
//     const originHeart = 'svg/icon _heart outline_.svg'

//     let isFullHeart = false

//     heartOutIcon.addEventListener('click', function () {
//         if (isFullHeart) {
//             heartOutIcon.src = originHeart
//             heartOutIcon.alt = 'Heart Outline Image'
//         } else {
//             heartOutIcon.src = fullHeart
//             heartOutIcon.alt = 'Heart Image'
//         }

//         isFullHeart = !isFullHeart
//     })

//     $.ajax({
//         url: host + `/mine/${useridx}/store/${storeIdx}` + window.postId,
//         method: 'GET',
//         success: function (data) {
//             // 서버에서 받아온 찜하기 여부 값으로 isFullHeart 업데이트
//             isFullHeart = data.isFullHeart;
//             //True,False값
//         },
//         error: function () {
//             // 에러 처리
//             console.error('찜하기 여부를 불러오는 데 실패했습니다.');
//         },
//     });
// })

$('#Heartnum').click(function () {
    const heartCountElement = $('#HeartCount')

    // 찜하기 여부 서버 요청 (GET 요청 등)
    $.ajax({
        url: host + `/mine/${userIdx}/store/${window.postId}`,
        method: 'GET',
        success: function (data) {
            isFullHeart = data.isFullHeart // 서버에서 받아온 찜하기 여부 값으로 업데이트

            if (!isFullHeart) {
                $.ajax({
                    url:
                        host +
                        '/mine/{userIdx}/store/{storeIdx}' +
                        window.postId,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postid: 1, // 게시물 ID
                        haartnum: $('#Heartnum').val(),
                    }),
                    success: function (data) {
                        $.ajax({
                            url: host + `/mine/store/${window.postId}`,
                            method: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                postid: 1, // 게시물 ID
                                heartnum: $('#heartnum').val(),
                            }),
                            success: function (data) {
                                heartCountElement.text(data.heartCount) // 서버에서 받은 찜하기 수로 화면 업데이트
                            },
                            error: function () {
                                alert('찜하기 수를 받아오지 않았습니다.')
                            },
                        })
                    },
                    error: function () {
                        alert('찜하기가 입력되지 않았습니다.')
                    },
                })
            } else {
                $.ajax({
                    url: host + `/mine/${userIdx}/store/${window.postId}`,
                    method: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postid: 1, // 게시물 ID
                        goodnum: $('#Heartnum').val(),
                    }),
                    success: function (data) {
                        $.ajax({
                            url: host + `/mine/store/${window.postId}`,
                            method: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                postid: 1, // 게시물 ID
                                heartnum: $('#heartnum').val(),
                            }),
                            success: function (data) {
                                heartCountElement.text(data.heartCount) // 서버에서 받은 찜하기 수로 화면 업데이트
                            },
                            error: function () {
                                alert('찜하기 수를 받아오지 않았습니다.')
                            },
                        })
                    },
                    error: function () {
                        alert('찜하기 삭제에 실패했습니다.')
                    },
                })
            }
        },
        error: function () {
            console.error('찜하기 여부를 불러오는 데 실패했습니다.')
        },
    })
})

// 해시태그 길이 조정
const hashtagBox = document.querySelector('.HashtagBox h3')

function adjustHashtagBoxSize() {
    const hashtagWidth = hashtagBox.clientWidth + 14

    document.querySelector('.HashtagBox').style.width = `${hashtagWidth}px`
}

window.addEventListener('load', adjustHashtagBoxSize)
window.addEventListener('resize', adjustHashtagBoxSize)

// 메뉴 입력
function addMenu(name, price, imageUrl) {
    const menuShow = document.querySelector('.menuShow')

    const menuBox = document.createElement('div')
    menuBox.classList.add('menuBox')

    const menuImage = document.createElement('img')
    menuImage.src = imageUrl
    menuImage.alt = name + ' Image'

    const menuName = document.createElement('h3')
    menuName.textContent = name

    const menuPrice = document.createElement('h3')
    menuPrice.textContent = price + '원'

    menuBox.appendChild(menuImage)
    menuBox.appendChild(menuName)
    menuBox.appendChild(menuPrice)

    menuShow.appendChild(menuBox)
}

addMenu('황남빵', '5,000', 'svg/menuBread.svg')
addMenu('딸기잼빵', '4,500', 'svg/menuBread.svg')
addMenu('피자빵', '3,000', 'svg/menuBread.svg')
addMenu('치즈빵', '3,500', 'svg/menuBread.svg')
addMenu('마늘빵', '4,000', 'svg/menuBread.svg')
addMenu('초코빵', '3,200', 'svg/menuBread.svg')
addMenu('녹차빵', '3,800', 'svg/menuBread.svg')
addMenu('피칸빵', '4,500', 'svg/menuBread.svg')

// 리뷰 확인
const reviews = [
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User4',
        rating: 5,
        date: '2023.07.15',
        comment: '맛있다 \n A+',
    },
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User3',
        rating: 3,
        date: '2023.07.15',
        comment: '그냥그랬다 \n B+',
    },
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User2',
        rating: 1,
        date: '2023.07.15',
        comment: '별로다 \n C+',
    },
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User1',
        rating: 5,
        date: '2023.07.15',
        comment: '맛있다 \n A+',
    },
]

function generateStarRating(rating) {
    const fullStarIcon = 'svg/icon _star_.svg'

    const starRatingContainer = document.createElement('div')
    starRatingContainer.classList.add('star-rating')

    const fullStars = Math.floor(rating)

    for (let i = 0; i < 5; i++) {
        const starImage = document.createElement('img')
        starImage.src = i < fullStars ? fullStarIcon : ''
        starImage.alt = ''

        if (i < fullStars) {
            starImage.classList.add('filled')
        } else {
            starImage.classList.add('empty')
        }

        starRatingContainer.appendChild(starImage)
    }

    return starRatingContainer
}

function addReview(review) {
    const reviewBox = document.querySelector('.review-box')

    const reviewElement = document.createElement('div')
    reviewElement.classList.add('review')

    const profilePicture = document.createElement('img')
    profilePicture.src = review.profilePictureUrl
    profilePicture.alt = 'Profile Picture'
    profilePicture.classList.add('profile-picture')

    const nicknameElement = document.createElement('h3')
    nicknameElement.textContent = review.nickname
    nicknameElement.classList.add('nickname')

    const ratingElement = generateStarRating(review.rating)
    ratingElement.classList.add('star-rating')

    const commentElement = document.createElement('p')
    commentElement.textContent = review.comment
    commentElement.innerHTML = review.comment.replace(/\n/g, '<br>')
    commentElement.classList.add('comment')

    const dateElement = document.createElement('span')
    dateElement.textContent = review.date
    dateElement.classList.add('date')

    reviewElement.appendChild(profilePicture)
    reviewElement.appendChild(nicknameElement)
    reviewElement.appendChild(ratingElement)
    reviewElement.appendChild(commentElement)
    reviewElement.appendChild(dateElement)

    reviewBox.appendChild(reviewElement)
}

for (let i = reviews.length - 1; i >= Math.max(reviews.length - 3, 0); i--) {
    addReview(reviews[i])
}

// 더보기 이동
function moveToB() {
    window.location.href = 'aboutStoreMore.html' // b.html로 이동
}

document.getElementById('MoreButton').addEventListener('click', moveToB)

// 리뷰 미리 보기 ajax
const storeIdx = 1

var token = localStorage.getItem('token')
function fetchReviews(storeIdx) {
    $.ajax({
        url: `/reviews/stores/${storeIdx}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
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
}

// 리뷰 목록 표시 함수
function displayReviews(reviews) {
    const reviewBox = document.querySelector('.review-box')

    reviews.forEach((review) => {
        const reviewElement = document.createElement('div')
        reviewElement.classList.add('review')

        const profilePicture = document.createElement('img')
        profilePicture.src = review.profilePictureUrl
        profilePicture.alt = 'Profile Picture'
        profilePicture.classList.add('profile-picture')

        const nicknameElement = document.createElement('h3')
        nicknameElement.textContent = review.nickname
        nicknameElement.classList.add('nickname')

        const ratingElement = generateStarRating(review.rating)
        ratingElement.classList.add('star-rating')

        const commentElement = document.createElement('p')
        commentElement.innerHTML = review.comment.replace(/\n/g, '<br>')
        commentElement.classList.add('comment')

        const dateElement = document.createElement('span')
        dateElement.textContent = review.date
        dateElement.classList.add('date')

        console.log(reviewElement)
        console.log(profilePicture)
        console.log(nicknameElement)
        console.log(ratingElement)

        reviewElement.appendChild(profilePicture)
        reviewElement.appendChild(nicknameElement)
        reviewElement.appendChild(ratingElement)
        reviewElement.appendChild(commentElement)
        reviewElement.appendChild(dateElement)

        reviewBox.appendChild(reviewElement)
    })
}

// 초기화 함수
function initialize() {
    fetchReviews(storeIdx)
}

// 페이지 로드 시 초기화 함수 실행
window.addEventListener('load', initialize)
