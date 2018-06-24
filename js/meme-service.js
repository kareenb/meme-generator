'use strict';

console.log('meme generator');

var gId = 0;
var gImgs = [];
var gMeme = { txts: [ { line: 'Add your text', size: 40, font: 'Impact', color: '#ffffff', align: 'center', outline: 'on' } ], image: null };

function createImgs() {
    var imgInfo = {};
    while (gId < 25) {
        imgInfo = {
            id: ++gId,
            url: `img/meme-imgs/${gId}.jpg`,
            keywords: []
        };
        gImgs.push(imgInfo);
    }
}

function getImgsForDisplay(ids) {
    if (!ids) return gImgs;
    else {
        var imgs = [];
        for (var i = 0; i < ids.length; i++){
            for (var j = 0; j < gImgs.length; j++) {
                if (gImgs[j].id === ids[i]) {
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

function updateMemeInfo(imgId, img) {
    if (imgId) {
        gMeme.selectedImgId = imgId;
        var selectedImg = getImgById(imgId);
        gMeme.image = new Image(0, 0);
        gMeme.image.src = selectedImg.url;
    } else {
        gMeme.image = img;
    }
}

function addTxtLine() {
    gMeme.txts.push({ line: 'Add your text', size: 40, font: 'Impact', color: '#ffffff', align: 'center', outline: 'on' });
}

function deleteTxtLine(idx) {
    return gMeme.txts.splice(idx, 1);
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

function updateTxtOutline(lineIdx) {
    if ((!gMeme.txts[lineIdx].outline) || gMeme.txts[lineIdx].outline === 'off') {
        gMeme.txts[lineIdx].outline = 'on';
    } else if (gMeme.txts[lineIdx].outline === 'on') {
        gMeme.txts[lineIdx].outline = 'off';
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