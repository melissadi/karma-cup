import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AdminShowContainer from '../containers/AdminShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admins/:id" component={AdminShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
