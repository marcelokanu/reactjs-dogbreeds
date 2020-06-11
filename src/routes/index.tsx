import React from 'react';

import { Switch, Route } from 'react-router-dom';

import ListBreeds from '../pages/ListBreeds';
import Breed from '../pages/Breed';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ListBreeds} />
    <Route path="/breed/:id" component={Breed} />
  </Switch>
);

export default Routes;
