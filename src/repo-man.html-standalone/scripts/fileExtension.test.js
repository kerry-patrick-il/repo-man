import { getColorByFileExtension, getFileExtension } from "./fileExtension";

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
    it("should return a hex color string for each file", () => {
      const file = { name: "file.txt" };
      //expect getColorByFileExtension to return a valid hex color string
      expect(getColorByFileExtension(file)).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("should return a different hex value for each file extension", () => {
      const file1 = { name: "file.txt" };
      const file2 = { name: "index.html" };

      expect(getColorByFileExtension(file1)).not.toBe(
        getColorByFileExtension(file2)
      );
    });

    it("should return the same color for the same file extension", () => {
      const file1 = { name: "file.txt" };
      const file2 = { name: "secondfile.txt" };

      expect(getColorByFileExtension(file1)).toBe(
        getColorByFileExtension(file2)
      );
    });
  });
});
