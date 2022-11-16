import { CategoryCardProps } from './../../components/CategoryCard'
import Error from 'next/error'
import { actionTypes } from '../actions/actions'
import { ProductsProps } from '../types'
import { createSlice, current } from '@reduxjs/toolkit'
import { createSagaAction } from '../createSagaAction'
import { error } from 'console'

export const initialState: InitState = {
  loading: false,
  allProducts: [],
  typeProduct: [],
  cart: [],
  error: null,
  numberCart: 0,
}
interface ProductType {
  id: number
  categoryName: string
  categoryImg: string
}
interface Cart {
  productName: ProductsProps['productName']
  price: ProductsProps['price']
  imageProduct: ProductsProps['imageProduct']
  productId: ProductsProps['productId']
  quantity: number
  categoryName?: string
  categoryImg?: string
}
export interface InitState {
  allProducts: ProductsProps[]
  loading: boolean
  error: null | Error
  typeProduct: ProductType[]
  cart: Cart[]
  numberCart: number
}

export const getMCListAction = createSagaAction<any, InitState['allProducts'], string>(
  'menu/get-list'
)

export const getCategoryTypeAction = createSagaAction<any, InitState['typeProduct'], string>(
  'menu/get-type'
)

export const addToCartTypeAction = createSagaAction<any, Cart, string>('menu/addToCart-type')
export const clearCartTypeAction = createSagaAction<any, Cart, string>('menu/clearCart-type')
export const incrementQuantityTypeAction = createSagaAction<any, Cart, string>(
  'menu/incrementQuantity-type'
)
export const decrementQuantityTypeAction = createSagaAction<any, Cart, string>(
  'menu/decrementQuantity-type'
)
export const removeFromCartTypeAction = createSagaAction<any, Cart, string>(
  'menu/removeFromCart-type'
)

const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getMCListAction.request, (state, action) => {
        state.loading = true
      })
      .addCase(getMCListAction.fulfilled, (state, action) => {
        state.loading = false
        state.allProducts = action.payload
      })
      .addCase(getCategoryTypeAction.fulfilled, (state, action) => {
        state.loading = false
        state.typeProduct = action.payload
      })
      .addCase(getMCListAction.rejected, (state, action) => {
        state.loading = false
        state.error
      })

      .addCase(addToCartTypeAction.fulfilled, (state, action) => {
        const itemExists = state.cart.find(
          (item) => item.productName === action.payload.productName
        )
        if (itemExists) {
          itemExists.quantity++
        } else {
          state.cart.push({
            ...action.payload,
            quantity: 1,
          })
        }
      })
      .addCase(incrementQuantityTypeAction.fulfilled, (state, action) => {
        const newState = current(state.cart)
        const itemIdx = newState.findIndex((item) => item.productId == action.payload.productId)

        const newCarts = [...state.cart]
        if (itemIdx !== -1) {
          newCarts[itemIdx].quantity++
        }

        state.cart = newCarts
      })
      .addCase(decrementQuantityTypeAction.fulfilled, (state, action) => {
        const item = state.cart.find((item) => item.productId === action.payload.productId)
        if (item?.quantity === 1) {
          const index = state.cart.findIndex((item) => item.productId === action.payload.productId)
          state.cart.splice(index, 1)
        } else {
          item.quantity--
        }
      })
      .addCase(removeFromCartTypeAction.fulfilled, (state, action) => {
        const index = state.cart.findIndex((item) => item.productId === action.payload.productId)
        state.cart.splice(index, 1)
      })
      .addCase(clearCartTypeAction.fulfilled, (state, action) => {
        state.cart = []
      }),
})
export default cartSlice.reducer
// export default function productsReducer(state: InitState = initialStare, action: any) {
//   switch (action.type) {
//     case actionTypes.FETCH_PRODUCT_LOADING:
//       return {
//         ...state,
//         loading: true,
//       }

//     case actionTypes.FETCH_PRODUCT_SUCCESS: {
//       const allProducts = action.payload

//       return {
//         ...state,
//         loading: false,
//         allProducts: action.payload,
//       }
//     }

//     case actionTypes.FETCH_PRODUCT_TYPE:
//       const typeProduct = action.payload
//       return {
//         ...state,
//         loading: false,
//         typeProduct: typeProduct,
//       }

//     case actionTypes.ADD_TO_CART:
//       if (state.numberCart == 0) {
//         let carts = {
//           id: action.payload.id,
//           quantity: 1,
//           productName: action.payload.productName,
//           price: action.payload.price,
//           imageProduct: action.payload.imageProduct,
//         }
//         state.cart.push(carts)
//       } else {
//         let check = false
//         state.cart.map((item, key) => {
//           if (item.productName == action.payload.productName) {
//             state.cart[key].quantity++
//             check = true
//           }
//         })
//         if (!check) {
//           let cart = {
//             quantity: 1,
//             productName: action.payload.productName,
//             price: action.payload.price,
//             imageProduct: action.payload.imageProduct,
//           }
//           state.cart.push(cart)
//         }
//       }
//       return {
//         ...state,
//         numberCart: state.numberCart + 1,
//       }

//     case actionTypes.FETCH_PRODUCT_FAIL:
//       return {

//         ...state,
//         loading: false,
//         error: action.error,
//       }

//     default:
//       return state
//   }
// }
