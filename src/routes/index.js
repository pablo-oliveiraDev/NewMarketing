import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './configRoutes';
import CadUser from '../Pages/CadUser';
import LoginUser from '../Pages/LoginUser';
import SuperCadUser from '../Pages/SuperCadUser';
import SuperLogin from '../Pages/SuperLogin';
import NovoProduto from '../Pages/NovoProduto';
import HomePage from '../Pages/Home';
import Status from '../Pages/Status';
import SetProdutos from '../Pages/SetProdutos'

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/CadUser' component={CadUser} />
      <Route exact path='/loginUser' component={LoginUser} />
      <Route exact path='/superCadUser19841986' component={SuperCadUser} />
      <Route exact path='/admin19841986' component={SuperLogin}/>
      <Route exact path='/novoProduto' component={NovoProduto}/>
      <Route exact path='/status' component={Status} />
      <Route exact path='/setProdutos' component={SetProdutos} />

    </Switch>
  )
}
