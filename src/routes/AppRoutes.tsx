import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Operations from '../app/pages/dashboard/Operations';
import Potential from '../app/pages/dashboard/Potential';
import Talents from '../app/pages/talents/Talents';
import Prospects from '../app/pages/dashboard/Prospects';
import Analytics from '../app/pages/dashboard/Analytics';
import HelpCenter from '../app/pages/dashboard/HelpCenter';
import Settings from '../app/pages/dashboard/Settings';

const AppRoutes = (props: any) => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Talents {...props} />} />
        <Route
          exact
          path="/Operations"
          render={() => <Operations {...props} />}
        />
        <Route
          exact
          path="/Potential"
          render={() => <Potential {...props} />}
        />
        <Route
          exact
          path="/Prospects"
          render={() => <Prospects {...props} />}
        />
        <Route
          exact
          path="/Analytics"
          render={() => <Analytics {...props} />}
        />
        <Route
          exact
          path="/HelpCenter"
          render={() => <HelpCenter {...props} />}
        />
        <Route exact path="/Settings" render={() => <Settings {...props} />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default AppRoutes;
