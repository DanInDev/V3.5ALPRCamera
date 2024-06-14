import { TextBlock} from '@DanInDev/vision-camera-ocr';
import { FilterOptions } from './filterOptions';


/* 

      Defines helper functions for text processing and filtering.

*/


/**
 * Converts a TextBlock object into a single string by concatenating all its lines.
 * 
 * @param {TextBlock} result - The TextBlock object to convert.
 * @returns {string} - The concatenated string representation of the TextBlock.
 */

export const BlockToString = (result: TextBlock): string => {
    const linesText = result.lines.map((line) => line.text).join('');
    return linesText;
  };
  

  /**
 * Sanitizes a TextBlock by removing spaces, symbols, and newline characters from its text.
 * 
 * @param {TextBlock} textblock - The TextBlock to sanitize.
 * @returns {string} - The sanitized text.
 */

  export const sanitizeTextBlock = (textblock: TextBlock): string => {
    
    const blockText = textblock.lines.map((line) => line.text).join('');
  
    // Remove spaces, symbols, and newline characters from the text
    const sanitizedText = sanitizeString(blockText);
  
    return sanitizedText;
  };
  

  /**
 * Sanitizes a string by removing spaces, symbols, and newline characters.
 * 
 * @param {string} input - The input string to sanitize.
 * @returns {string} - The sanitized string.
 */

  export const sanitizeString = (input: string): string => {
    return input.replace(/[\s\n.,\/#!$%\^&\*;:{}=`~()|[\]\-?"\\]/g, '');
  };
  

  
  /**
 * Checks if a TextBlock meets the criteria specified in the FilterOptions.
 * 
 * @param {TextBlock} block - The TextBlock to check.
 * @param {FilterOptions} options - The filter options specifying criteria.
 * @returns {boolean} - True if the TextBlock meets the criteria, otherwise false.
 */

  export const isWithinFilterOption = (
    block: TextBlock,
    options: FilterOptions,
  ): boolean => {
    
    const sanitizedText = sanitizeTextBlock(block);

    const {minLength, maxLength, pattern} = options;
  
    // Check if the text matches the regex and is within the specified character length range
    return (
      sanitizedText.length >= minLength &&
      sanitizedText.length <= maxLength &&
      pattern.test(sanitizedText)
    );
  };
  