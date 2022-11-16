import { Card, Col, Row, Button, Divider, notification } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { addToCartTypeAction, removeFromCartTypeAction } from '../store/reducer/reducer'
import { useAppDispatch } from '../store/hooks'
import { useState } from 'react'
const { Meta } = Card

const ProductInner: React.FC<any> = ({ pro }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true);
  const openNotification = () => {
    notification.open({
      style: {
        color: '#1DA57A',
        fontWeight: 'bold',
        opacity: 0.9,
        cursor: 'pointer',
      },
      placement: 'bottomRight',
      message: 'Item Added',
      description: `${pro.productName} is added to your cart.`,
      duration: 4,
    })
  }
  const handleAddToCart = (pro: any) => {
    console.log('dispatch action ', pro)

    dispatch(addToCartTypeAction.fulfilled(pro))
    openNotification()
  }

  return (
    <>
      <Col>
        <Card style={{ maxWidth: 400 }}  cover={<img alt="example" src={pro.imageProduct} />}>
          <Button
            style={{ borderRadius: 100, float: 'right' }}
            onClick={() => dispatch(removeFromCartTypeAction.fulfilled(pro))}
          >
            <DeleteOutlined key="remove" />
          </Button>
          <Button
            style={{ borderRadius: 100, float: 'right' }}
            onClick={() => handleAddToCart(pro)}
          >
            <ShoppingCartOutlined key="cart" />
          </Button>

          <Meta title={pro.productName} description={'$' + pro.price} />
        </Card>
      </Col>
    </>
  )
}

export default ProductInner
