export function getFileExtension(fileName) {
  if (fileName.includes(".")) {
    return fileName.split(".").pop();
  }
  return fileName;
}

export function getColorByFileExtension(file) {
  return "blue";
}

