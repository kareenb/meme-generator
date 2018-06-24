'use strict';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function flatten(values) {
    var flatVals = values.reduce(function(acc, value) {
        if (Array.isArray(value)) {
            return acc.concat(flatten(value));
        } else acc.push(value);
        return acc;
    }, []);
    
    return flatVals;
}

function sortArr(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });
}

function deleteDoubles(arr) {
    sortArr(arr);
    var singlesArr = [];
    for (var i = 0; i < arr.length; i++) {
        var currVal = arr[i];
        if (i > 0) {
            var prevVal = arr[i - 1];
            if (currVal === prevVal) continue;
        }
        singlesArr.push(currVal);
    }
    return singlesArr;
}