import { getColorIntensityByRevisions } from "./getColorIntensityByRevisions";

describe("get color intensity by revisions", () => {
  it("should return a 2 digit hex string value", () => {
    const result = getColorIntensityByRevisions(
      { commits: 6 },
      { minInput: 0, maxInput: 10, minOutput: 100, maxOutput: 255 }
    );
    expect(result.length).toBe(2);
    const intValue = parseInt(result, 16);
    expect(intValue).toBeGreaterThan(-1);
    expect(intValue).toBeLessThan(256);
  });

  it("should return max output if the file has the max commits in the repo", () => {
    const bounds = {
      minInput: 1,
      maxInput: 10,
      minOutput: 100,
      maxOutput: 255,
    };

    const intensity = getColorIntensityByRevisions({ commits: 10 }, bounds);
    expect(intensity).toBe("ff");
  });

  it("should return min output if the file has the min commits in the repo", () => {
    const bounds = {
      minInput: 1,
      maxInput: 10,
      minOutput: 100,
      maxOutput: 255,
    };

    const intensity = getColorIntensityByRevisions({ commits: 1 }, bounds);
    expect(intensity).toBe("64");
  });

  it("should return some intensity between min and max if the file has a number of commits between min and max", () => {
    const bounds = {
      minInput: 1,
      maxInput: 10,
      minOutput: 100,
      maxOutput: 255,
    };

    const intensity = getColorIntensityByRevisions({ commits: 7 }, bounds);
    expect(intensity.length).toBe(2);
    const intValue = parseInt(intensity, 16);
    expect(intValue).toBeGreaterThan(100);
    expect(intValue).toBeLessThan(255);
  });
});
