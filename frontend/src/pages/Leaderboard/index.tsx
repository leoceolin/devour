import { useMemo } from 'react'
import useQUeryGetCommunitiesFullInfo from '../../query/useQUeryGetCommunitiesFullInfo'
import {
  Row,
  Column,
  Table,
  TableRow,
  TableHead,
  TableDescription,
  Image,
  GoBackButton,
} from './styles'
import { useNavigate } from 'react-router-dom'

const Leaderboard = () => {
  const navigate = useNavigate()
  const { data: communities, isLoading: communitiesLoading } =
    useQUeryGetCommunitiesFullInfo()

  const amountOfCommunities = useMemo(() => {
    if (communities?.length) {
      return {
        middle: communities.length / 2,
        total: communities.length,
      }
    }

    return {
      middle: 1,
      total: 2,
    }
  }, [communities])

  if (communitiesLoading) return 'Loading...'

  if (!amountOfCommunities) return 'No communities found'

  return (
    <Row>
      <Column>
        <Table>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Community</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>EXP</TableHead>
          </TableRow>
          {communities
            ?.slice(0, amountOfCommunities.middle)
            .map((community, index) => {
              const { _id, name, logo, totalExperiencePoints, totalMembers } =
                community
              return (
                <TableRow key={_id}>
                  <TableDescription>{index + 1}º</TableDescription>
                  <TableDescription
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Image src={logo} />
                    <span>{name}</span>
                  </TableDescription>
                  <TableDescription>{totalMembers}</TableDescription>
                  <TableDescription>{totalExperiencePoints}</TableDescription>
                </TableRow>
              )
            })}
        </Table>
      </Column>
      <Column>
        <Table>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Community</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>EXP</TableHead>
          </TableRow>
          {communities
            ?.slice(amountOfCommunities.middle, amountOfCommunities.total)
            .map((community, index) => {
              const { _id, name, logo, totalExperiencePoints, totalMembers } =
                community
              return (
                <TableRow key={_id}>
                  <TableDescription>
                    {amountOfCommunities.middle + index + 1}º
                  </TableDescription>
                  <TableDescription
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Image src={logo} />
                    <span>{name}</span>
                  </TableDescription>
                  <TableDescription>{totalMembers}</TableDescription>
                  <TableDescription>{totalExperiencePoints}</TableDescription>
                </TableRow>
              )
            })}
        </Table>
      </Column>
      <GoBackButton onClick={() => navigate('/')}>Go back</GoBackButton>
    </Row>
  )
}

export default Leaderboard
