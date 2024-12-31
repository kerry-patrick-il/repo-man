import { getFileSizeRadius } from "./getFileSizeRadius";

describe("file size logic", () => {
  it("should return sqrt of minOutput if min and max file sizes are identical", () => {
    const bounds = {
      minInput: 10,
      maxInput: 10,
      minOutput: 100,
      maxOutput: 10000,
    };
    const result = getFileSizeRadius({ size: 10 }, bounds);

    expect(result).toBe(10);
  });

  it("should return a value between the sqrts of the min and max outputs", () => {
    const bounds = {
      minInput: 1,
      maxInput: 10,
      minOutput: 9,
      maxOutput: 16,
    };
    const result = getFileSizeRadius({ size: 6 }, bounds);
    expect(result).toBeGreaterThan(3);
    expect(result).toBeLessThan(4);
  });
});
