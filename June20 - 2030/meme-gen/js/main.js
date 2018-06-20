'use strict';

console.log('main');

renderImgs();

function renderImgs() {
    var strHTML = '';
    var elGallery = document.querySelector('.meme-imgs');

    gImgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="renderImgOnCanvas(this, ${img.id})" />`;
    });

    elGallery.innerHTML = strHTML;
}


function renderImgOnCanvas(img, imgId) {
    var elCanvas = document.querySelector('canvas');
    var ctx = elCanvas.getContext("2d");
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
    elCanvas.width = 400;
    elCanvas.height = 400;
    ctx.drawImage(img, 0, 0, 400, 400);

    gMeme.selectedImgId = imgId; // TODO: Delete?

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