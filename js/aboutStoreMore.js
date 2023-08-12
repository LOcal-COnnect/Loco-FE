/*
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
*/

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
window.addEventListener('load', function () {
    const heartOutIcon = document.querySelector('.heartOut img')

    const fullHeart = '../svg/🦆 icon _heart_.svg'
    const originHeart = '../svg/🦆 icon _heart outline_.svg'

    let isFullHeart = false

    heartOutIcon.addEventListener('click', function () {
        if (isFullHeart) {
            heartOutIcon.src = originHeart
            heartOutIcon.alt = 'Heart Outline Image'
        } else {
            heartOutIcon.src = fullHeart
            heartOutIcon.alt = 'Heart Image'
        }

        isFullHeart = !isFullHeart
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

// 리뷰 확인
const reviews = [
    {
        profilePictureUrl: '../svg/profile.svg',
        nickname: 'User4',
        rating: 5,
        date: '2023.07.15',
        comment: '맛있다 \n A+',
        photo: '../svg/storePhoto.svg',
    },
    {
        profilePictureUrl: '../svg/profile.svg',
        nickname: 'User3',
        rating: 3,
        date: '2023.07.15',
        comment: '그냥그랬다 \n B+',
        photo: '../svg/storePhoto.svg',
    },
    {
        profilePictureUrl: '../svg/profile.svg',
        nickname: 'User2',
        rating: 1,
        date: '2023.07.15',
        comment: '별로다 \n C+',
        photo: '../svg/storePhoto.svg',
    },
    {
        profilePictureUrl: '../svg/profile.svg',
        nickname: 'User1',
        rating: 5,
        date: '2023.07.15',
        comment: '맛있다 \n A+',
        photo: '../svg/storePhoto.svg',
    },
]

function generateStarRating(rating) {
    const fullStarIcon = '../svg/🦆 icon _star_.svg'

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

    const photoElement = document.createElement('img')
    photoElement.src = review.photo
    photoElement.alt = 'Review Photo'
    photoElement.classList.add('photo')

    reviewElement.appendChild(profilePicture)
    reviewElement.appendChild(nicknameElement)
    reviewElement.appendChild(ratingElement)
    reviewElement.appendChild(commentElement)
    reviewElement.appendChild(dateElement)
    reviewElement.appendChild(photoElement)

    reviewBox.appendChild(reviewElement)
}

for (let i = reviews.length - 1; i >= Math.max(reviews.length - 3, 0); i--) {
    addReview(reviews[i])
}

// 게시판 페이지 번호
window.addEventListener('DOMContentLoaded', (event) => {
    const buttonContainer = document.getElementById('buttonContainer')

    const buttonCount = 5
    const buttonSize = 30

    let currentPage = 1
    let totalPages = buttonCount / 4

    function renderButton() {
        buttonContainer.innerHTML = ''
        if (currentPage > 1) {
            const prevButton = createButton('<')
            prevButton.addEventListener('click', () => {
                currentPage--
                renderButton()
            })
            buttonContainer.appendChild(prevButton)
        }

        const startButton = (currentPage - 1) * 4
        let endButton = startButton + 4

        if (endButton > buttonCount) {
            endButton = buttonCount
        }

        for (let i = startButton; i < endButton; i++) {
            const button = createButton(i + 1)
            buttonContainer.appendChild(button)
        }

        if (currentPage < totalPages) {
            const nextButton = createButton('>')
            nextButton.addEventListener('click', () => {
                currentPage++
                renderButton()
            })
            buttonContainer.appendChild(nextButton)
        }
    }

    function createButton(number) {
        const button = document.createElement('div')
        button.classList.add('button')
        button.id = number
        button.style.width = buttonSize + 'px'
        button.style.height = buttonSize + 'px'
        button.innerText = number
        return button
    }

    renderButton()
})

window.addEventListener('load', function () {
    function fetchComments(promotionIdx) {
        $.ajax({
            url: `/comment/promotion/${promotionIdx}`,
            type: 'GET',
            success: function (response) {
                if (response.commentList) {
                    console.log('댓글 조회 성공:', response.commentList)
                    // 여기서 댓글 리스트를 처리하는 로직을 추가하세요.
                } else {
                    console.error('댓글 조회 실패:', response.message)
                }
            },
            error: function (xhr, status, error) {
                console.error('댓글 조회 오류:', error)
            },
        })
    }

    function fetchReviews() {
        $.ajax({
            url: '/comment/promotion/{promotionIdx}', // 실제 API 경로로 수정해야 함
            type: 'GET',
            success: function (response) {
                if (response.commentList) {
                    console.log('리뷰 조회 성공:', response.commentList)
                    // 리뷰 데이터를 화면에 표시하는 로직 추가
                    for (const review of response.commentList) {
                        addReview({
                            profilePictureUrl: '../svg/profile.svg', // 프로필 사진 URL
                            nickname: 'User', // 닉네임
                            rating: 5, // 평점 (임의로 5점으로 설정)
                            date: review.createdAt, // 작성일자
                            comment: review.commentContent, // 리뷰 내용
                            photo: '../svg/storePhoto.svg', // 리뷰 사진 URL
                        })
                    }
                } else {
                    console.error('리뷰 조회 실패:', response.message)
                }
            },
            error: function (xhr, status, error) {
                console.error('리뷰 조회 오류:', error)
            },
        })
    }

    fetchReviews()
})
