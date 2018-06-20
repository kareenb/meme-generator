'use strict';

console.log('meme generator');

var gId = 0;
var gImgs = [
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] },
    { id: ++gId, url: `../meme-imgs/${gId}.jpg`, keywords: ['happy'] }
];


var gMeme = {
                selectedImgId: 5, // TODO: Delete?
                txts: [
                        { line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }
                    ] 
            };

function updateTxt(txt) {
    gMeme.txts[0].line = txt;
}