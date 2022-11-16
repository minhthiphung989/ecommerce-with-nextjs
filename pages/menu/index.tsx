import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/CategoryCard'
import { CategoryCardProps } from '../../components/CategoryCard'
import { Col, Row, Typography, Carousel, Image, Avatar, Card, Button, Skeleton } from 'antd'
import {  ShoppingCartOutlined } from '@ant-design/icons'
import style from '../../styles/Menu.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store'
import {
  addToCartTypeAction,
  getCategoryTypeAction,
  getMCListAction,
  initialState,
} from '../../store/reducer/reducer'
import Navbar from '../../components/Navbar'
import BreadCrumb from '../../components/Breadcrumb'

const { Title } = Typography
const { Meta } = Card

export interface MenuCatProps {
  categoryCard: CategoryCardProps[]
}

export default function Menu(_props: MenuCatProps) {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const productsType = useAppSelector((state: RootState) => state.cart.typeProduct)
  const allProduct = useAppSelector((state: RootState) => state.cart.allProducts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategoryTypeAction.request({}))
    dispatch(getMCListAction.request({}))
  }, [])

  return (
    <>
      <Navbar />
      {/* <BreadCrumb/> */}
      <Carousel autoplay>
        <div>
          <Image
            width={'100%'}
            // height={'60vh'}
            style={{maxHeight: '50vh'}}
            src="https://nhaxinh.com/wp-content/uploads/2022/09/bo-suu-tap-cabo-moi.jpg"
          />
        </div>
        <div>
          <Image
            width={'100%'}
            style={{maxHeight: '50vh'}}
            src="https://nhaxinh.com/wp-content/uploads/2022/09/banner-showroom-360do-nhaxinh-1.jpg"
          />
        </div>
        <div>
          <Image
            width={'100%'}
            style={{maxHeight: '50vh'}}
            src="https://nhaxinh.com/wp-content/uploads/2022/04/giuong-iris-dep-gia-tot-hoc-keo.jpg"
          />
        </div>
      </Carousel>
      <Typography className={style.category}>
        <Title style={{ textAlign: 'center', paddingTop: '1vh' }} className={style.menu__title}>
          Menu
        </Title>
      </Typography>
      <Row gutter={[12, 12]} justify='center' style={{paddingTop:'5rem', margin:'0 auto', width:'90%'}}>
        {productsType.map((category: any) => (
          <Col className={style.category__col} xs={24} md={12} lg={6} key={category.categoryName}>
            <CategoryCard cardBg={category.categoryImg} categoryName={category.categoryName} />
          </Col>
        ))}
      </Row>
      <Typography className={style.category}>
        <Title style={{ textAlign: 'center', paddingTop: '10rem' }} className={style.menu__title}>
          All product
        </Title>
      </Typography>
      {allProduct ? (
        <Row
          // gutter={[0, 24]}
          justify="center"
          style={{ margin: '0 auto', 
          columnGap: 24,
          paddingTop: '5rem' }}
        >
          {allProduct.map((prod: any) => (
            <Col lg={6}  >
              <Card key={prod.productId} style={{ maxWidth: 350 }} cover={<img alt="example" src={prod.imageProduct} />}>
                <Button
                  style={{ borderRadius: 100, float: 'right' }}
                  onClick={() => dispatch(addToCartTypeAction.fulfilled(prod))}
                >
                  <ShoppingCartOutlined key="cart" />
                </Button>

                <Meta title={prod.productName} description={'$' + prod.price} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Skeleton />
      )}
    </>
  )
}
