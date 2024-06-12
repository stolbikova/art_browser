// Define the supported countries as a constant array
const supportedCountries = [
  "Germany",
  "France",
  "The Netherlands",
  "Poland",
] as const;

// Define the CountryCode type, restricting it to one of the supported countries
export type CountryCode = (typeof supportedCountries)[number];

// Function to fetch the list of supported countries
export const getSupportedCountries = (): CountryCode[] => {
  return [...supportedCountries];
};

// Function to check if a string is one of the supported countries
export const isSupportedCountry = (country: string): country is CountryCode => {
  return supportedCountries.includes(country as CountryCode);
};
