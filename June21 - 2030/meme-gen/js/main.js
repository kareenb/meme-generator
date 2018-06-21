'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');

function initPage() {
    createImgs();
    renderImgGallery();
    initKeywords();
}

function renderImgGallery() {
    var strHTML = '';
    var elGallery = document.querySelector('.meme-imgs');
    var imgs = getImgsForDisplay();
    imgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="readUserSelectedImg(${img.id}); toggleMemeEditor()" />`;
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

function readUserLine(txt) {
    updateTxt(txt);
    renderMeme();
}

function readUserTxtColor(color) {
    updateTxtColor(color);
    renderMeme();
}

function readUserTxtSize(mathExpr) {
    updateTxtSize(mathExpr);
    renderMeme();
}

function readUserTxtFont(fontName) {
    updateTxtFont(fontName);
    renderMeme();
}

function readUserTxtAlign(direction) {
    updateTxtAlign(direction);
    renderMeme();
}

function alignTxtOnCanvas(direction) {
    var canvasTxtX;
    switch (direction) {
        case 'center':
            return canvasTxtX = gElCanvas.width / 2;
        case 'left':
            return canvasTxtX = 20;
        case 'right':
            return canvasTxtX = gElCanvas.width - 20;
    }
}

function readUserTxtYOnCanvas(direction) {
    var meme = getCurrMeme();
    switch (direction) {
        case 'up':
            meme.txts[0].height -= 5;
            renderMeme();
            break;
        case 'down':
            meme.txts[0].height += 5;
            renderMeme();
            break;
    }
}

function renderTxtOnCanvas() {
    var meme = getCurrMeme();
    if (!meme.txts[0].size) meme.txts[0].size = 30;
    if (!meme.txts[0].font) meme.txts[0].font = 'Impact';
    if (!meme.txts[0].color) meme.txts[0].color = 'black';
    if (!meme.txts[0].align) meme.txts[0].align = 'center';
    if (!meme.txts[0].height) meme.txts[0].height = 50;

    gCtx.font = `${meme.txts[0].size}px "${meme.txts[0].font}"`;
    gCtx.fillStyle = meme.txts[0].color;
    gCtx.textAlign = `${meme.txts[0].align}`;

    var canvasTxtX = alignTxtOnCanvas(meme.txts[0].align);
    var canvasTxtY = meme.txts[0].height;
    gCtx.fillText(meme.txts[0].line, canvasTxtX, canvasTxtY);
}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderImgIntoCanvas();
    renderTxtOnCanvas();
}

function toggleSections() {
    toggleMemeEditor();
    // toggleGallery();
}

function toggleMemeEditor() {
    var elMemeEditor = document.querySelector('.meme-editor');
    elMemeEditor.classList.toggle('meme-editor-open');
}

function toggleGallery() {
    var elGallery = document.querySelector('.meme-imgs');
    if (elGallery.style.maxHeight) {
        elGallery.style.maxHeight = null;
    } else {
        elGallery.style.maxHeight = elGallery.scrollHeight + 'px';
    }
}

function toggleMenu(elBtn) {
    var elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.classList.toggle('is-active');

    var elMenu = document.querySelector('.main-menu');
    elMenu.classList.toggle('open');

    var elOpacity = document.querySelector('.menu-opacity');
    elOpacity.classList.toggle('opacity-open');
}

function renderSearchResults(imgs) {
    var strHTML = '';
    var elResults = document.querySelector('.search-results');
    imgs.forEach(function (img) {
        strHTML += `<img class="img img-${img.id}" src="${img.url}" onclick="readUserSelectedImg(${img.id}); toggleMemeEditor()" />`;
    });

    elResults.innerHTML = strHTML;
}

function searchImgs() {
    var elSearch = document.querySelector('.search-imgs');
    var imgs = getImgsForDisplay(getImgsByKeyword(elSearch.value))
    renderSearchResults(imgs)
}