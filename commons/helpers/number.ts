/**
 * @param {number} number
 * @returns {string}
 */
export const formatToRupiah = (number: number) => {
    if (typeof number !== 'number') {
        number = parseInt(number, 10);
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * @returns {string} - The processed string with special characters replaced by hyphens
 */
export const formatToUnit = (number: number) => {
    if (number < 10000) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else if (number < 1000000) {
        let k = parseFloat((number / 1000).toString()).toFixed(1);
        if (k.toString().split('.')[1] == '0')
            k = k.toString().split('.')[0];
        return `${k} ribu`;
    } else if (number < 1000000000) {
        let mil = parseFloat((number / 1000000).toString()).toFixed(1);
        if (mil.toString().split('.')[1] == '0')
            mil = mil.toString().split('.')[0];
        return `${mil} juta`;
    } else if (number < 1000000000000) {
        let bil = parseFloat((number / 1000000000).toString()).toFixed(1);
        if (bil.toString().split('.')[1] == '0')
            bil = bil.toString().split('.')[0];
        return `${bil} miliar`;
    } else if (number < 1000000000000000) {
        let tril = parseFloat((number / 1000000000000).toString()).toFixed(1);
        if (tril.toString().split('.')[1] == '0')
            tril = tril.toString().split('.')[0];
        return `${tril} triliun`;
    }
};