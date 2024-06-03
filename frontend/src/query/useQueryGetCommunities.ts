import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useQUeryGetCommunities = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: () =>
      axios.get('http://localhost:8080/community').then((res) => res.data),
  })
}



export default useQUeryGetCommunities
