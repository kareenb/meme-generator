'use strict';

console.log('meme generator');

var gId = 0;
var gImgs = [
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-gen/meme-imgs/${gId}.jpg`, keywords: ['happy'] }
];


var gMeme = {
                selectedImgId: 0,
                txts: [
                        { line: 'Text', size: 1, align: 'center', color: 'white', shadow: 'black' }
                    ] 
            };
            
function updateTxt(txt) {
    gMeme.txts[0].line = txt;
}

function updateMemeInfo(imgId) {
    gMeme.selectedImgId = imgId;
}