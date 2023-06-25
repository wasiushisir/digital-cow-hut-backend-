import { Model } from "mongoose";

export type ICowLocation =
  | "Dhaka"
  | "Chittagong"
  | "Barisal"
  | "Rajshahi"
  | "Comilla"
  | "Sylet"
  | "Rangpur"
  | "Mymensingh";

export type ICowBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type ICowCategory = "Dairy" | "Beef" | "Dual Perpose";

export type ICowLabel = "for sale" | "sold out";

type ICow = {
  name: string;
  age: string;
  price: string;
  location: ICowLocation;
  breed: ICowBreed;
  weight: string;
  label: ICowLabel;
};

export type CowModel = Model<ICow>;
