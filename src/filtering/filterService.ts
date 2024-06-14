import { OCRFrame, TextBlock } from '@DanInDev/vision-camera-ocr';
import { FilterOptions } from './filterOptions';
import { BlockToString, isWithinFilterOption, sanitizeString } from './filterHelper';
import { filterMap } from './filterMap';

/* 

      Defines main filter functions for processing OCR frames.

*/


/**
 * Finds the TextBlock with the highest X coordinate in the OCRFrame.
 * 
 * @param {TextBlock[]} blocks - The array of TextBlocks to search.
 * @returns {TextBlock | null} - The TextBlock with the highest X coordinate, or null if no blocks are provided.
 * 
 * @NOTE Since camera stream is mirrored and flipped, highest X in this case is the point
 *       closest to the bottom of the screen when in portrait mode.
 */

const findBlockWithHighestX = (
  blocks: TextBlock[],
): TextBlock | null => {
  let highestX: number = 0;
  let blockWithHighestX: TextBlock | null = null;

  blocks.forEach(block => {
    if (block.frame!.boundingCenterX > highestX) {
      highestX = block.frame!.boundingCenterX;
      blockWithHighestX = block;
    }
  });

  // Return the block with the highest x value
  return blockWithHighestX;
};

/**
 * Filters OCRFrame results with multiple filter options.
 * 
 * @param {OCRFrame} result - The OCRFrame to filter. @OCRFrame is the object returned from the vision-camera-ocr library when using SCANOCR(frame)
 * @param {FilterOptions[]} optionsList - The list of filter options to apply.
 * @returns {TextBlock[] | null} - The filtered TextBlocks, or null if no blocks pass any filters.
 */

const filterWithMultipleOptions = (
  result: OCRFrame,
  options: FilterOptions[] | FilterOptions,
): TextBlock[] | null => {
  const optionsList = Array.isArray(options) ? options : [options];

  // Define the blocks that pass through the filter
  const filteredBlocks: TextBlock[] = [];

  // Loop through all blocks
  for (const block of result.result.blocks) {
    // Loop through all filter options
    for (const option of optionsList) {
      if (isWithinFilterOption(block, option)) {
        filteredBlocks.push(block); // Keep the block in the result
        break; // Break the option loop if it is within a filter
      }
    }
  }

  // Check if there are any filtered blocks
  if (filteredBlocks.length > 0) {
    return filteredBlocks;
  } else {
    return null;
  }
};

/**
 * Applies the current filter to an OCRFrame, checks if there is multiple license plates,
 * which returns the sanitized license plate closest to the bottom of the screen.
 * 
 * @param {OCRFrame} ocrFrame - The OCRFrame to apply the filter to.
 * @param {string} activeFilter - The currently active filter name.
 * @returns {string | null} - The sanitized recognized text, or null if no text is recognized.
 */
export function applyFilterFunctions(
  ocrFrame: OCRFrame,
  activeFilter: string
): string | null {

  // Get the filter function from the map
  const filterAsArray = filterMap.get(activeFilter);

  if (!filterAsArray) {
    console.error('Filter not found in map: ', activeFilter);
    return null;
  }

  // Iterate through each filter option
  for (const filterName of Array.isArray(filterAsArray) ? filterAsArray : [filterAsArray]) {

    // Extract the name property from the filter options
    const { name } = filterName;
    console.log ('Filtering with: ' + name)

    // Filter the OCR frame with the specified filter
    const filteredResults = filterWithMultipleOptions(ocrFrame, filterAsArray);

    // Check if there are any filtered results
    if (filteredResults !== null) {
      // Check if there is only one filtered result
      if (filteredResults.length === 1) {
        const recognizedText = filteredResults[0] ? BlockToString(filteredResults[0]) : '';
        return sanitizeString(recognizedText);
      } else {
        // If there are multiple filtered results, return the one with the highest X coordinate
        const lowestBlock = findBlockWithHighestX(filteredResults);
        const recognizedText = lowestBlock ? BlockToString(lowestBlock) : '';
        return sanitizeString(recognizedText);
      }
    }
  }

  return null;
}

// Conditional exports for testing
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    applyFilterFunctions,
    findBlockWithHighestX,
    filterWithMultipleOptions,
  };
}
