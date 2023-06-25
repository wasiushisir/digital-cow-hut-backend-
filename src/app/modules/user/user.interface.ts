import { Model } from "mongoose";

type IUserRole = "seller" | "buyer";
type IUserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: IUserRole;
  password: string;
  name: IUserName;
  address: string;
  budget: string;
  income: string;
};

export type UserModel = Model<IUser>;
