import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { CommunityModel } from './Community';

class User {
	@prop({ required: true })
	public email?: string;

	@prop({ required: true, select: false })
	public passwordHash?: string;

	@prop()
	public profilePicture?: string;

	@prop({ required: true, select: false, default: [] })
	public experiencePoints?: { points: number, timestamp: Date }[];

	@prop({ ref: () => CommunityModel })
	public communityId?: Ref<typeof CommunityModel>;
}

export const UserModel = getModelForClass(User);
