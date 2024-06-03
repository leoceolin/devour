/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useQUeryGetUsers from '../../query/useQueryGetUsers'
import useQUeryGetCommunities from '../../query/useQueryGetCommunities'
import { Label, LeaderboardButton } from './styles'
import { Community, User } from '../../interfaces'
import { GenericButton } from '../../components/GenericButton'
import { useNavigate } from 'react-router-dom'

interface MutationData {
  userId: string
  communityId: string
}

const UserCommunityRelationshipManager = () => {
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null,
  )

  const { data: users, isLoading: usersLoading } = useQUeryGetUsers()

  const { data: communities, isLoading: communitiesLoading } =
    useQUeryGetCommunities()

  const joinMutation = useMutation({
    mutationFn: (data: MutationData) =>
      axios.post(
        `http://localhost:8080/user/${data.userId}/join/${data.communityId}`,
      ),
    onSuccess: () => {
      toast.success('Successfully joined the community')
    },
    onError: (error: any) => {
      // i tried to use AxiosError but it didn't work, it throws an error on console that the field "message" doesn't exists on {}, that's why i used any type
      toast.error(`Error: ${error?.response?.data?.message}`)
    },
  })
  const leaveMutation = useMutation({
    mutationFn: (data: MutationData) =>
      axios.delete(
        `http://localhost:8080/user/${data.userId}/leave/${data.communityId}`,
      ),
    onSuccess: () => {
      toast.success('Successfully left the community')
    },
    onError: (error: any) => {
      toast.error(`Error: ${error?.response?.data?.message}`)
    },
  })

  const handleJoinClick = () => {
    if (selectedUser && selectedCommunity) {
      joinMutation.mutate({
        userId: selectedUser,
        communityId: selectedCommunity,
      })
    }
  }

  const handleLeaveClick = () => {
    if (selectedUser && selectedCommunity) {
      leaveMutation.mutate({
        userId: selectedUser,
        communityId: selectedCommunity,
      })
    }
  }

  if (usersLoading || communitiesLoading) return 'Loading...'

  return (
    <>
      <div>
        <Label>
          User: &nbsp;
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user: User) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        </Label>

        <Label>
          Community: &nbsp;
          <select onChange={(e) => setSelectedCommunity(e.target.value)}>
            <option value="">Select Community</option>
            {communities.map((community: Community) => (
              <option key={community._id} value={community._id}>
                {community.name}
              </option>
            ))}
          </select>
        </Label>

        <GenericButton
          text="Join"
          bgColor="green"
          handleClick={handleJoinClick}
          disabled={!selectedUser || !selectedCommunity}
        />

        <GenericButton
          text="Leave"
          bgColor="red"
          handleClick={handleLeaveClick}
          disabled={!selectedUser || !selectedCommunity}
        />
      </div>
      <LeaderboardButton onClick={() => navigate('/leaderboard')}>
        See leaderboard
      </LeaderboardButton>
    </>
  )
}

export default UserCommunityRelationshipManager
