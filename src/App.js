import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Shop from './pages/Shop/Shop';

import ProductPage from './pages/ProductPage/ProductPage';
import ProductsList from './pages/ProductsList/ProductsList';
import EditProduct from './pages/EditProduct/EditProduct';
import EditBrand from './pages/EditBrand/EditBrand';
import SizeSystemList from './pages/SizeSystemList/SizeSystemList';
import EditSizeChartSystem from './pages/EditSizeChartSystem/EditSizeChartSystem';
import BrandList from './pages/BrandList/BrandList';
import Products from './pages/Products/Products';

import './App.scss';
const App = () => {
  return (
    // <Route path="/carousel" >
    //   <Slider autoPlay={false}/>
    // </Route>
    <Layout>
      <Switch>
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/shop" component={Shop} />
        <Route path="/addproduct" component={EditProduct}/>
        <Route path="/admin/editproduct/:id" component={EditProduct}/>
        <Route path="/admin/products" component={ProductsList}/>
        <Route path="/products" component={Products} />
        <Route path="/addsizesystem" component={EditSizeChartSystem} />
        <Route path="/editsizesystem/:id" component={EditSizeChartSystem} />
        <Route path="/sizesystems" component={SizeSystemList} />
        <Route path="/addbrand"component={EditBrand} />
        <Route path="/editbrand/:id"component={EditBrand} />
        <Route path="/brands" component={BrandList}/>
        <Route component={Shop}/>
      </Switch >
    </Layout>
  );
}

export default App;
