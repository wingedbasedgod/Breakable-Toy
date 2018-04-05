import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import PatternsIndexContainer from '../containers/PatternsIndexContainer';
import PatternShowContainer from '../containers/PatternShowContainer';

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={PatternsIndexContainer} />
        <Route path="patterns" component={PatternsIndexContainer} />
        <Route path="patterns/:id" component={PatternShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
