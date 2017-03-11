import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import App from '../imports/startups/client/app';
import HomePage from '../imports/ui/pages/home-page/home-page'
import Profile from '../imports/ui/pages/profile'
import LogActivity from '../imports/ui/pages/log-activity'
import AddGroup from '../imports/ui/pages/add-group'

export const routes =  (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="profile" component={Profile} />
    <Route path='add-group' component={AddGroup} />
    <Route path="log-activity" component={LogActivity} />
  </Route>
)



Meteor.startup(() => {
  ReactDOM.render (
    <Router history={browserHistory} routes={routes} />,
    document.querySelector('.c-render-target')
  )
})
