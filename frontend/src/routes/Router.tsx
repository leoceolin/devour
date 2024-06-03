import { Routes, Route } from 'react-router-dom'
import Leaderboard from '../pages/Leaderboard'
import UserCommunityRelationshipManager from '../pages/UserCommunityRelationshipManager'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserCommunityRelationshipManager />} />

      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  )
}
