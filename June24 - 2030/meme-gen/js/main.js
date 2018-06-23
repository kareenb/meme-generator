'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');

function initPage() {
    createImgs();
    renderImgGallery();
    initKeywords();
    renderKeywordsDisplay();
}

function renderImgGallery(imgs) {
    var strHTML = '';
    var elGallery = document.querySelector('.gallery');
    if (!imgs) imgs = getImgsForDisplay();
    imgs.forEach(function (img) {
        strHTML += `<li><div><img class="img img-${img.id}" src="${img.url}" onclick="readUserSelectedImg(${img.id}); toggleSections()" /></div></li>`;
    });

    elGallery.innerHTML = strHTML;
}

function readUserSelectedImg(imgId) {
    updateMemeInfo(imgId);
    renderImgIntoCanvas(imgId);
    adjustControls();
}

function renderImgIntoCanvas(imgId) {
    var meme = getCurrMeme();
    if (!imgId) {
        if (meme.selectedImgId) imgId = meme.selectedImgId;
        else return;
    }
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

    var elSelectedImg = document.querySelector(`.img-${imgId}`);
    var image = new Image(0, 0);
    image.src = elSelectedImg.src;
    var ratio = image.naturalHeight / image.naturalWidth;
    gElCanvas.width = document.querySelector('.meme-canvas').clientWidth - 30;
    gElCanvas.height = gElCanvas.width * ratio;
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);
}

function toShowGallery() {
    var elGallery = document.querySelector('.gallery-wrapper');
    if (elGallery.classList.contains('gallery-wrapper-open')) return;
    toggleSections();
}

function toggleSections() {
    toggleMemeEditor();
    toggleGalleries();
}

function toggleMemeEditor() {
    var elMemeEditor = document.querySelector('.meme-editor');
    elMemeEditor.classList.toggle('meme-editor-open');
}

function toggleGalleries() {
    var elGallery = document.querySelector('.gallery-wrapper');
    elGallery.classList.toggle('gallery-wrapper-open');
}

function toggleMenu() {
    if (window.innerWidth > 780) return;
    var elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.classList.toggle('is-active');

    var elMenu = document.querySelector('.main-menu');
    elMenu.classList.toggle('open');

    var elOpacity = document.querySelector('.menu-opacity');
    elOpacity.classList.toggle('opacity-open');
}

function renderKeywordsDisplay() {
    var keywords = loadKeywords();
    var strHTML = '';
    var numOfDisplayKeywords = (keywords.length < 15) ? keywords.length : 15;
    var displayKeywords = [];

    for (var i = 0; i < numOfDisplayKeywords; i++) {
        var keyword = keywords[i];
        strHTML = `<span style="font-size: `;
        if (i === 0) strHTML += `0.5`;
        else strHTML += i * 0.8;
        strHTML += `em;" onclick="searchImgs('${keyword.keyword}')">
                        ${keyword.keyword}
                    </span>`;
        displayKeywords.push(strHTML);
    }

    var elKeyWordsPanel = document.querySelector('.keywords-display');
    while (displayKeywords.length > 0) {
        strHTML = '';
        var elKeyword = displayKeywords.splice(getRandomInt(0, displayKeywords.length), 1);
        strHTML = elKeyword[0];
        elKeyWordsPanel.innerHTML += strHTML;
    }
}

function searchImgs(searchVal) {
    var imgs = getImgsForDisplay(getImgsByKeyword(searchVal));
    renderImgGallery(imgs);
}

function sendUserMsg() {
    var userName = document.querySelector('.contact .user-name').value;
    var msgSubj = document.querySelector('.contact .msg-subj').value;
    var msgBody = document.querySelector('.contact textarea').value;
    msgBody += `
                From: ${userName}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=kareenb89@gmail.com&su=${msgSubj}&body=${msgBody}`, '_blank');
}