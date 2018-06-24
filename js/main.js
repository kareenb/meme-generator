'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');

function initPage() {
    createImgs();
    renderImgGallery();
    initKeywords();
    renderKeywordsDisplay();
    renderSearchList();
}

function renderImgGallery(imgs) {
    var elNoRes = document.querySelector('div.no-result');
    elNoRes.innerHTML = '';
    var strHTML = '';
    var elGallery = document.querySelector('.gallery');
    if (!imgs) imgs = getImgsForDisplay();
    imgs.forEach(function (img) {
        strHTML += `<li class="hex">
                        <div class="hexIn">
                            <div class="hexInner">
                                <img class="gallery-img img-${img.id}" src="${img.url}" onclick="readUserSelectedImg(${img.id}); toggleSections()" />
                            </div>
                        </div>
                    </li>`;
    });

    elGallery.innerHTML = strHTML;
}

function readUserSelectedImg(imgId) {
    updateMemeInfo(imgId);
    renderMeme();
    adjustControls();
}

function renderImgIntoCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    
    var image = getCurrMeme().image;
    var ratio = image.naturalHeight / image.naturalWidth;
    gElCanvas.width = document.querySelector('.meme-canvas').clientWidth - 30;
    gElCanvas.height = gElCanvas.width * ratio;

    var divHeight = document.querySelector('.meme-canvas').clientHeight - 5;
    if (gElCanvas.height > divHeight) {
        gElCanvas.height = divHeight;
        gElCanvas.width = (image.naturalWidth / image.naturalHeight) * gElCanvas.height;
    }

    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderImgIntoCanvas, updateMemeInfo);
    toggleSections();
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
    var elMemeEditor = document.querySelector('.meme-editor-wrapper');
    elMemeEditor.classList.toggle('meme-editor-wrapper-open');
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
    var numOfDisplayKeywords = (keywords.length < 7) ? keywords.length : 7;
    var displayKeywords = [];
    var fontSizeRatios = getFontSizeRatios(keywords, numOfDisplayKeywords);

    for (var i = 0; i < numOfDisplayKeywords; i++) {
        var keyword = keywords[i];
        strHTML = `<span style="font-size: ${fontSizeRatios.shift()}em;" onclick="searchImgs('${keyword.keyword}')">
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

function getFontSizeRatios(keywords, numOfDispKeywords) {
    var prevSearchCount = keywords[0].searchCount
    var fontSizeRatio = 4;
    var fontSizeRatios = [];
    for (var i = 0; i < numOfDispKeywords; i++) {
        var currKeyword = keywords[i];
        if (currKeyword.searchCount === prevSearchCount) fontSizeRatios.push(fontSizeRatio);
        else {
            fontSizeRatio -= 0.5;
            fontSizeRatios.push(fontSizeRatio);
        }
    }
    return fontSizeRatios;
}

function renderSearchList() {
    var keywords = loadKeywords();
    var elDataList = document.querySelector('.search-keywords datalist');
    var strHTML = '';
    keywords.forEach(function (keyword) {
        strHTML += `<option value = "${keyword.keyword}">`;
    })
    elDataList.innerHTML = strHTML;
}

function searchImgs(searchVal) {
    var elNoRes = document.querySelector('div.no-result');
    var imgs = (getImgsByKeyword(searchVal));
    if (imgs === 'not found') {
        elNoRes.innerHTML = `<img class="no-result" src="img/no-result.png" />`;
        var elGallery = document.querySelector('.gallery');
        elGallery.innerHTML = ''
    } else {
        elNoRes.innerHTML = '';
        renderImgGallery(getImgsForDisplay(imgs));
    }
}

function sendUserMsg() {
    var userName = document.querySelector('.contact .user-name').value;
    var msgSubj = document.querySelector('.contact .msg-subj').value;
    var msgBody = document.querySelector('.contact textarea').value;
    msgBody += `
                From: ${userName}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=kareenb89@gmail.com&su=${msgSubj}&body=${msgBody}`, '_blank');
}

function smoothScroll(sectionId, ev) {
    ev.preventDefault();
    var elSection = document.getElementById(sectionId);
    elSection.scrollIntoView({ behavior: 'smooth' });
}

function toggleDropdown() {
    // TODO: Make the function generic
    var elDropdown = document.querySelector('.dropdown-list');
    elDropdown.classList.toggle('open-dropdown');
}