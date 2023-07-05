import { Schema, model } from "mongoose";
import { IOrder, OrderModel } from "./orders.interface";
import { Cow, cowSchema } from "../cow/cow.model";
import { User, userSchema } from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import status from "http-status";

const orderSchema = new Schema<IOrder, OrderModel>({
  cow: {
    type: Schema.Types.ObjectId,
    ref: "Cow",
    required: true,
    unique: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// orderSchema.pre("save", async function (next) {
//   const price = await Cow.findOne(this.cow);
//   const budget = await User.findOne(this.buyer);
//   const toPrice = Number(price?.price);
//   const toBudget = Number(budget?.budget);
//   console.log(toPrice, toBudget, "from pre");

//   if (toPrice > toBudget) {
//     throw new ApiError(status.CONFLICT, "need more money to buy this cow");
//   }

//   next();
// });

export const Order = model<IOrder, OrderModel>("Order", orderSchema);
