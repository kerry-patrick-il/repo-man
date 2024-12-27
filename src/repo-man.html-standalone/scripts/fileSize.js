import repoInfo from "../data/repo-data";

const maxFileSize = getMaxFileSize(repoInfo);
const minFileSize = getMinFileSize(repoInfo);
const minRSquared = 144;
const maxRSquared = 10000;

export function getMaxFileSize(repoInfo) {
  return Math.max(
    0,
    ...(repoInfo.files?.map((f) => f.size) ?? []),
    ...(repoInfo.folders?.flatMap((folder) => getMaxFileSize(folder)) ?? [])
  );
}

export function getMinFileSize(repoInfo) {
  return (
    Math.min(
      ...(repoInfo.files?.map((f) => f.size) ?? []),
      ...(repoInfo.folders?.flatMap((folder) => getMaxFileSize(folder)) ?? [])
    ) ?? 0
  );
}

export function getFileSizeRadius(file) {
  if (minFileSize === maxFileSize) return 0;
  const rSquared =
    (file.size * (maxRSquared - minRSquared)) / (maxFileSize - minFileSize) +
    minRSquared;
  return Math.sqrt(rSquared);
}
