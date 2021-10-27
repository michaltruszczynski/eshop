import * as actionTypes from './actionTypes';

export const addToCart = (productId, productSize, quantity) => {
      return {
            type: actionTypes.ADD_TO_CART,
            productId: productId,
            productSize: productSize,
            quantity: quantity
      }
}