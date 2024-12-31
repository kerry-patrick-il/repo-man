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
      ...(repoInfo.folders?.flatMap((folder) => getMinFileAttribute(folder)) ??
        [])
    ) ?? 0
  );
}
