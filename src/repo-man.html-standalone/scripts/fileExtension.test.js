import { getFileExtension } from "./fileExtension";

describe("file extension", () => {
  it("should return the last segment of the file", () => {
    expect(getFileExtension("example.txt")).toBe("txt");
  });
});
