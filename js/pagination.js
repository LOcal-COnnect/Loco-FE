window.addEventListener('DOMContentLoaded', (event) => {
    const buttonContainer = document.getElementById('buttonContainer');

    // buttonCount는 추후 백엔드에서 넘겨주는 페이지 수
    // totalPages : 10/4 = 2 보여줘야 하는 총 페이지수 (현재 페이지가 1이라 -1 해줌)
    const buttonCount = 5;
    const buttonSize = 30;

    let currentPage = 1;
    let totalPages = buttonCount / 4 ;

    function renderButton() {
        buttonContainer.innerHTML = '';

        if (currentPage > 1) {
            const prevButton = createButton('<');
            prevButton.addEventListener('click', () => {
                currentPage--;
                renderButton();
            });
            buttonContainer.appendChild(prevButton);
        }

        const startButton = (currentPage - 1) * 4;
        let endButton = startButton + 4;
        if (endButton > buttonCount) {
            endButton = buttonCount;
        }

        for (let i = startButton; i < endButton; i++) {
            const button = createButton(i + 1);
            buttonContainer.appendChild(button);
        }

        if (currentPage < totalPages) {
            const nextButton = createButton('>');
            nextButton.addEventListener('click', () => {
                currentPage++;
                renderButton();
            });
            buttonContainer.appendChild(nextButton);
        }
    }

    function createButton(number) {
        const button = document.createElement('div');
        button.classList.add('button');
        button.id = number;
        button.style.cursor = 'pointer';
        button.style.width = buttonSize + 'px';
        button.style.height = buttonSize + 'px';
        button.innerText = number;
        return button;
    }

    renderButton();
});
