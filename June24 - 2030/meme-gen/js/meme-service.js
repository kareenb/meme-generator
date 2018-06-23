'use strict';

console.log('meme generator');

var gId = 0;
var gImgs = [];

function createImgs() {
    var imgInfo = {};
    while (gId < 25) {
        imgInfo = {
            id: ++gId,
            url: `../meme-gen/img/meme-imgs/${gId}.jpg`,
            keywords: []
        };
        gImgs.push(imgInfo);
    }
}

var gMeme = { txts: [ { line: '', size: 40, font: 'Impact', color: 'white', align: 'center', shadow: 'on' } ] };

function getImgsForDisplay(Ids) {
    if (!Ids) return gImgs;
    else {
        var imgs = [];
        for (var i = 0; i < Ids.length; i++){
            for (var j = 0; j < gImgs.length; j++) {
                if (gImgs[j].id === Ids[i]) {
                    imgs.push(gImgs[j]);
                    continue;
                }
            }
        }
    }
    return imgs;
}

function getCurrMeme() {
    return gMeme;
}

function updateMemeInfo(imgId) {
    gMeme.selectedImgId = imgId;
}

function addTxtLine() {
    gMeme.txts.push({ line: '', size: 30, font: 'Impact', color: '#000000', align: 'center', shadow: 'off' });
}

function deleteTxtLine(idx) {
    gMeme.txts.splice(idx, 1);
}

function updateTxt(txt, lineIdx) {
    gMeme.txts[lineIdx].line = txt;
}

function updateTxtColor(color, lineIdx) {
    gMeme.txts[lineIdx].color = '#' + color;
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

function getImgById(imgId) {
    for (var i = 0; i < gImgs.length; i++) {
        if (gImgs[i].id === imgId) return gImgs[i];
    }
}

function downloadMeme() {
    var link = document.getElementById('download');
    var canvas = document.querySelector('canvas');
    console.log(canvas);
    
    link.href = canvas.toDataURL();
    link.download = 'meme.png';
}