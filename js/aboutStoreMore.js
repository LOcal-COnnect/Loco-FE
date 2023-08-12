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

// 리뷰 전체 보기 ajax
const storeIdx = 123

function fetchAndDisplayReviews() {
    const reviewBox = document.querySelector('.review-box')

    reviewBox.innerHTML = ''

    $.ajax({
        url: `/reviews/stores/${storeIdx}`,
        type: 'GET',
        success: function (response) {
            if (response.code === 200) {
                const reviewList = response.reviewList

                reviewList.forEach((review) => {
                    const reviewElement = document.createElement('div')
                    reviewElement.classList.add('review')

                    const profilePicture = document.createElement('img')
                    profilePicture.src = review.profilePictureUrl
                    profilePicture.alt = 'Profile Picture'
                    profilePicture.classList.add('profile-picture')

                    const nicknameElement = document.createElement('h3')
                    nicknameElement.textContent = review.nickname
                    nicknameElement.classList.add('nickname')

                    const ratingElement = generateStarRating(review.reviewStar)
                    ratingElement.classList.add('star-rating')

                    const commentElement = document.createElement('p')
                    commentElement.textContent = review.reviewContent
                    commentElement.classList.add('comment')

                    const dateElement = document.createElement('span')
                    dateElement.textContent = formatDate(review.createdAt)
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
                })
            } else {
                console.error('Failed to fetch reviews:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch reviews:', error)
        },
    })
}

function generateStarRating(rating) {}

function formatDate(isoDate) {
    const date = new Date(isoDate)
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}

window.addEventListener('load', fetchAndDisplayReviews)
