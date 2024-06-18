"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLimiter = void 0;
var stringCounter = {};
var clearStringCounter = function () {
    Object.keys(stringCounter).forEach(function (key) { return delete stringCounter[key]; });
};
/**
 * callLimiter throttles calls, for example API calls, based on the frequency of occurrence of a specific string.
 * It increments a counter for each occurrence of a string, and the string has been read "counter" amount of times,
 * it triggers a callback function and clears the counter.
 *
 * @param {string} ocrText - The text recognized by OCR.
 * @param {number} counter - The threshold count for recognizing the ocrText.
 * @param {(result: string | null) => void} callback - The callback function to call when the threshold is reached.
 */
var callLimiter = function (ocrText, counter, callback) {
    if (stringCounter[ocrText]) {
        stringCounter[ocrText]++;
        if (stringCounter[ocrText] === counter) {
            clearStringCounter();
            callback(ocrText);
        }
    }
    else {
        stringCounter[ocrText] = 1;
    }
};
exports.callLimiter = callLimiter;
