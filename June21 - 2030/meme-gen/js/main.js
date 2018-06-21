'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');

function initPage() {
    createImgs();
    renderImgGallery();
    initKeywords();
    renderKeywords();
}

function renderImgGallery() {
    var strHTML = '';
    var elGallery = document.querySelector('.meme-imgs');
    var imgs = getImgsForDisplay();
    imgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="readUserSelectedImg(${img.id}); toggleSections()" />`;
    });

    elGallery.innerHTML = strHTML;
}

function readUserSelectedImg(imgId) {
    updateMemeInfo(imgId);
    renderImgIntoCanvas(imgId);
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
    var elGarries = document.querySelectorAll('.gallery');
    if (elGarries[0].classList.contains('gallery-open')) return;
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
    var elGarries = document.querySelectorAll('.gallery');
    elGarries.forEach(function (gallery){
        gallery.classList.toggle('gallery-open');
    });
}

function toggleMenu() {
    var elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.classList.toggle('is-active');

    var elMenu = document.querySelector('.main-menu');
    elMenu.classList.toggle('open');

    var elOpacity = document.querySelector('.menu-opacity');
    elOpacity.classList.toggle('opacity-open');
}

function renderKeywords() {
    var keywords = loadKeywords();
    var strHTML = '';
    var numOfDisplayKeywords = (keywords.length < 15)? keywords.length : 15;

    for (var i = 0; i < numOfDisplayKeywords; i++) {
        var keyword = keywords[i];
        strHTML += `<span style="font-size: `;
        if (i === 0) strHTML += `0.7`;
        else strHTML += i;
        strHTML += `em;" onclick="searchImgs('${keyword.keyword}')">
                        ${keyword.keyword}
                    </span>`;
    }

    var elKeyWordsPanel = document.querySelector('.keywords-display');
    elKeyWordsPanel.innerHTML += strHTML;
}

function renderSearchResults(imgs) {
    var strHTML = '';
    var elResults = document.querySelector('.search-results');
    imgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="readUserSelectedImg(${img.id}); toggleMemeEditor()" />`;
    });

    elResults.innerHTML = strHTML;
}

function searchImgs(searchVal) {
    var imgs = getImgsForDisplay(getImgsByKeyword(searchVal));
    renderSearchResults(imgs);
}