import { Button, Card, Col, Modal, Row, Skeleton, Switch } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addToCartTypeAction, getMCListAction } from '../store/reducer/reducer'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addToCart } from '../store/actions/actions'
import ProductInner from './ProductInner'
const { Meta } = Card
const ProductCard = () => {
  const products = useAppSelector((state: RootState) => state.cart.allProducts)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const cate = router.query.keyword
  useEffect(() => {
    dispatch(getMCListAction.request({}))
  }, [])

  return (
    <>
      {products ? (
        <Row gutter={6} justify="center" style={{ margin: '0 auto' }}>
          {products
            .filter((category) => category.categoryName == cate)
            .map((pro) => (
              <Col
                key={pro.productId}
                span={6}
                xs={12}
                md={8}
                // lg={8}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <ProductInner pro={pro} />
              </Col>
            ))}
        </Row>
      ) : (
        <Skeleton />
      )}
    </>
  )
}

export default ProductCard
