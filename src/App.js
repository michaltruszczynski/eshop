import React, { useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import Shop from './pages/ShopPages/Shop/Shop';
import Cart from './pages/ShopPages/Cart/Cart';
import ProductPage from './pages/ShopPages/ProductPage/ProductPage';
import Products from './pages/ShopPages/Products/Products';

import Signup from './pages/AuthPages/Signup/Signup';
import Signin from './pages/AuthPages/Signin/Signin';

import ErrorRedirectPage from './pages/ErrorRedirectPage/ErrorRedirectPage';

import AsyncOpBgComponent from './components/AsyncOpBgComponent/AsyncOpBgComponent';

import AdminPages from './pages/AdminPages/AdminPages';

import { authCheck } from './store/actions/';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { asyncOperation, error} = auth;

  useLayoutEffect(() => {
    dispatch(authCheck())
  }, [dispatch]);


  console.log('[App.js] asyncOpStatus', asyncOperation, error)

  return (
    <AsyncOpBgComponent status={asyncOperation} error={null}>
      <Layout>
        <Switch>
          <Route path="/shop" component={Products} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={Cart} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/admin" component={AdminPages}>
            <AdminPages />
          </Route>
          <Route path="/servererror" component={ErrorRedirectPage} />
          <Route component={Shop} />
        </Switch >
      </Layout>
    </AsyncOpBgComponent>
  );
}

export default App;
