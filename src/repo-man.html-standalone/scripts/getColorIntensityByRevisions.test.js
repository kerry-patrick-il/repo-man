import { getColorIntensityByRevisions } from "./getColorIntensityByRevisions";

describe("get color intensity by revisions", () => {
  it("should return a 2 digit hex string value", () => {
    const result = getColorIntensityByRevisions(
      { commits: 6 },
      { minInput: 0, maxInput: 10, minOutput: 100, maxOutput: 255 }
    );
    expect(result.length).toBe(2);
    //cast the string to an integer
    const intValue = parseInt(result, 16);
    expect(intValue).toBeGreaterThan(-1);
    expect(intValue).toBeLessThan(256);
  });

  it("should return 255 if the file has the max commits in the repo", () => {
    const bounds = {
      minInput: 1,
      maxInput: 10,
      minOutput: 100,
      maxOutput: 255,
    };

    const intensity = getColorIntensityByRevisions({ commits: 10 }, bounds);
    expect(intensity).toBe("ff");
  });
});
