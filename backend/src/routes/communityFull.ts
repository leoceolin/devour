import express from 'express'
import { CommunityModel } from '../models'

const communityFullRouter = express.Router()
/**
 * @route GET /community/communityInfo
 * @returns {Array} - Array of Community objects full filled with the amount of members
 */
communityFullRouter.get('/', async (_, res) => {
  const communities = await CommunityModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'communityId',
        as: 'communityMembersInfo',
      },
    },
    {
      $unwind: {
        path: "$communityMembersInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$communityMembersInfo.experiencePoints",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          name: "$name",
          logo: "$logo",
          _id: "$_id"
        },
        totalExperiencePoints: {
          $sum: "$communityMembersInfo.experiencePoints.points"
        },
        totalMembers: {
          $addToSet: "$communityMembersInfo._id"
        }
      }
    },
    {
      $project: {
        name: "$_id.name",
        logo: "$_id.logo",
        _id: "$_id._id",
        totalExperiencePoints: 1,
        totalMembers: {
          $size: "$totalMembers"
        }
      }
    },
    {
      $sort: {
        "totalExperiencePoints": -1
      }
    }
  ])

  res.send(communities)
})

export { communityFullRouter }
