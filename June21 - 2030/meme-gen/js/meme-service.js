'use strict';

console.log('meme generator');

var gId = 0;
var gImgs = [
    // { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
];

function createImgs() {
    var imgInfo = {};
    while (gId < 25) {
        imgInfo = { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg` };
        gImgs.push(imgInfo);
    }
}

var gMeme = { txts: [ { line: '' } ] };

function getImgsForDisplay() {
    return gImgs;
}

function getCurrMeme() {
    return gMeme;
}

function updateMemeInfo(imgId) {
    gMeme.selectedImgId = imgId;
}

function addTxtLine() {
    gMeme.txts.push({ line: '' });
}

function updateTxt(txt, lineIdx) {
    gMeme.txts[lineIdx].line = txt;
}

function updateTxtColor(color, lineIdx) {
    gMeme.txts[lineIdx].color = color;
}

function updateTxtSize(mathExpr, lineIdx) {
    switch (mathExpr) {
        case 'plus':
            gMeme.txts[lineIdx].size += 1;
            break;

        case 'minus':
            gMeme.txts[lineIdx].size -= 1;
    }
}

function updateTxtFont(fontName, lineIdx) {
    gMeme.txts[lineIdx].font = fontName;
}

function updateTxtAlign(direction, lineIdx) {
    gMeme.txts[lineIdx].align = direction;
}

function updateTxtShadow(lineIdx) {
    if ((!gMeme.txts[lineIdx].shadow) || gMeme.txts[lineIdx].shadow === 'off') {
        gMeme.txts[lineIdx].shadow = 'on';
    } else if (gMeme.txts[lineIdx].shadow === 'on') {
        gMeme.txts[lineIdx].shadow = 'off';
    }
}