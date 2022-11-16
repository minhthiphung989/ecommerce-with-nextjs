import {
  InitState,
  addToCartTypeAction,
  getMCListAction,
  getCategoryTypeAction,
} from './../reducer/reducer'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../actions/actions'
import * as actions from '../actions/actions'
import axios from 'axios'
import { PayloadAction } from '@reduxjs/toolkit'

export function* fetchProducts(action: PayloadAction) {
  try {
    const { data, code, message, ...rest } = yield call(
      axios.get,
      'https://63429c3fba4478d4783e9679.mockapi.io/api/category'
    )
    yield put(actions.fetchProductsSuccess(data))
    yield put(getMCListAction.fulfilled(data))
  } catch (error: any) {
    yield put(getMCListAction.rejected(error.message))
  }
}

export function* fetchProductsType(action: PayloadAction) {
  try {
    const { data, code, message, ...rest } = yield call(
      axios.get,
      'https://63429c3fba4478d4783e9679.mockapi.io/api/type'
    )
    yield put(actions.fetchProductsType(data))

    yield put(getCategoryTypeAction.fulfilled(data))
  } catch (error: any) {
    yield put(getCategoryTypeAction.rejected(error.message))
  }
}

// export function* addToCartFunc(action: PayloadAction) {
//   try {
//     const { data, code, message, ...rest } = yield call(
//       axios.get,
//       'https://63429c3fba4478d4783e9679.mockapi.io/api/category'
//     )
//     yield put(actions.addToCart(data))
//     yield put(addToCartTypeAction.fulfilled(data))
//   } catch (error: any) {
//     yield put(addToCartTypeAction.rejected(error.message))
//   }
// }

export function* ProductsSaga() {
  yield takeLatest(getMCListAction.request.type, fetchProducts)
  yield takeLatest(getCategoryTypeAction.request.type, fetchProductsType)
  // yield takeLatest(addToCartTypeAction.request.type, addToCartFunc)
}
