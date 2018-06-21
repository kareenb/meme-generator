'use strict';

console.log('meme generator');

var gId = 0;
var gImgs = [
    // { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
];

function createImgs() {
    var imgInfo = {};
    while (gId < 25) {
        imgInfo = {id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`};
        gImgs.push(imgInfo);
    }
}

var gMeme = {
    // selectedImgId: 0,
    txts: [
        { line: 'Text', shadow: 'black' }
    ]
};

function getImgsForDisplay() {
    return gImgs;
}

function getCurrMeme() {
    return gMeme;
}

function updateMemeInfo(imgId) {
    gMeme.selectedImgId = imgId;
}

function updateTxt(txt) {
    gMeme.txts[0].line = txt;
}

function updateTxtColor(color) {
    gMeme.txts[0].color = color;
}

function updateTxtSize(mathExpr) {
    switch (mathExpr) {
        case 'plus':
            gMeme.txts[0].size += 1;
            break;

        case 'minus':
            gMeme.txts[0].size -= 1;
    }
}

function updateTxtFont(fontName) {
    gMeme.txts[0].font = fontName;
}

function updateTxtAlign(direction) {
    gMeme.txts[0].align = direction;
}