export function getFileExtension(fileName) {
  if (fileName.includes(".")) {
    return fileName.split(".").pop();
  }
  return fileName;
}
