// Helper function to compare two objects 
function compare(object1, object2) {
  return isNaN(object1) || isNaN(object2) ? String(object1).localeCompare(String(object2)) : (object1 - object2);
}

// Default object transform. Do nothing
function defaultTransform(object) {
  return object;
}

/**
 * Sorts a shallow copy of an array based on property name. 
 * This function does not create copies of member objects in the array.
 * @param {*} array array to sort
 * @param {*} propertyName property name
 * @param {*} transform transformation method for property used in comparison
 * @param {*} reverse sorts in ascending order if true, sort in descending order otherwise
 * @returns sorted shallow copy of the array
 */
function sortByProperty(array, propertyName, transform = defaultTransform, reverse = false) {
  const sortedArray = [...array];

  // Perform the sort operation
  sortedArray.sort((object1, object2) =>
    reverse ? compare(transform(object2[propertyName]), transform(object1[propertyName]))
      : compare(transform(object1[propertyName]), transform(object2[propertyName])));

  return sortedArray;
}

export default sortByProperty;