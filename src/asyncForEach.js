/**
 * For each element in the `array`, await the result of calling `callback(element, index, array)`.
 *
 * @param array An array of elements to iterate over.
 * @param callback An async function to run
 *  on each element in the array.
 *
 * @returns A Promise which resolves or rejects when each callback has resolved
 *  with every array element, or one of the callbacks has rejected, respectively.
 */
export default async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item) {
      await callback(item, index, array);
    }
  }
}
