import { getFileExtension } from "./fileExtension";

describe("file extension logic", () => {
  describe("getFileExtension", () => {
    it("should return the last segment of the file", () => {
      expect(getFileExtension("example.txt")).toBe("txt");
    });

    it("should return everything but the period for gitignore", () => {
      expect(getFileExtension(".gitignore")).toBe("gitignore");
    });

    it("should return the whole file name if there's no period", () => {
      expect(getFileExtension("example")).toBe("example");
    });

    it("should handle multiple periods in the file name", () => {
      expect(getFileExtension("get.me.the.extension.txt")).toBe("txt");
    });
  });

  describe("getColorByFileExtension", () => {
    it("should return a color based on a file extension", () => {});
  });
});
