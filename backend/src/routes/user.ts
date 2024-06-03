import express from "express";
import { CommunityModel, UserModel } from "../models";

const userRouter = express.Router();

/**
 * @route GET /user/:id
 * @param {string} id - User ID
 * @returns {User} - User object with experiencePoints field
 */
userRouter.get("/:id", async (req, res) => {
	const user = await UserModel.findById(req.params.id).select('+experiencePoints');

	if (!user) {
		return res.status(404).send({ message: "User not found" });
	}
	res.send(user);
});

/**
 * @route GET /user
 * @returns {Array} - Array of User objects
 * @note Adds the virtual field of totalExperience to the user.
 * @hint You might want to use a similar aggregate in your leaderboard code.
 */
userRouter.get("/", async (_, res) => {
	const users = await UserModel.aggregate([
		{
			$unwind: "$experiencePoints"
		},
		{
			$group: {
				_id: "$_id",
				email: { $first: "$email" },
				profilePicture: { $first: "$profilePicture" },
				totalExperience: { $sum: "$experiencePoints.points" },
				commId: { $first: "$communityId" }
			}
		}
	]);
	res.send(users);
});

/**
 * @route POST /user/:userId/join/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description Joins a community
 */
userRouter.post("/:userId/join/:communityId", async (req, res) => {
	const { userId, communityId } = req.params;
	const user = await UserModel.findById(userId)

	const community = await CommunityModel.findById(communityId)

	if (user?.communityId) {
		return res.status(409).send({ message: "User already in a community" });
	}

	await UserModel.updateOne(
		{ _id: userId },
		{
			$set: {
				communityId: communityId,
			},
		},
		{ upsert: true }
	);

	res.status(200).send({ message: `User joined with success in the community: ${community?.name}` });
});

/**
 * @route DELETE /user/:userId/leave/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description leaves a community
 */
userRouter.delete("/:userId/leave/:communityId", async (req, res) => {
	const { userId, communityId } = req.params;
	const user = await UserModel.findById(userId)
	const community = await CommunityModel.findById(communityId)

	if (!user?.communityId) {
		return res.status(409).send({ message: "User does not belong to a community" });
	}

	await UserModel.updateOne(
		{ _id: userId },
		{
			$unset: {
				communityId: 1,
			},
		},
		{ upsert: true }
	);

	res.status(200).send({ message: `The user has successfully left the community:: ${community?.name}` });
});

export {
	userRouter
}
