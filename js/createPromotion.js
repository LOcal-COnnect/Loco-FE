function handleImageSelection(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function() {
            const imgDataUrl = reader.result;
            const pictureDiv = event.target.parentElement;
            pictureDiv.style.backgroundImage = `url(${imgDataUrl})`;
            pictureDiv.textContent = '';
            pictureDiv.backgroundColor = 'white';
        };

        reader.readAsDataURL(selectedFile);
    }
}
