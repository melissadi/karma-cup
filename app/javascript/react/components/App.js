import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AdminDashboard from '../containers/AdminDashboard'
import AdminRewardsContainer from '../containers/AdminRewardsContainer'
import UserDashboard from '../containers/UserDashboard'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admins/:admin_id/stores/:store_id/rewards" component={AdminRewardsContainer} />
        <Route exact path="/users/:id" component={UserDashboard} />
        <Route exact path="/admins/:id" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
