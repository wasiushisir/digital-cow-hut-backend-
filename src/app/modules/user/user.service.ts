import catchAsync from "../../../shared/catchAsync";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);

  return result;
};

// export const getAllUser = catchAsync(async (): Promise<IUser[]> => {
//   const result = await User.find({});
//   return result;
// });

export const getAllUser = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

export const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
