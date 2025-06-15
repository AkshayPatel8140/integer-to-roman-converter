/**
 * Converts a number to its Roman numeral representation.
 * @param {number} num - The number to convert.
 * @returns {string} The Roman numeral representation of the number.
 */
export function toRoman(num: number): string {
    const romanNum: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];

    let result = "";

    for (const [value, numeral] of romanNum) {
        let count = Math.floor(num / value);   // Determine how many times the numeral fits into the number
        num = num % value;                     // Update the number to the remainder
        result += numeral.repeat(count);       // Append the numeral to the result the number of times it fits
    }

    return result;
}
