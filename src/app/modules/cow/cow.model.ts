import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";

export const cowSchema = new Schema<ICow, CowModel>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
    enum: cowLocation,
  },

  breed: {
    type: String,
    required: true,
    enum: cowBreed,
  },
  weight: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
    enum: cowLabel,
  },

  category: {
    type: String,
    required: true,
    enum: cowCategory,
  },

  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// cowSchema.pre('save', async function (next) {
//   console.log('Before saving:', this.price);

// })

// console.log(document.price)

export const Cow = model<ICow, CowModel>("Cow", cowSchema);
