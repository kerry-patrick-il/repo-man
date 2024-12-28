export function getFileExtension(fileName) {
  if (fileName.includes(".")) {
    return fileName.split(".").pop();
  }
  return fileName;
}

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
  //get three random numbers between 0 and 255 to create a color in RGB format.
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  //return the color in hexadecimal format.
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

