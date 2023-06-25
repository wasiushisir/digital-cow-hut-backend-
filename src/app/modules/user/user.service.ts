import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);

  return result;
};
