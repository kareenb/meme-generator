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
                selectedImgId: 5,
                txts: [
                        { line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }
                    ] 
            };

function updateTxt(txt) {
    gMeme.txts[0].line = txt;
}

function updateMemeInfo(imgId) {
    gMeme.selectedImgId = imgId;
}