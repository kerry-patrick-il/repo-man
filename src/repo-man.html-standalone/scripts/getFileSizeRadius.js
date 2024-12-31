import repoInfo from "../data/repo-data";
import {
  getMaxFileAttribute,
  getMinFileAttribute,
} from "./getMinMaxFileAttribute";

const maxFileSize = getMaxFileAttribute(repoInfo);
const minFileSize = getMinFileAttribute(repoInfo);

const minRSquared = 144;
const maxRSquared = 10000;

export function getFileSizeRadius(
  file,
  bounds = {
    minInput: minFileSize,
    maxInput: maxFileSize,
    minOutput: minRSquared,
    maxOutput: maxRSquared,
  }
) {
  if (bounds.minInput === bounds.maxInput) {
    return Math.sqrt(bounds.minOutput);
  }
  const rSquared =
    (file.size * (bounds.maxOutput - bounds.minOutput)) /
      (bounds.maxInput - bounds.minInput) +
    bounds.minOutput;
  return Math.sqrt(rSquared);
}
