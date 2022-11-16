import { PayloadAction } from '@reduxjs/toolkit';
import { InitState } from '../reducer/reducer'

export const actionTypes = {
  FETCH_PRODUCT_LOADING: 'FETCH_PRODUCTS_LOADING',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCT_FAIL: 'FETCH_PRODUCTS_FAIL',
  FETCH_PRODUCT_TYPE: 'FETCH_PRODUCT_TYPE',
  ADD_TO_CART: 'ADD_TO_CART',
}

export function fetchProductsLoading() {
  return {
    type: actionTypes.FETCH_PRODUCT_LOADING,
  }
}

export function fetchProductsSuccess(allProducts: InitState['allProducts']) {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    payload: allProducts,
  }
}

export function fetchProductsFail(error: InitState) {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: error,
  }
}

export function fetchProductsType(typeProduct: InitState['typeProduct']){
    return{
        type:actionTypes.FETCH_PRODUCT_TYPE,
        payload: typeProduct,
    }
}

export function addToCart(cart: InitState['allProducts']){
  return{
      type:actionTypes.ADD_TO_CART,
      payload: cart,
  }
}
