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

// Function to update character count for contentInput
function updateCharCount() {
    const contentInput = document.querySelector('.contentInput')
    const charCount = document.querySelector('#charCount')
    const maxLength = parseInt(contentInput.getAttribute('maxlength'))
    const currentLength = contentInput.value.length
    charCount.textContent = `${currentLength} / ${maxLength}`
}

// Attach event listener to the contentInput to update the character count on input
const contentInput = document.querySelector('.contentInput')
contentInput.addEventListener('input', updateCharCount)

/*
// 500자 글자 제한
const introductionText = document.getElementById('introductionText')
const charCount = document.getElementById('charCount')

introductionText.addEventListener('input', function () {
    const maxChars = 500
    const currentChars = introductionText.value.length
    charCount.textContent = `${currentChars} / ${maxChars} characters`

    if (currentChars > maxChars) {
        introductionText.value = introductionText.value.slice(0, maxChars)
        charCount.textContent = `${maxChars} / ${maxChars} characters`
    }
})
*/

const photoInput = document.getElementById('photoInput')
const photoLabel = document.querySelector('.photo')

photoLabel.addEventListener('click', function () {
    photoInput.click()
})

photoInput.addEventListener('change', function () {
    const files = photoInput.files
    if (files.length > 0) {
        const fileName = files[0].name
        photoLabel.textContent = fileName
    }
})

function toggleOptions() {
    var options = document.getElementById('categoryOptions')
    options.style.display = options.style.display === 'block' ? 'none' : 'block'
}

function selectCategory(category) {
    var selection = document.querySelector('.category-selection')
    selection.textContent = category + ' '
    var arrow = document.createElement('span')
    arrow.className = 'arrow-down'
    selection.appendChild(arrow)
    var options = document.getElementById('categoryOptions')
    options.style.display = 'none'
}

// 게시글 1000자 이내
const introText = document.getElementById('introductionText2')
const charCountDisplay = document.getElementById('charCount2')

introText.addEventListener('input', function () {
    const maxChars = 1000
    const currentChars = introText.value.length
    charCountDisplay.textContent = `${currentChars} / ${maxChars} characters`

    if (currentChars > maxChars) {
        introText.value = introText.value.slice(0, maxChars)
        charCountDisplay.textContent = `${maxChars} / ${maxChars} characters`
    }
})

// 홍보글 새 페이지
/*
const writeButton = document.getElementById('writeButton')
const tab2 = document.getElementById('tab2')
writeButton.addEventListener('click', function () {
    tab2.style.display = 'none'
}) */

function completeCreatePromotion() {
    window.location.href = 'storeMypageTab2(2).html' // b.html로 이동
}

// 내 정보 수정하기
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            tab1.classList.add('active')

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const text = item.textContent

                const input = document.createElement('input')
                input.type = 'text'
                input.value = text

                item.innerHTML = ''
                item.append(img)
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            editing = true
        } else {
            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                item.innerHTML = ''
                item.append(img)
                item.appendChild(document.createTextNode(text))
            })

            moveEditMyBt.textContent = '내 정보 수정하기'
            editing = false
        }
    })
})

// 사진 등록
function handleImageSelection(event) {
    const photoInput = event.target
    const picBox = photoInput.closest('.menuShow').querySelector('.pic')

    if (photoInput.files && photoInput.files[0]) {
        const selectedPhoto = photoInput.files[0]
        const reader = new FileReader()

        reader.onload = function (e) {
            picBox.innerHTML = '' // Clear existing content

            const photoElement = document.createElement('img')
            photoElement.src = e.target.result
            photoElement.alt = 'Uploaded Photo'
            photoElement.classList.add('uploaded-photo')

            picBox.appendChild(photoElement)
        }

        reader.readAsDataURL(selectedPhoto)
    }
}

// 각 메뉴의 input 요소에 onchange 이벤트 핸들러 설정
const menuPhotoInputs = document.querySelectorAll('.menuPhotoInput')
menuPhotoInputs.forEach((input, index) => {
    input.addEventListener('change', function (event) {
        handleImageSelection(event, index + 1)
    })
})

function handleImageSelection(event, index) {
    const photoInput = event.target
    const picBox = document
        .querySelector(`#menuPhotoInput${index}`)
        .closest('.pic')
    const label = picBox.querySelector('.menuPhoto')
    const imageMent = label.querySelector('.menuPhotoMent')

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader()

        reader.onload = function (e) {
            const img = document.createElement('img')
            img.src = e.target.result
            img.alt = 'Uploaded Photo'
            picBox.innerHTML = '' // Clear existing content
            picBox.appendChild(img)
            imageMent.style.display = 'none'
        }

        reader.readAsDataURL(photoInput.files[0])
    }
}
