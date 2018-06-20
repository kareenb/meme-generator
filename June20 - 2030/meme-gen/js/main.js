'use strict';

console.log('main');

renderImgs();

function renderImgs() {
    var strHTML = '';
    var elGallery = document.querySelector('.meme-imgs');

    gImgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="renderImgOnCanvas(${img.id})" />`;
    });

    elGallery.innerHTML = strHTML;
}


function renderImgOnCanvas(imgId) {
    updateMemeInfo(imgId);

    renderImgIntoCanvas(imgId);
}

function renderImgIntoCanvas(imgId) {
    if (!imgId) {
        if (gMeme.selectedImgId) imgId = gMeme.selectedImgId;
        else return;
    }
    var elCanvas = document.querySelector('canvas');
    var ctx = elCanvas.getContext("2d");
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
    
    var elSelectedImg = document.querySelector(`.img-${imgId}`);
    var image = new Image(0, 0);
    image.src = elSelectedImg.src;
    var ratio = image.naturalHeight / image.naturalWidth;
    elCanvas.width = window.innerWidth - 25;
    elCanvas.height = elCanvas.width * ratio;
    ctx.drawImage(image, 0, 0, elCanvas.width, elCanvas.height);
}

function renderTxtOnCanvas() {
    var elTxtBox = document.querySelector('.user-txt-box');
    updateTxt(elTxtBox.value);

    var elCanvas = document.querySelector('canvas');
    var ctx = elCanvas.getContext("2d");
    ctx.font = "40px 'Arial'";
    ctx.fillStyle = 'black';
    ctx.fillText(elTxtBox.value, 20, 20);
}