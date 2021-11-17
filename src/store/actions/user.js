import * as actionTypes from './actionTypes';

export const addToCart = (productId, productSize, quantity, productData) => {
      return {
            type: actionTypes.ADD_TO_CART,
            productId: productId,
            productSize: productSize,
            productData: productData,
            quantity: quantity
      }
}

export const deleteFromCart = (productId, productSize) => {
      return {
            type: actionTypes.DELETE_FROM_CART,
            productId: productId,
            productSize: productSize
      }
}

export const removeFormCart = (productId, productSize) => {
      return {
            type: actionTypes.REMOVE_FROM_CART,
            productId: productId,
            productSize: productSize
      }
}