import repoInfo from "../data/repo-data";

const maxFileSize = getMaxFileAttribute(repoInfo);
const minFileSize = getMinFileAttribute(repoInfo);

export function getMaxFileAttribute(repoInfo, attrib = "size") {
  return Math.max(
    0,
    ...(repoInfo.files?.map((f) => f[attrib]) ?? []),
    ...(repoInfo.folders?.flatMap((folder) => getMaxFileAttribute(folder)) ??
      [])
  );
}

export function getMinFileAttribute(repoInfo, attrib = "size") {
  return (
    Math.min(
      ...(repoInfo.files?.map((f) => f[attrib]) ?? []),
      ...(repoInfo.folders?.flatMap((folder) => getMaxFileAttribute(folder)) ??
        [])
    ) ?? 0
  );
}

const minRSquared = 144;
const maxRSquared = 10000;

export function getFileSizeRadius(file) {
  if (minFileSize === maxFileSize) return 0;
  const rSquared =
    (file.size * (maxRSquared - minRSquared)) / (maxFileSize - minFileSize) +
    minRSquared;
  return Math.sqrt(rSquared);
}
