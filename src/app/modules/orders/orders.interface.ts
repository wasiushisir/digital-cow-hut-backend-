import { Model, Types } from "mongoose";
import { ICow } from "../../modules/cow/cow.interface";
import { IUser } from "../../modules/user/user.interface";

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder>;
