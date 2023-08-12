var host = 'localhost:3000';

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get('id');
    getPromotionDetail(postId);
    console.log(postId);
}

const image = document.getElementById('goodnum');
let isClicked = false;

image.addEventListener('click', () => {
    if (isClicked) {
        image.classList.remove('active');
    } else {
        image.classList.add('active');
    }
    isClicked = !isClicked;
});

$('#goodnum').click(function() {
    const likeCountElement = $('#likeCount');
    let isClicked = false;

    if (!isClicked) {
        $.ajax({
            url: host + '/stores/Promotion',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'postid': 1, // 게시물 ID 
                'goodnum': $('#goodnum').val(),
            }),
            success: function(data) {
                likeCountElement.text(data.likeCount); // 서버에서 받은 좋아요 수로 업데이트
            },
            error: function() {
                alert('좋아요 수가 입력되지 않았습니다.');
            },
        });
    }

    if (isClicked) {
        $('#goodnum').removeClass('active');
    } else {
        $('#goodnum').addClass('active');
    }

    isClicked = !isClicked;
});


function getPromotionDetail(postId){
    $.ajax({
        url: host + '/stores/promotion/' + postId,
        method: 'GET',
        success: function(data){

        }
    })
    var data = {
        "promotionTitle":"제목입니다.",
        "promotionContent":"내용입니다.",
        "promotionImageList":[
        ]
    };
    var title = document.querySelector('.postTitle');
    var content = document.querySelector('.postContentWrap');
    
    title.innerText = data.promotionTitle;
    content.innerText = data.promotionContent;
}