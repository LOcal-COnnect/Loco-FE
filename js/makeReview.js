function handleImageSelection(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            const pictureDiv = event.target.parentElement
            pictureDiv.style.backgroundImage = `url(${imgDataUrl})`
            pictureDiv.textContent = ''
            pictureDiv.backgroundColor = 'white'
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
