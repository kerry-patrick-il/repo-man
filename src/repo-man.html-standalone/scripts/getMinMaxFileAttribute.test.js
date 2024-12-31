import {
  getMaxFileAttribute,
  getMinFileAttribute,
} from "./getMinMaxFileAttribute";

describe("get max file size (default attribute)", () => {
  it("should return 0 for an empty repoInfo", () => {
    const repoInfo = {};
    expect(getMaxFileAttribute(repoInfo)).toBe(0);
  });

  it("should return the max file size from the files", () => {
    const repoInfo = {
      files: [{ size: 100 }, { size: 200 }, { size: 150 }],
    };

    expect(getMaxFileAttribute(repoInfo)).toBe(200);
  });

  it("should return the max file size from the folders if greater than the files", () => {
    const repoInfo = {
      files: [{ size: 100 }, { size: 130 }, { size: 110 }],
      folders: [{ files: [{ size: 400 }, { size: 200 }] }],
    };
    expect(getMaxFileAttribute(repoInfo)).toBe(400);
  });

  it("should return the max of some other attribute if requested", () => {
    const repoInfo = {
      files: [{ commits: 20 }, { commits: 25 }],
      folders: [
        { files: [{ commits: 30 }, { commits: 18 }] },
        { files: [{ commits: 27 }] },
      ],
    };

    const result = getMaxFileAttribute(repoInfo, "commits");
    expect(result).toBe(30);
  });
});

describe("get min file size (default attribute)", () => {
  it("should return 0 for an empty repoInfo", () => {
    const repoInfo = {};
    expect(getMinFileAttribute(repoInfo)).toBe(0);
  });

  it("should return the min file size from the files", () => {
    const repoInfo = {
      files: [{ size: 100 }, { size: 200 }, { size: 150 }],
    };

    expect(getMinFileAttribute(repoInfo)).toBe(100);
  });

  it("should return the min file size from the folders if lesser than the files", () => {
    const repoInfo = {
      files: [{ size: 100 }, { size: 130 }, { size: 110 }],
      folders: [{ files: [{ size: 40 }, { size: 20 }] }],
    };
    expect(getMinFileAttribute(repoInfo)).toBe(20);
  });

  it("should return the min of some other attribute if requested", () => {
    const repoInfo = {
      files: [{ commits: 20 }, { commits: 25 }],
      folders: [
        { files: [{ commits: 30 }, { commits: 18 }] },
        { files: [{ commits: 27 }] },
      ],
    };

    const result = getMinFileAttribute(repoInfo, "commits");
    expect(result).toBe(18);
  });
});
