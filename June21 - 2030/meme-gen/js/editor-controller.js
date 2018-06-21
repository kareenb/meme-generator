'use strict';

var gLineIdx = 0;

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderImgIntoCanvas();
    var meme = getCurrMeme();
    meme.txts.forEach(function(txt, idx) {
        renderTxtOnCanvas(idx);
    });
}

function renderTxtOnCanvas(lineIdx) {
    var meme = getCurrMeme();
    var currLine = meme.txts[lineIdx];
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

function addLine() {
    addTxtLine();
    var meme = getCurrMeme();
    gLineIdx = meme.txts.length - 1;
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

function readUserTxtHeightOnCanvas(direction) {
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