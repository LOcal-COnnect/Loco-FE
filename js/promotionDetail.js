var host = 'localhost:3000';

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get('id');
    getPromotionDetail();
    console.log(postId);
}

function getPromotionDetail(){
    // $.ajax({
    //     url: host + '/stores/Promotion/' + postId,
    //     method: 'GET',
    //     success: function(data){
    //
    //     }
    // })
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