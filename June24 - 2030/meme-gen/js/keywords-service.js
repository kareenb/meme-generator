'use strict';
var gKeywords;

var KEYWORDS_KEY = 'keywords';

function initKeywords() {
    gKeywords = loadKeywords();
    if (!gKeywords || gKeywords.length === 0) {
        gKeywords = [];
        createKeyWords(gKeywords);
        sortKeywordsBySearchs();
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
        return b.searchCount - a.searchCount;
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
        imgs: [2, 9, 13, 17, 22],
        searchCount: 15
    });
    keywords.push({
        keyword: 'matrix',
        imgs: [1],
        searchCount: 10
    });
    keywords.push({
        keyword: 'animal',
        imgs: [4, 6, 7, 16],
        searchCount: 5
    });
    keywords.push({
        keyword: 'movie',
        imgs: [1, 2, 8, 11, 20, 23, 25],
        searchCount: 28
    });
    keywords.push({
        keyword: 'trump',
        imgs: [3, 14],
        searchCount: 300
    });
}