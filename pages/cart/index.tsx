import { Button } from 'antd'
import Link from 'next/link'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  decrementQuantityTypeAction,
  incrementQuantityTypeAction,
  removeFromCartTypeAction
} from '../../store/reducer/reducer'
import styles from '../../styles/CartPage.module.scss'

export interface ShopCartProps {}

export default function ShopCart(props: ShopCartProps) {
  const cart = useAppSelector((state: RootState) => state.cart.cart)
  const dispatch = useAppDispatch()
  console.log(cart)
  const handleIncrementQuantity = (quantity: any) => {
    dispatch(incrementQuantityTypeAction.fulfilled(quantity))
  }
  const handleDecrementQuantity = (quantity: any) => {
    dispatch(decrementQuantityTypeAction.fulfilled(quantity))
  }
  const handleRemoveFromCart = (quantity: any) => {
    dispatch(removeFromCartTypeAction.fulfilled(quantity))
  }
  const getTotalPrice = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
  }
  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total Price</div>
          </div>
          {cart.map((item: any) => (
            <div className={styles.body} key={item.productId}>
              <div className={styles.image}>
                <img src={item.imageProduct} height="90" width="65" />
              </div>
              <p>{item.productName}</p>
              <p>$ {item.price}</p>
              <div className={styles.buttons}>
              <div className={styles.cartItem__incrDec}>
                  <button onClick={() => handleDecrementQuantity(item)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => handleIncrementQuantity(item)}>+</button>
                </div>
                <button
                  className={styles.cartItem__removeButton}
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
            
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>
          <Link href={'/test-page'}><Button type='primary'>Checkout</Button></Link>
        </>
      )}
    </div>
  )
}
