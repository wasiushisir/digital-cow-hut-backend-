import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

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

export type ICow = {
  name: string;
  age: string;
  price: number;
  location: ICowLocation;
  breed: ICowBreed;
  weight: string;
  label: ICowLabel;
  category: ICowCategory;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow>;

export type CowFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
};
