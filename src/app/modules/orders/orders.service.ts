import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import { IOrder } from "./orders.interface";
import { Order } from "./orders.model";
import { User } from "../user/user.model";
import { Cow } from "../cow/cow.model";

export const createOrder = async (data: IOrder): Promise<IOrder> => {
  const { cow, buyer } = data;
  // console.log(cow, buyer);

  const budget = await User.findOne({ _id: buyer });
  const toBudget = budget?.budget;
  // console.log(toBudget);

  const price = await Cow.findOne({ _id: cow });

  const toPrice = price?.price;

  const deductedBudget = Number(toBudget) - Number(toPrice);
  // console.log(deductedBudget);

  const cowData = await Cow.findOne({ _id: cow });

  const findSeller = cowData?.seller;

  const specificSeller = await User.findOne({ _id: findSeller });

  const specificSellerIncome = Number(specificSeller?.income) + Number(toPrice);

  // console.log(specificSeller?.name);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const options = { session };
    const updatedUser = await User.findOneAndUpdate(
      { _id: buyer }, // filter criteria
      { budget: deductedBudget }, // data to update
      { new: true, ...options } // options: { new: true } returns the updated document
    );
    const updatedSeller = await User.findOneAndUpdate(
      { _id: specificSeller }, // filter criteria
      { income: specificSellerIncome }, // data to update
      { new: true, ...options } // options: { new: true } returns the updated document
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  const result = await Order.create(data);

  return result;
};
