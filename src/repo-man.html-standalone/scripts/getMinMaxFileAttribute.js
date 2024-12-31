export function getMaxFileAttribute(repoInfo, attrib = "size") {
  return Math.max(
    0,
    ...(repoInfo.files?.map((f) => f[attrib]) ?? []),
    ...(repoInfo.folders?.flatMap((folder) =>
      getMaxFileAttribute(folder, attrib)
    ) ?? [])
  );
}

export function getMinFileAttribute(repoInfo, attrib = "size") {
  const attribValues = [
    ...(repoInfo.files?.map((f) => f[attrib]) ?? [Infinity]),
    ...(repoInfo.folders?.flatMap((folder) =>
      getMinFileAttribute(folder, attrib)
    ) ?? [Infinity]),
  ].filter((x) => !isNaN(x) && isFinite(x));

  const result = attribValues.length > 0 ? Math.min(...attribValues) : 0;

  return result;
}
