import React from 'react';

import styles from './CartSummary.module.scss';

const priceToDisplay = (price) => {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'PLN' }).format(price)
}

const CartSummary = ({ cartItems, discount = 0.1 }) => {

      const getProductsTotalPrice = (cartItems) => {
            const totalCartPrice = cartItems.reduce((totalPrice, cartItem) => {
                  return totalPrice + cartItem.quantity * cartItem.productData.productPrice
            }, 0);

            return totalCartPrice;
      }


      const getDiscount = (cartItems, discount = 0) => {
            const totalCartPrice = cartItems.reduce((totalPrice, cartItem) => {
                  return totalPrice + cartItem.quantity * cartItem.productData.productPrice
            }, 0);

            return totalCartPrice * discount;
      }

      const productsSubTotalPrice = getProductsTotalPrice(cartItems);

      const priceDiscount = getDiscount(cartItems, discount);

      const shippingCost = 10.99;

      const productsTotalPrice = productsSubTotalPrice - priceDiscount + shippingCost;

      return (

            <div className={styles['summary']}>
                  <div className={styles['testing']}>
                        <h1>Cart Summary</h1>
                        <div className={styles['summary__item']}>
                              <p className={styles['summary__item-name']}>Subtotal</p> <p>{priceToDisplay(productsSubTotalPrice)}</p>
                        </div>
                        <div className={styles['summary__item']}>
                              <p className={styles['summary__item-name']}>Shipping</p> <p>{priceToDisplay(shippingCost)}</p>
                        </div>
                        <div className={styles['summary__item']}>
                              <p className={styles['summary__item-name']}>Discount</p> <p>{priceToDisplay(priceDiscount)}</p>
                        </div>
                        <div className={styles['summary__item']}>
                              <p className={[styles['summary__item-name'], styles['summary__item-name--bold']].join(' ')}>Total</p> <p>{priceToDisplay(productsTotalPrice)}</p>
                        </div>
                  </div>

            </div>


      )
}

export default CartSummary;