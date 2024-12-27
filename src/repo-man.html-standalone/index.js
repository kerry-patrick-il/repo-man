import repoInfo from "./data/repo-data";
import { svgNamespace } from "./scripts/constants";
import { createFolder, writeFiles } from "./scripts/filesAndFolders";



window.addEventListener("load", () => {
  const svg = document.getElementById("repoView");

  const g = document.createElementNS(svgNamespace, "g");
  g.setAttribute("transform", "translate(10, 10)");
  g.setAttribute("id", "top-level");
  svg.appendChild(g);

  let startingX = 0;
  let startingY = 0;

  const fileResult = writeFiles(repoInfo.files, g, startingX, startingY);

  let maxX = fileResult.maxX;
  let rowMaxY = fileResult.rowMaxY;

  for (const folder of repoInfo.folders) {
    const folderResult = createFolder(folder, g, startingX, rowMaxY);
    maxX = Math.max(maxX, folderResult.maxX);
    rowMaxY += folderResult.rowMaxY;
  }

  svg.setAttribute("width", maxX + 10);
  svg.setAttribute("height", rowMaxY);
});
