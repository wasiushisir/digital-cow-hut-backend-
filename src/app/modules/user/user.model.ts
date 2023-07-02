import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

export const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },

      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>("User", userSchema);
