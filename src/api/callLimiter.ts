interface StringCounter {
    [key: string]: number;
  }
  
  const stringCounter: StringCounter = {};
  
  const clearStringCounter = (): void => {
    Object.keys(stringCounter).forEach(key => delete stringCounter[key]);
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


export const callLimiter = (
  ocrText: string,
  counter: number,
  callback: (result: string | null) => void 
): void => {
  if (stringCounter[ocrText]) {
    stringCounter[ocrText]++;
    if (stringCounter[ocrText] === counter) {
      
      clearStringCounter();
      callback(ocrText); 
    }
  } else {
    stringCounter[ocrText] = 1;
  }
};
