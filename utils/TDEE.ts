/**
 * Calculate the Total Daily Energy Expenditure (TDEE) based on activity level.
 *
 * @param {number} bmr - Basal Metabolic Rate.
 * @param {"sedentary" | "light" | "moderate" | "very active" | "extra active"} activityLevel - Activity level.
 * @returns {number} - The calculated TDEE.
 */
export function calculateTDEE(
  bmr: number,
  activityLevel:
    | "sedentary"
    | "light"
    | "moderate"
    | "very active"
    | "extra active"
): number {
  let multiplier: number;

  switch (activityLevel) {
    case "sedentary":
      multiplier = 1.15;
      break;
    case "light":
      multiplier = 1.2; // Using the lower bound for light activity
      break;
    case "moderate":
      multiplier = 1.4; // Using the lower bound for moderate activity
      break;
    case "very active":
      multiplier = 1.6; // Using the lower bound for very active
      break;
    case "extra active":
      multiplier = 1.8; // Using the lower bound for extra active
      break;
    default:
      throw new Error("Invalid activity level");
  }

  return bmr * multiplier;
}
