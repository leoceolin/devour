import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useQUeryGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('http://localhost:8080/user').then((res) => res.data),
  })
}

export default useQUeryGetUsers
