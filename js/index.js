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
    var searchText = document.getElementById('searchInput').value
    // 여기에 검색 기능을 구현하는 코드를 작성합니다.
    // 검색할 단어(searchText)를 활용하여 검색 동작을 수행합니다.
    // 예를 들어, 검색 결과를 보여주거나 검색 페이지로 이동하는 등의 동작을 수행할 수 있습니다.
    // 이 예제에서는 검색어를 콘솔에 출력하는 것으로 대체합니다.
    console.log('검색어: ' + searchText)
}
