var host = 'localhost:3000';

document.addEventListener('DOMContentLoaded', function () {
    // 내비게이션 바를 생성하는 함수를 호출합니다.
    createNavbar()

    // 홈, 로그인, 회원가입 버튼의 이벤트 위임
    document.addEventListener('click', function (event) {
        if (event.target.id === 'homeButton') {
            window.location.href = 'mainpage.html'
        } else if (event.target.id === 'loginButton') {
            window.location.href = 'login.html'
        } else if (event.target.id === 'registerButton') {
            window.location.href = 'selectJoin.html'
        } else if (event.target.id === 'categoryButton') {
            // 카테고리 버튼 클릭 시 숨겨진 카테고리를 보이거나 숨깁니다.
            var hiddenCategory = document.getElementById('hiddenCategory')
            if (hiddenCategory) {
                toggleHiddenCategory(hiddenCategory)
            }
        } else if (event.target.id === 'mypageButton') {
            window.location.href = 'login.html'
            // 마이페이지 버튼 클릭 시 로그인 상태에 따라 동작을 처리합니다.
            const isLoggedIn = false // 실제 로그인 상태 확인으로 변경해야 합니다.
            if (!isLoggedIn) {
                window.location.href = 'login.html'
            }
        }
    })
    // document.getElementById("searchInput").addEventListener("keydown", function (event) {
    //     if (event.key === "Enter") {
    //         search();
    //     }
    // });
})

function toggleHiddenCategory(hiddenCategory) {
    if (hiddenCategory.style.display === 'none') {
        hiddenCategory.style.display = 'block'
    } else {
        hiddenCategory.style.display = 'none'
    }
}

function createNavbar() {
    fetch('nav.html')
        .then((response) => response.text())
        .then((data) => {
            document.getElementById('navbar').innerHTML = data
        })
        .catch((error) => {
            console.error('Error fetching navbar:', error)
        })
}

function search() {

    var searchText = document.getElementById('searchInput').value;
    console.log('검색어: ' + searchText);

    localStorage.setItem('search', toString(searchText));
    getSearchResult(searchText);

}

function cardEffect(){
    var promotionCards = document.querySelectorAll('.promotionCard');

    promotionCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
        });
    });
}

function getSearchResult(name){
    var promotionSelectWrap = document.querySelector('.promotionSelectBtWrap');
    var promotionSearchWrap = document.querySelector('.promotionSearchBtWrap');
    var searchTitle = document.querySelector('.searchTitle');
    var searchName = document.querySelector('.searchName');

    promotionSelectWrap.style.display = 'none';
    promotionSearchWrap.style.display = 'block';

    searchTitle.innerText = '검색어';
    searchName.innerText = name;

    $.ajax({
        url: host + '/stores/' + name,
        method: 'GET',
        success:function(data){

        },error: function(){
            alert('검색 결과 못가져왔지롱 ㅋㅋ');
        }
    })
    var data = {
        "promotionList":[
            {
                "promotionIdx":1,
                "promotionTitle":"검색결과1입니다.",
                "promotionContent":"게시글내용입니다.",
                "viewCount":234
            },
            {
                "promotionIdx":2,
                "promotionTitle":"검색결과2입니다.",
                "promotionContent":"게시글내용입니다.",
                "viewCount":234
            },
            {
                "promotionIdx":3,
                "promotionTitle":"검색결과3입니다.",
                "promotionContent":"게시글내용입니다.",
                "viewCount":234
            },
            {
                "promotionIdx":3,
                "promotionTitle":"검색결과4입니다.",
                "promotionContent":"게시글내용입니다.",
                "viewCount":234
            },
            {
                "promotionIdx":3,
                "promotionTitle":"검색결과5입니다.",
                "promotionContent":"게시글내용입니다.",
                "viewCount":234
            },
            {
                "promotionIdx":3,
                "promotionTitle":"제목ㄴ입니다.",
                "promotionContent":"게시글내용입니다.",
                "viewCount":234
            }
        ]
    }

    var container = document.querySelector('.promotionListWrap');
    var length = data.promotionList.length;

    container.innerHTML = '';
    for (var i = 0; i < length; i++) {
        var card = document.createElement('div');
        card.className = "promotionCard";
        card.id = data.promotionList[i].promotionIdx;
        card.setAttribute("onclick", "moveDetail(" + data.promotionList[i].promotionIdx + ");");

        card.innerHTML = `
            <img class="promotionImg" src="img/storeImgSample.svg"/>
            <h3>${data.promotionList[i].promotionTitle}</h3>
            <div class="storeIntro">
                ${data.promotionList[i].promotionContent}
            </div>
            <div class="promotionInfo">
                <img src="img/good.svg"/>
                <div class="storeInfo">
                    <img src="img/store.svg"/>
                    <p class="storeName">도라메옹</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    }
    cardEffect();
}


