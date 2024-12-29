import { getFileExtension } from "./getFileExtension";

const colorMap = [];

export function getColorByFileExtension(file) {
  const extension = getFileExtension(file.name);
  const storedColor = colorMap.filter((c) => c.extension === extension);
  if (storedColor[0]) {
    return storedColor[0].color;
  } else {
    const newColor = getNewColor();
    colorMap.push({ extension, color: newColor });
    return newColor;
  }
}

function getNewColor() {
  // Get three random numbers between 0 and 150 to create a color in RGB format.
  // We use lower numbers because they produce darker colors.
  // This helps us to create a range of intensities.
  const r = Math.floor(Math.random() * 150);
  const g = Math.floor(Math.random() * 150);
  const b = Math.floor(Math.random() * 150);

  //return the color in hexadecimal format.
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
