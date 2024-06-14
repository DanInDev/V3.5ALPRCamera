import { FilterOptions, DK, GENERAL } from "./filterOptions";

/**
 * Map to store filter options arrays with their respective names as keys.
 * @param Key: String, the filter name
 * @param Value: Single or Array of filter options
 */
export const filterMap: Map<string, FilterOptions[]| FilterOptions> = new Map();

// Add default filter functions to the map
filterMap.set('DK', DK);
filterMap.set('GENERAL', GENERAL);

/**
 * Adds a new filter function to the map.
 * 
 * @param filterName The name and key of the filter.
 * @param filterOptions The filter options to add.
 */
export function addFilterToMap(filterName: string, filterOptions: FilterOptions[] | FilterOptions) {
  try {
    filterMap.set(filterName, filterOptions);
    console.log('Added filter to map: ', filterName, filterOptions)
  } catch (error) {
    console.error('Error adding filter to map: ', error)
  }
}


/**
 * Removes a filter function from the map from a key.
 * 
 * @param filterName The name and key of the filter.
 */
export function removeFilterFromMap(filterName: string) {
  try {
    filterMap.delete(filterName);
    console.log('Removing filter from map: ', filterName)
  } catch (error) {
    console.error('Error removing filter from map: ', error)
  }
}
