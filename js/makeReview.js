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

// 페이지 이동 (수정 완료 버튼)
function completeCreatePromotion() {
    window.location.href = 'aboutStoreMore.html'
}

// 리뷰 작성 ajax
function completeCreateReview(storeIdx, userIdx) {
    const content = document.querySelector('.contentInput').value
    const rating = parseFloat(
        document.querySelector('.rating-value').textContent
    )
    const selectedFileInput = document.querySelector(
        '.pictureInputBox input[type="file"]'
    )

    if (!content || !rating) {
        console.error('내용과 별점을 모두 입력해주세요.')
        return
    }

    const formData = new FormData()
    formData.append('reviewContent', content)
    formData.append('reviewStar', rating.toFixed(1))

    if (
        selectedFileInput &&
        selectedFileInput.files &&
        selectedFileInput.files.length > 0
    ) {
        const selectedFile = selectedFileInput.files[0]
        formData.append('reviewImage', selectedFile)
    }

    $.ajax({
        url: `/reviews/${storeIdx}/users/${userIdx}`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.code === 200) {
                console.log('리뷰 등록 성공:', response.message)
                // 리뷰 등록 성공 시 처리 로직 추가
            } else {
                console.error('리뷰 등록 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('리뷰 등록 오류:', error)
        },
    })
}

const storeIdx = 789
const userIdx = 456

document.querySelector('.completeBt').addEventListener('click', function () {
    completeCreateReview(storeIdx, userIdx)
})
