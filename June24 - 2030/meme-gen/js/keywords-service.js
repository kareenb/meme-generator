'use strict';
var gKeywords;

var KEYWORDS_KEY = 'keywords';

function initKeywords() {
    gKeywords = loadKeywords();
    if (!gKeywords || gKeywords.length === 0) {
        gKeywords = [];
        createKeyWords(gKeywords);
        saveKeywords(gKeywords);
    }
    matchKeywords();
    // renderKeywords();
}

// attach every keyword to the relevant meme templates
function matchKeywords() {
    for (var i = 0; i < gKeywords.length; i++) {
        var currKWord = gKeywords[i].keyword;
        for (var j = 0; j < gKeywords[i].imgs.length; j++) {
            var currImgId = gKeywords[i].imgs[j];
            var currImg = getImgById(currImgId);
            currImg.keywords.push(currKWord);
        }
    }
}

function getImgsByKeyword(keyword) {
    for (var i = 0; i < gKeywords.length; i++) {
        if (keyword === gKeywords[i].keyword) {
            gKeywords[i].searchCount++;
            sortKeywordsBySearchs();
            saveKeywords(gKeywords);
            return gKeywords[i].imgs;
        }
    }
}

function sortKeywordsBySearchs() {
    gKeywords.sort(function (a, b) {
        return a.searchCount - b.searchCount;
    });
}

function loadKeywords() {
    return loadFromStorage(KEYWORDS_KEY);
}

function saveKeywords(keywords) {
    saveToStorage(KEYWORDS_KEY, keywords);
}

function createKeyWords(keywords) {
    keywords.push({
        keyword: 'happy',
        imgs: [1, 2],
        searchCount: 15
    });
    keywords.push({
        keyword: 'matrix',
        imgs: [9],
        searchCount: 10
    });
    keywords.push({
        keyword: 'animal',
        imgs: [10, 15, 20],
        searchCount: 5
    });
}