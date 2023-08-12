var host = 'localhost:3000'

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search)
    window.postId = urlParams.get('id')
    getPromotionDetail(window.postId)
    console.log(postId)
}

const image = document.getElementById('goodnum')
let isClicked = false

image.addEventListener('click', () => {
    if (isClicked) {
        image.classList.remove('active')
    } else {
        image.classList.add('active')
    }
    isClicked = !isClicked
})

$('#goodnum').click(function () {
    const likeCountElement = $('#likeCount')
    let isClicked = false

    if (!isClicked) {
        $.ajax({
            url: host + '/like/{userIdx}/promotion/' + window.postId,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                postid: 1, // 게시물 ID
                goodnum: $('#goodnum').val(),
            }),
            success: function (data) {
                likeCountElement.text(data.likeCount) // 서버에서 받은 좋아요 수로 업데이트
            },
            error: function () {
                alert('좋아요 수가 입력되지 않았습니다.')
            },
        })
    }

    if (isClicked) {
        $('#goodnum').removeClass('active')
    } else {
        $('#goodnum').addClass('active')
    }

    isClicked = !isClicked
})

function getPromotionDetail(postId) {
    $.ajax({
        url: host + '/stores/promotion/' + postId,
        method: 'GET',
        success: function (data) {},
    })

    var data = {
        promotionTitle: '제목입니다.',
        promotionContent: '내용입니다.',
        promotionImageList: [],
    }
    var title = document.querySelector('.postTitle')
    var content = document.querySelector('.postContentWrap')

    title.innerText = data.promotionTitle
    content.innerText = data.promotionContent
}

// 작성한 댓글 하단에 불러오기
document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.querySelector('.commentInput input')
    const commentList = document.querySelector('.commentList')

    commentInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const commentContent = commentInput.value
            if (commentContent.trim() !== '') {
                const commentItem = document.createElement('div')
                commentItem.className = 'commentItem'

                const commentProfile = document.createElement('img')
                commentProfile.src = 'img/commentProfile.svg'
                commentProfile.className = 'commentProfile'

                const commentContentDiv = document.createElement('div')
                commentContentDiv.className = 'commentContent'

                const commentInfoDiv = document.createElement('div')
                commentInfoDiv.className = 'commentInfo'

                const commentTitle = document.createElement('div')
                commentTitle.className = 'commentTitle'
                commentTitle.textContent = '요를레히호' // 사용자 이름이라면 여기서 동적으로 가져와야 할 것입니다.

                const commentTime = document.createElement('div')
                commentTime.className = 'commentTime'
                commentTime.textContent = '방금' // 작성 시간이라면 여기서 동적으로 가져와야 할 것입니다.

                const commentText = document.createElement('div')
                commentText.className = 'comment'
                commentText.textContent = commentContent

                const editButton = document.createElement('button')
                editButton.className = 'editButton'
                editButton.textContent = '수정하기'
                editButton.addEventListener('click', function () {
                    // TODO: 댓글 수정 기능 구현
                })

                const deleteButton = document.createElement('button')
                deleteButton.className = 'deleteButton'
                deleteButton.textContent = '삭제하기'
                deleteButton.addEventListener('click', function () {
                    commentList.removeChild(commentItem)
                })

                commentInfoDiv.appendChild(commentTitle)
                commentInfoDiv.appendChild(commentTime)
                commentContentDiv.appendChild(commentInfoDiv)
                commentContentDiv.appendChild(commentText)
                commentContentDiv.appendChild(editButton)
                commentContentDiv.appendChild(deleteButton)

                commentItem.appendChild(commentProfile)
                commentItem.appendChild(commentContentDiv)

                commentList.appendChild(commentItem)

                commentInput.value = ''
            }
        }
    })
})
