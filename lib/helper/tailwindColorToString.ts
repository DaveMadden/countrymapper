//export a function that takes in a tailwind color and strips the leading 'bg-' or 'text-' and returns the color value
export const tailwindColorToString = (color: string) => {
  if (color.startsWith("bg-") || color.startsWith("text-")) {
    return color.split("-")[1];
  }
  return color;
};
