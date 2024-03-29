import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import { IOrder } from "./orders.interface";
import { Order } from "./orders.model";
import { User } from "../user/user.model";
import { Cow } from "../cow/cow.model";
import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import status from "http-status";

export const createOrder = async (data: IOrder): Promise<IOrder | null> => {
  const { cow, buyer } = data;
  console.log(cow);

  const isExist = await Order.find({ cow: cow });
  console.log(isExist);

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

  const checkBudget = Number(toBudget);

  const session = await mongoose.startSession();
  session.startTransaction();

  if (checkBudget >= Number(toPrice) && isExist.length === 0) {
    console.log(checkBudget, toPrice, "from service");

    try {
      const options = { session };
      const updatedBuyer = await User.findOneAndUpdate(
        { _id: buyer }, // filter criteria
        { budget: deductedBudget }, // data to update
        { new: true, ...options } // options: { new: true } returns the updated document
      );
      const updatedSeller = await User.findOneAndUpdate(
        { _id: specificSeller }, // filter criteria
        { income: specificSellerIncome }, // data to update
        { new: true, ...options } // options: { new: true } returns the updated document
      );
      const updatedCow = await Cow.findOneAndUpdate(
        { _id: cow }, // filter criteria
        { label: "sold out" }, // data to update
        { new: true, ...options } // options: { new: true } returns the updated document
      );

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  } else if (checkBudget < Number(toPrice)) {
    throw new ApiError(status.CONFLICT, "need more money to buy this cow");
  } else {
    throw new ApiError(
      status.CONFLICT,
      "You have to buy only one cow, the same cow would not be sold agin again"
    );
  }

  const result = await Order.create(data);
  const populatedOrder = await Order.findById(result?._id)
    .populate({
      path: "cow",
      populate: {
        path: "seller",
      },
    })
    .populate("buyer");

  return populatedOrder;
};

export const getOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find({})
    .populate({
      path: "cow",
      populate: [
        {
          path: "seller",
        },
      ],
    })

    .populate("buyer");

  return result;
};
