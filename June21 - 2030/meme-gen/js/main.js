'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');
var gLineIdx = 0;

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

function addLine() {
    addTxtLine();
    var meme = getCurrMeme();
    gLineIdx = meme.txts.length - 1;
}

function readUserLine(txt) {
    updateTxt(txt, gLineIdx);
    renderMeme();
}

function readUserTxtColor(color) {
    updateTxtColor(color, gLineIdx);
    renderMeme();
}

function readUserTxtSize(mathExpr) {
    updateTxtSize(mathExpr, gLineIdx);
    renderMeme();
}

function readUserTxtFont(fontName) {
    updateTxtFont(fontName, gLineIdx);
    renderMeme();
}

function readUserTxtShadow() {
    updateTxtShadow(gLineIdx);
    var meme = getCurrMeme();
    var elTxtShadowBtn = document.querySelector('.txt-shadow');
    if (meme.txts[gLineIdx].shadow === 'on') elTxtShadowBtn.innerText = 'Text Shadow off';
    else elTxtShadowBtn.innerText = 'Text Shadow on';
    renderMeme();
}

function readUserTxtAlign(direction) {
    updateTxtAlign(direction, gLineIdx);
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
            meme.txts[gLineIdx].height -= 5;
            renderMeme();
            break;
        case 'down':
            meme.txts[gLineIdx].height += 5;
            renderMeme();
            break;
    }
}

function renderTxtOnCanvas(lineIdx) {
    var meme = getCurrMeme();
    var currLine = meme.txts[lineIdx];
    // var prevLine = meme.txts[lineIdx - 1];
    if (!currLine.size) currLine.size = 30;
    if (!currLine.font) currLine.font = 'Impact';
    if (!currLine.color) currLine.color = 'black';
    if (!currLine.align) currLine.align = 'center';
    if (!currLine.shadow) currLine.shadow = 'off';
    // if (meme.txts.length > 1) currLine.height = prevLine.height + 50;
    // else {
        if (!currLine.height) currLine.height = 50;
    // }

    if (currLine.shadow === 'on') {
        gCtx.shadowOffsetX = -1.5;
        gCtx.shadowOffsetY = 1.2;
        gCtx.shadowColor = 'grey';
    } else {
        gCtx.shadowOffsetX = 0;
        gCtx.shadowOffsetY = 0;
        gCtx.shadowColor = 'transparent';
    }

    gCtx.font = `${currLine.size}px "${currLine.font}"`;
    gCtx.fillStyle = currLine.color;
    gCtx.textAlign = `${currLine.align}`;

    var canvasTxtX = alignTxtOnCanvas(currLine.align);
    var canvasTxtY = currLine.height;
    gCtx.fillText(currLine.line, canvasTxtX, canvasTxtY);
}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderImgIntoCanvas();
    var meme = getCurrMeme();
    meme.txts.forEach(function(txt, idx) {
        renderTxtOnCanvas(idx);
    });
}

function updateLine(lineOrder) {
    var meme = getCurrMeme();
    var txts = meme.txts;
    switch (lineOrder) {
        case 'next':
            if (gLineIdx === txts.length - 1) gLineIdx = 0;
            else gLineIdx += 1;
            break;
        case 'prev':
            if (gLineIdx === 0) gLineIdx = txts.length - 1;
            else gLineIdx -= 1;
            break;
    }
    adjustControls();
}

function adjustControls() {
    var meme = getCurrMeme();
    var currLine = meme.txts[gLineIdx];
    
    document.querySelector('.user-txt-box').value = currLine.line;

    var colorOpts = document.querySelectorAll('.user-txt-color option');
    for (var i = 0; i < colorOpts.length; i++) {
        if (colorOpts[i].value === currLine.color) {
            document.querySelector('.user-txt-color').options.selectedIndex = i;
            break;
        }
    }

    var fontOpts = document.querySelectorAll('.user-txt-font option');
    for (var i = 0; i < fontOpts.length; i++) {
        if (fontOpts[i].value === currLine.font) {
            document.querySelector('.user-txt-font').options.selectedIndex = i;
            break;
        }
    }

    var alignOpts = document.querySelectorAll('.user-txt-align option');
    for (var i = 0; i < alignOpts.length; i++) {
        if (alignOpts[i].value === currLine.align) {
            document.querySelector('.user-txt-align').options.selectedIndex = i;
            break;
        }
    }
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