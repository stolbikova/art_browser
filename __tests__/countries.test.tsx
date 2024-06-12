import {
  getSupportedCountries,
  isSupportedCountry,
  CountryCode,
} from "../src/utils/countries";

describe("countries utility functions", () => {
  test("getSupportedCountries returns all supported countries", () => {
    const expectedCountries: CountryCode[] = [
      "Germany",
      "France",
      "The Netherlands",
      "Poland",
    ];
    const supportedCountries = getSupportedCountries();
    expect(supportedCountries).toEqual(expectedCountries);
  });

  test("isSupportedCountry correctly identifies supported countries", () => {
    expect(isSupportedCountry("Germany")).toBe(true);
    expect(isSupportedCountry("France")).toBe(true);
    expect(isSupportedCountry("The Netherlands")).toBe(true);
    expect(isSupportedCountry("Poland")).toBe(true);
  });

  test("isSupportedCountry correctly identifies unsupported countries", () => {
    expect(isSupportedCountry("Spain")).toBe(false);
    expect(isSupportedCountry("Italy")).toBe(false);
    expect(isSupportedCountry("USA")).toBe(false);
  });

  test("CountryCode type restricts values to supported countries", () => {
    const testCountry = (country: CountryCode) => {
      return country;
    };

    expect(testCountry("Germany")).toBe("Germany");
    expect(testCountry("France")).toBe("France");
    expect(testCountry("The Netherlands")).toBe("The Netherlands");
    expect(testCountry("Poland")).toBe("Poland");
  });
});
