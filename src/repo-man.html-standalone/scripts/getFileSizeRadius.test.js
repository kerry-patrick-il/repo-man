import { getMaxFileAttribute } from "./getFileSizeRadius";

describe("file size logic", () => {
  describe("get max  file size", () => {
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
  });
});
