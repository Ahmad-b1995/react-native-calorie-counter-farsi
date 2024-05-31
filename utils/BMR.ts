/**
 * This is a function to calculate Basal Metabolic Rate (BMR).
 *
 * @param {number} weight - Weight in kilograms.
 * @param {number} height - Height in centimeters.
 * @param {number} age - Age in years.
 * @returns {number} The calculated BMR.
 */
export function calculateBMR(
  weight: number,
  height: number,
  age: number
): number {
  return Math.floor(10 * weight + 6.25 * height - 5 * age + 5);
}
