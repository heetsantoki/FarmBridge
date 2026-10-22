type ClassValue = string | boolean | null | undefined | Record<string, boolean>;

/**
 * A utility function to merge and conditionally apply Tailwind CSS classes.
 * @param {...ClassValue[]} inputs - Class names or conditions.
 * @returns {string} - A string of merged class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return inputs
    .flat()
    .map((input) => {
      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return input;
    })
    .filter((x) => typeof x === "string" && x.trim() !== "")
    .join(" ");
};