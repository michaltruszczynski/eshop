import React, { useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authCheck } from './store/actions/'

import Layout from './components/Layout/Layout';
import Shop from './pages/ShopPages/Shop/Shop';
import Cart from './pages/ShopPages/Cart/Cart';
import ProductPage from './pages/ShopPages/ProductPage/ProductPage';
import Products from './pages/ShopPages/Products/Products';

import ProductsList from './pages/AdminPages/ProductsList/ProductsList';
import EditProduct from './pages/AdminPages/EditProduct/EditProduct';
import EditBrand from './pages/AdminPages/EditBrand/EditBrand';
import SizeSystemList from './pages/AdminPages/SizeSystemList/SizeSystemList';
import EditSizeChartSystem from './pages/AdminPages/EditSizeChartSystem/EditSizeChartSystem';
import BrandList from './pages/AdminPages/BrandList/BrandList';

import Signup from './pages/AuthPages/Signup/Signup';
import Signin from './pages/AuthPages/Signin/Signin';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ErrorRedirectPage from './pages/ErrorRedirectPage/ErrorRedirectPage';

import AsyncOpBgComponent from './components/AsyncOpBgComponent/AsyncOpBgComponent';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { userId, loading, error } = auth;

  console.log(userId);

  useLayoutEffect(() => {
    dispatch(authCheck())
  }, [dispatch]);

  const getAsyncOpStatus = (loading, error) => {
    if (loading) return 'loading';
    else if (error) return 'error';
    else return 'success';
  }
  const asyncOpStatus = getAsyncOpStatus(loading, error)

  return (
    <AsyncOpBgComponent status={asyncOpStatus} error={null}>
      <Layout>
        <Switch>
          <Route path="/shop" component={Products} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={Cart} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          {userId ? <Route path="/admin/addproduct" component={EditProduct} /> : null}
          <Route path="/admin/editproduct/:id" component={EditProduct} />
          <Route path="/admin/products" component={ProductsList} />
          <Route path="/admin/addsizesystem" component={EditSizeChartSystem} />
          <Route path="/admin/editsizesystem/:id" component={EditSizeChartSystem} />
          {/* <Route path="/admin/sizesystems" component={SizeSystemList} /> */}
          <ProtectedRoute path="/admin/sizesystems" isAuth={userId} roles={[]}>
            <SizeSystemList />
          </ProtectedRoute>
          <Route path="/admin/addbrand" component={EditBrand} />
          <Route path="/admin/editbrand/:id" component={EditBrand} />
          <Route path="/admin/brands" component={BrandList} />
          <Route path="/servererror" component={ErrorRedirectPage} />
          {/* <Route path="/products" component={Products} /> */}
          <Route component={Shop} />
        </Switch >
      </Layout>
    </AsyncOpBgComponent>
  );
}

export default App;
