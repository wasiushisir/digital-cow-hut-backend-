import {
  ICowBreed,
  ICowCategory,
  ICowLabel,
  ICowLocation,
} from "./cow.interface";

export const cowLocation: ICowLocation[] = [
  "Dhaka",
  "Chittagong",
  "Barisal",
  "Rajshahi",
  "Comilla",
  "Sylet",
  "Rangpur",
  "Mymensingh",
];

export const cowBreed: ICowBreed[] = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
];

export const cowCategory: ICowCategory[] = ["Dairy", "Beef", "Dual Perpose"];

export const cowLabel: ICowLabel[] = ["for sale", "sold out"];
