import React from 'react';

import Product from '../Product/Product';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import BackgroundContent from '../BackgroundContent/BackgroundContent';

import useFetch from '../../hooks/useFetch'

import styles from './ProductOffer.module.scss';

const ProductOffer = () => {

      const [state] = useFetch('/admin/products');
      const { status } = state;

      console.log(state)
      return (
            <AsyncOpBgComponent status={status}>
                  <div className={styles['products']}>
                        {(!state.data?.products || !state.data?.products.length) && (
                              <BackgroundContent>
                                    <h1>'No products available.'</h1>
                              </BackgroundContent>
                        )}
                        {state.data?.products.length && state.data?.products.map(product => {
                              return <Product
                                    key={product._id}
                                    id={product._id}
                                    productImage={product.image}
                                    productName={product.productName}
                                    price={product.price}
                                    brand={product.productBrand}
                              />
                        })}
                  </div>
            </AsyncOpBgComponent>
      )
}

export default ProductOffer;