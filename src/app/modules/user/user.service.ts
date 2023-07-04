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

export const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData } = payload;

  // console.log(name, "name");

  // console.log(userData);

  const updatedUserData: Partial<IUser> = { ...userData };

  // console.log(updatedUserData);

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });

  // console.log(result);
  return result;
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
