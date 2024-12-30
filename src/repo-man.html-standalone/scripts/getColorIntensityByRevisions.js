export function getColorIntensityByRevisions(file, bounds) {
  let result = bounds.maxOutput;
  const commits = file.commits;
  if (commits >= bounds.maxInput) {
    result = bounds.maxOutput;
  } else if (commits <= bounds.minInput) {
    result = bounds.minOutput;
  } else {
    result =
      ((commits - bounds.minInput) / (bounds.maxInput - bounds.minInput)) *
        (bounds.maxOutput - bounds.minOutput) +
      bounds.minOutput;
  }

  return result.toString(16).padStart(2, "0");
  
}
