import React from 'react';
import { useSelector } from 'react-redux';

import CartProductList from './CartProductList/CartProductList';
import CartSummary from './CartSummary/CartSummary';
import BackgroundContent from '../BackgroundContent/BackgroundContent';

import styles from './CartData.module.scss';

const CartData = () => {

      const cartItems = useSelector(state => state.user.cart);

      if (!cartItems.length || !cartItems) {
            return (
                  <BackgroundContent>
                        <h1>Your cart is empty.</h1>
                  </BackgroundContent>
            )
      }
      return (
            <div className={styles['cart-data-container']}>
                  <CartProductList cartItems={cartItems} />
                  <CartSummary cartItems={cartItems} />
            </div>
      )
}

export default CartData;