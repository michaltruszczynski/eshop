import React from "react";


import CartItem from './CartItem/CartItem';

import styles from './CartProductList.module.scss';

const CartProductList = ({ cartItems = [] }) => {
      return (
            <ul>
                  {cartItems.map(item => (
                        <CartItem
                              key={item.productId + item.productSize}
                              itemData={item}
                        />
                  ))}
            </ul>
      )
}

export default CartProductList;