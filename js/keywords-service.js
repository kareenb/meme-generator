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

function getImgsByKeyword(searchVal) {
    var searchValRegex = new RegExp(searchVal, 'gi');
    var resImgs = [];
    for (var i = 0; i < gKeywords.length; i++) {
        var keyword = gKeywords[i].keyword;
        var keywordFound = keyword.match(searchValRegex);
        if (searchVal === gKeywords[i].keyword) {
            if (searchVal === '') {
                return gKeywords[i].imgs;
            } else {
                gKeywords[i].searchCount++;
                sortKeywordsBySearchs();
                saveKeywords(gKeywords);
                return gKeywords[i].imgs;
            }
        } else if (keywordFound) {
            resImgs.push(gKeywords[i].imgs);
            resImgs = flatten(resImgs);
        }
    }
    if (resImgs.length === 0) return 'not found';
    else return resImgs = deleteDoubles(resImgs);
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
        keyword: '',
        imgs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        searchCount: 0
    });
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
    keywords.push({
        keyword: 'baby',
        imgs: [5, 7, 9, 15],
        searchCount: 60
    });
    keywords.push({
        keyword: 'sleep',
        imgs: [6, 7],
        searchCount: 38
    });
}