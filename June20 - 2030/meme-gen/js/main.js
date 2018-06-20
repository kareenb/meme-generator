'use strict';

console.log('main');

renderImgs();

function initPage() {
    var elGallery = document.querySelector('.meme-imgs');
    elGallery.style.maxHeight = elGallery.scrollHeight + "px";
}

function renderImgs() {
    var strHTML = '';
    var elGallery = document.querySelector('.meme-imgs');

    gImgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="renderImgOnCanvas(${img.id}); toggleSections()" />`;
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

function toggleSections() {
    console.log('jkj');
    
    toggleMemeEditor();
    toggleGallery();
}

function toggleMemeEditor() {
    var elMemeEditor = document.querySelector('.meme-editor');
    if (elMemeEditor.style.maxHeight) {
        elMemeEditor.style.maxHeight = null;
    } else {
        elMemeEditor.style.maxHeight = elMemeEditor.scrollHeight + "px";
    }
}

function toggleGallery() {
    var elGallery = document.querySelector('.meme-imgs');
    if (elGallery.style.maxHeight) {
        elGallery.style.maxHeight = null;
    } else {
        elGallery.style.maxHeight = elGallery.scrollHeight + "px";
    }
}