
// 내비게이션 바를 생성하는 함수
function createNavbar() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching navbar:', error);
        });
}

window.addEventListener('load', createNavbar);