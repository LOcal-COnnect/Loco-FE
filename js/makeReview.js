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
function completeCreatePromotion(promotionIdx, userIdx) {
    const content = document.querySelector('.contentInput').value
    const rating = document.querySelector('.rating-value').textContent
    const selectedFileInput = document.querySelector(
        '.pictureInputBox input[type="file"]'
    )
    if (
        selectedFileInput &&
        selectedFileInput.files &&
        selectedFileInput.files.length > 0
    ) {
        const selectedFile = selectedFileInput.files[0]

        const formData = new FormData()
        formData.append('content', content)
        formData.append('rating', rating)
        if (selectedFile) {
            formData.append('image', selectedFile)
        }

        $.ajax({
            url: '/comment/{promotionIdx}/users/{userIdx}',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.code === 200) {
                    console.log('댓글 등록 성공:', response.message)
                } else {
                    console.error('댓글 등록 실패:', response.message)
                }
            },
            error: function (xhr, status, error) {
                console.error('댓글 등록 오류:', error)
            },
        })
    } /*
    else {
        console.error('선택된 파일이 없습니다.')
    } */
}

const promotionIdx = 123
const userIdx = 456

completeCreatePromotion(promotionIdx, userIdx)

// 댓글 수정 ajax
function modifyComment(commentIdx, newCommentContent) {
    $.ajax({
        url: '/comment/${commentIdx}',
        type: 'PATCH',
        data: JSON.stringify({
            commentContent: newCommentContent,
        }),
        contentType: 'application/json',
        success: function (response) {
            if (response.code === 200) {
                console.log('댓글 수정 성공:', response.message)
            } else {
                console.error('댓글 수정 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('댓글 수정 오류:', error)
        },
    })
}

document.querySelector('.completeBt').addEventListener('click', function () {
    const commentIdx = 123
    const newCommentContent = '수정된 댓글 내용입니다.'

    modifyComment(commentIdx, newCommentContent)
})
