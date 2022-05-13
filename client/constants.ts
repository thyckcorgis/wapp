import Constants from "expo-constants";

export const API_URL = Constants.manifest.extra.apiUrl;

export const defaultCups = [
  {
    name: "Small cup",
    size: 250,
  },
  {
    name: "Large glass",
    size: 500,
  },
  {
    name: "Water bottle",
    size: 1000,
  },
];
