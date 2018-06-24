'use strict';

var gLineIdx = 0;

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderImgIntoCanvas();
    var meme = getCurrMeme();
    meme.txts.forEach(function (txt, idx) {
        renderTxtOnCanvas(idx);
    });
}

function renderTxtOnCanvas(lineIdx) {
    var meme = getCurrMeme();
    var currLine = meme.txts[lineIdx];
    var elAddLineBtn = document.querySelector('.add-line');
    if (elAddLineBtn.classList.contains('line-added')) {
        if (meme.txts.length > 1) {
            var txts = meme.txts;
            var biggestLineHeight = -Infinity;
            txts.forEach(function (txt) {
                var txtLine = txt.line;
                if (txtLine.length > 0) {
                    if (txt.height > biggestLineHeight) biggestLineHeight = txt.height;
                } 
            });
            var newLine = meme.txts[gLineIdx];
            newLine.height = biggestLineHeight + 40;
            elAddLineBtn.classList.remove('line-added');
        }
    }
    if (!currLine.height) currLine.height = 50;

    if (currLine.shadow === 'on') {
        gCtx.shadowOffsetX = -2;
        gCtx.shadowOffsetY = -2;
        gCtx.shadowColor = '#000000';
    } else {
        gCtx.shadowOffsetX = 0;
        gCtx.shadowOffsetY = 0;
        gCtx.shadowColor = 'transparent';
    }

    var fontSizeRatio = (2 / 1000) * gElCanvas.width;
    var fontSize = currLine.size * fontSizeRatio;
    gCtx.font = `${fontSize}px "${currLine.font}"`;

    gCtx.fillStyle = currLine.color;
    if (currLine.color === gCtx.shadowColor) gCtx.shadowColor = 'gray';
    gCtx.textAlign = `${currLine.align}`;

    var txtHeightRatio = (4 / 1000) * gElCanvas.height;
    var canvasTxtY = currLine.height * txtHeightRatio;
    var canvasTxtX = alignTxtOnCanvas(currLine.align);
    if (currLine.outline === 'on') {
        gCtx.strokeStyle = (currLine.color === '#000000')? '#ffffff' : '#000000';
        gCtx.lineWidth = 3;
        gCtx.strokeText(currLine.line, canvasTxtX, canvasTxtY);
    }
    gCtx.fillText(currLine.line, canvasTxtX, canvasTxtY);
}

function addLine() {
    var meme = getCurrMeme();
    var elAddLineBtn = document.querySelector('.add-line');
    elAddLineBtn.classList.add('line-added');
    addTxtLine();
    gLineIdx = meme.txts.length - 1;
    adjustControls();
}

function deleteLine() {
    deleteTxtLine(gLineIdx);
    renderMeme();
    gLineIdx = 0;
    adjustControls();
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
    if (meme.txts[gLineIdx].shadow === 'on') elTxtShadowBtn.classList.add('btn-active');
    else elTxtShadowBtn.classList.remove('btn-active');
    renderMeme();
}

function readUserTxtOutline() {
    updateTxtOutline(gLineIdx);
    var meme = getCurrMeme();
    var elTxtOutlineBtn = document.querySelector('.txt-outline');
    if (meme.txts[gLineIdx].outline === 'on') elTxtOutlineBtn.classList.add('btn-active');
    else elTxtOutlineBtn.classList.remove('btn-active');
    renderMeme();
}

function readUserTxtAlign(direction) {
    updateTxtAlign(direction, gLineIdx);
    upadteAlignButton(direction);
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

function upadteAlignButton(direction) {
    var elAlign = document.querySelector('.dropdown-wrapper')
    var elAlignBtns = document.querySelectorAll('.dropdown-list .btn-align');
    for (var i = 0; i < elAlignBtns.length; i++) {
        if (elAlignBtns[i].value === direction) {
            elAlign.innerHTML = elAlignBtns[i].parentNode.innerHTML;
        }
    }
}

function readUserTxtHeightOnCanvas(direction) {
    var meme = getCurrMeme();
    switch (direction) {
        case 'up':
            meme.txts[gLineIdx].height -= 10;
            renderMeme();
            break;
        case 'down':
            meme.txts[gLineIdx].height += 10;
            renderMeme();
            break;
    }
}

function updateLine() {
    var deletedLines = deleteEmptyLines();
    gLineIdx -= deletedLines;
    var meme = getCurrMeme();
    var txts = meme.txts;
    if (gLineIdx === txts.length - 1) gLineIdx = 0;
    else gLineIdx += 1;
    adjustControls();
}

function adjustControls() {
    var meme = getCurrMeme();
    if (meme.txts.length === 0) {
        addLine();
        return;
    }
    var currLine = meme.txts[gLineIdx];
    document.querySelector('.user-txt-box').value = currLine.line;

    document.querySelector('.user-txt-color').value = currLine.color;
    document.querySelector('.user-txt-color').style.color = currLine.color;
    document.querySelector('.user-txt-color').style.background = currLine.color;

    var fontOpts = document.querySelectorAll('.user-txt-font option');
    for (var i = 0; i < fontOpts.length; i++) {
        if (fontOpts[i].value === currLine.font) {
            document.querySelector('.user-txt-font').options.selectedIndex = i;
            break;
        }
    }

    upadteAlignButton(currLine.align)

    var elTxtShadowBtn = document.querySelector('.txt-shadow');
    if (currLine.shadow === 'on') elTxtShadowBtn.classList.add('btn-active');
    else elTxtShadowBtn.classList.remove('btn-active');

    var elTxtOutlineBtn = document.querySelector('.txt-outline');
    if (currLine.outline === 'on') elTxtOutlineBtn.classList.add('btn-active');
    else elTxtOutlineBtn.classList.remove('btn-active');
}