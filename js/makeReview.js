function handleImageSelection(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            const pictureWrap = event.target.parentElement.parentElement // .pictureInputWrap
            pictureWrap.style.backgroundImage = `url(${imgDataUrl})`
            pictureWrap.textContent = '' // 내용 비우기
        }

        reader.readAsDataURL(selectedFile)
    }
}

const stars = document.querySelectorAll('.star')
const ratingValue = document.querySelector('.rating-value')

let selectedRating = 0

stars.forEach((star) => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'))

        if (selectedRating === value) {
            selectedRating = 0
        } else {
            selectedRating = value
        }

        updateStars()
        updateRatingValue()
    })
})

function updateStars() {
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.src = 'svg/🦆 icon _star_.svg'
        } else {
            star.src = 'svg/starOut.svg'
        }
    })
}

function updateRatingValue() {
    ratingValue.textContent = selectedRating
}

// 댓글 달기 ajax
// makeReview.js

function completeCreatePromotion() {
    const contentInput = document.querySelector('.contentInput')
    const commentContent = contentInput.value

    const ratingValue = document.querySelector('.rating-value').textContent
    const stars = Array.from(document.querySelectorAll('.star'))

    let imageFile = null
    const pictureInput = document.querySelector('.pictureInputBox input')
    if (pictureInput.files.length > 0) {
        imageFile = pictureInput.files[0]
    }

    // Create FormData object
    const formData = new FormData()
    formData.append('commentContent', commentContent)
    formData.append('rating', ratingValue)
    if (imageFile) {
        formData.append('image', imageFile)
    }

    // AJAX request
    $.ajax({
        url: '/comment', // 실제 서버 URL로 변경해야 함
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.code === 200) {
                console.log('댓글 등록 성공:', response.message)
                // 댓글 등록 성공 시 처리할 내용 추가
            } else {
                console.error('댓글 등록 실패:', response.message)
                // 댓글 등록 실패 시 처리할 내용 추가
            }
        },
        error: function (xhr, status, error) {
            console.error('댓글 등록 오류:', error)
            // 오류 처리
        },
    })
}
