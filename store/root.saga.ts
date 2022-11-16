import { all, fork } from 'redux-saga/effects';
import { ProductsSaga } from './sagas/productsSaga';

export default function* rootSaga() {
  yield all([
    fork(ProductsSaga)
  ]);
}
