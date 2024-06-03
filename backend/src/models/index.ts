import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Community } from "./Community";

export const CommunityModel = getModelForClass(Community);
export const UserModel = getModelForClass(User);
