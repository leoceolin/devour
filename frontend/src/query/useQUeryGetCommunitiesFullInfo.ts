import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface IResponseGetCommunitiesFullInfo {
  _id: string,
  totalExperiencePoints: number,
  name: string,
  logo: string,
  totalMembers: number
}
const useQUeryGetCommunitiesFullInfo = () => {
  return useQuery({
    queryKey: ['communitiesFullInfo'],
    queryFn: () =>
      axios.get('http://localhost:8080/communityInfo').then((res) => res.data as IResponseGetCommunitiesFullInfo[]),
  })
}

export default useQUeryGetCommunitiesFullInfo 
