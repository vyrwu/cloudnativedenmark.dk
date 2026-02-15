import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/index"
import ConvinceYourBoss from "./pages/convince-your-boss"
import Mission from "./pages/mission"
import Privacy from "./pages/privacy"
import Schedule from "./pages/schedule"
import TalkArchive from "./pages/talk-archive"
import Team from "./pages/team"
import VenuePlan from "./pages/venue-plan"
import BecomeASponsor from "./pages/become-a-sponsor"
import NotFound from "./pages/404"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="convince-your-boss" element={<ConvinceYourBoss />} />
        <Route path="mission" element={<Mission />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="talk-archive" element={<TalkArchive />} />
        <Route path="team" element={<Team />} />
        <Route path="venue-plan" element={<VenuePlan />} />
        <Route path="become-a-sponsor" element={<BecomeASponsor />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
