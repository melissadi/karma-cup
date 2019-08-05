import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AdminShowContainer from '../containers/AdminShowContainer'
import AdminRewardsContainer from '../containers/AdminRewardsContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admins/:admin_id/stores/:store_id/rewards" component={AdminRewardsContainer} />
        <Route exact path="/admins/:id" component={AdminShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
