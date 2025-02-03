/**
 * Check array has certain value or not
 * @returns {Number}
 */

export const arrayHas = (array: Array<any> | null, offset: any): Number => {
    console.log(offset);

    if (Array.isArray(offset) && offset.length <= 0) {
        return 1;
    }

    let result = 0;

    if (Array.isArray(array) && array != null) {
        offset.forEach((item: any) => {
            if (array.indexOf(item) >= 0) {
                result++;
            }
        });
    }

    return result;
};