import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const initialState = {
      userId: null,
      userName: '',
      loading: false,
      error: null,
      cart: []
}

const addToCart = (state, action) => {
      const { cart } = state;
      const { productId, productSize, quantity } = action;

      const existingItemIndex = cart.findIndex(item => item.productId === productId && item.productSize === productSize);
      const updatedCart = [...cart];

      if (existingItemIndex < 0) {
            const newItem = {
                  productId: productId,
                  productSize: productSize,
                  quantity: 1
            }

            updatedCart.push(newItem);

            return updateObject(state, { cart: updatedCart });
      }

      updatedCart[existingItemIndex].quantity = cart[existingItemIndex].quantity + quantity;

      return updateObject(state, { cart: updatedCart })


}


const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.ADD_TO_CART:
                  return addToCart(state, action)
            default:
                  return state;
      }
}

export default reducer;