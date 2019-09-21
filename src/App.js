import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Home from './Home';
import Login from './Login';
import Rule from './Rule';
import Detail from './Detail';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rule" component={Rule} />
          <Route path="/login" component={Login} />
          <Route path="/detail/:id" component={Detail} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
