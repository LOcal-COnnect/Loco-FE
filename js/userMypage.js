const tabList = Array.from(document.querySelectorAll('.tab'))

tabList.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick)
})

function handleSortButtonClick(event) {
    const clickedTab = event.target

    tabList.forEach((button) => {
        button.classList.remove('active')
        if (button === clickedTab) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })

    var tab1 = document.getElementsByClassName('tab1')[0]
    var tab2 = document.getElementsByClassName('tab2')[0]
    var tab3 = document.getElementsByClassName('tab3')[0]
    if (clickedTab.id === 'tab1') {
        tab1.style.display = 'block'
        tab2.style.display = 'none'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab2') {
        tab1.style.display = 'none'
        tab2.style.display = 'block'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab3') {
        tab1.style.display = 'none'
        tab2.style.display = 'none'
        tab3.style.display = 'block'
    }
}

// 내 정보 수정하기
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false // To track whether user is editing or not

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            // 내 정보 수정하기 버튼을 클릭하여 편집 모드로 전환
            tab1.classList.add('active') // tab1 활성화

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const text = item.textContent

                const input = document.createElement('input')
                input.type = 'text'
                input.value = text

                item.innerHTML = ''
                item.appendChild(img.cloneNode(true))
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            editing = true
        } else {
            // 수정 완료 버튼을 클릭하여 저장하고 편집 모드 종료
            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                item.innerHTML = ''
                item.appendChild(img.cloneNode(true))
                item.appendChild(document.createTextNode(text))
            })

            moveEditMyBt.textContent = '내 정보 수정하기'
            editing = false

            // 변경된 내용을 서버에 저장하는 로직 추가
            // ...

            // 저장 완료 후의 처리 로직
            // ...
        }
    })
})
