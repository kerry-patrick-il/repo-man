import { svgNamespace } from "./common/constants";
import { getColorByFileExtension } from "./getColorByFileExtension";
import { getFileSizeRadius } from "./getFileSizeRadius";
import { getColorIntensityByFile } from "./getColorIntensityByFile";

let id = 0;

function getRadius(file) {
  return getFileSizeRadius(file);
}

function getColor(file) {
  const colorBase = getColorByFileExtension(file);
  const intensity = getColorIntensityByFile(file);
  return `${colorBase}${intensity}`;
}

function createFile(file, id, startingX, startingY) {
  const radius = getRadius(file);

  const fileG = document.createElementNS(svgNamespace, "g");
  fileG.setAttribute("class", "file");

  const path = document.createElementNS(svgNamespace, "path");
  const idString = `file_${id.toString(16)}`;
  path.setAttribute("id", idString);
  path.setAttribute("fill", getColor(file));
  path.setAttribute(
    "d",
    `M ${startingX} ${radius} A ${radius} ${radius} 0 1 1 ${startingX} ${
      radius + 1
    }`
  );

  fileG.appendChild(path);

  const text = document.createElementNS(svgNamespace, "text");
  const textPath = document.createElementNS(svgNamespace, "textPath");
  textPath.setAttribute("href", `#${idString}`);
  textPath.innerHTML = file.name;
  text.appendChild(textPath);

  fileG.appendChild(text);
  const newStartingX = startingX + radius * 2 + 10;
  const maxY = startingY + radius * 2 + 10;

  return { fileG, newStartingX, maxY };
}

export function writeFiles(files, g, startingX, startingY) {
  let maxX = startingX;
  let rowMaxY = startingY;

  for (const file of files) {
    id += 1;

    const { fileG, newStartingX, maxY } = createFile(
      file,
      id,
      startingX,
      startingY
    );

    startingX = newStartingX;
    rowMaxY = Math.max(rowMaxY, maxY);

    g.appendChild(fileG);
  }

  maxX = startingX;

  return { maxX, rowMaxY };
}

export function createFolder(folder, g, startingX, rowMaxY) {
  const folderG = document.createElementNS(svgNamespace, "g");
  folderG.setAttribute("transform", `translate(${startingX}, ${rowMaxY + 10})`);
  g.appendChild(folderG);

  const folderResult = writeFiles(folder.files, folderG, 10, 0);

  for (const subfolder of folder.folders ?? []) {
    const subfolderResult = createFolder(
      subfolder,
      folderG,
      10,
      folderResult.rowMaxY + 10
    );
    folderResult.maxX = Math.max(folderResult.maxX, subfolderResult.maxX);
    folderResult.rowMaxY += subfolderResult.rowMaxY;
  }

  const rect = document.createElementNS(svgNamespace, "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", -10);
  rect.setAttribute("width", folderResult.maxX);
  rect.setAttribute("height", folderResult.rowMaxY + 10);
  rect.setAttribute("fill", "none");
  rect.setAttribute("stroke", "black");

  folderG.appendChild(rect);

  const text = document.createElementNS(svgNamespace, "text");
  text.innerHTML = folder.name;
  text.setAttribute("fill", "black");
  text.setAttribute("transform", `translate(0, -12)`);
  folderG.appendChild(text);

  return {
    maxX: folderResult.maxX + startingX + 10,
    rowMaxY: folderResult.rowMaxY + 10 + 20,
  };
}

export function createRepoLevelElement() {
  const g = document.createElementNS(svgNamespace, "g");
  g.setAttribute("transform", "translate(10, 10)");
  g.setAttribute("id", "top-level");
  return g;
}
