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

    var elCanvas = document.querySelector('canvas');
    var ctx = elCanvas.getContext("2d");
    var elSelectedImg = document.querySelector(`.img-${imgId}`);
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
    elCanvas.width = 400;
    elCanvas.height = 400;
    ctx.drawImage(elSelectedImg, 0, 0, 400, 400);
}

function readUserLine() {
    var elTxtBox = document.querySelector('.user-txt-box');
    updateTxt(elTxtBox.value);
    renderTxtOnCanvas();
}


function renderTxtOnCanvas() {
    var elCanvas = document.querySelector('canvas');
    var ctx = elCanvas.getContext("2d");
    ctx.font = "40px 'Arial'";
    ctx.fillStyle = 'black';
    ctx.fillText(gMeme.txts[0].line, 20, 20);
}