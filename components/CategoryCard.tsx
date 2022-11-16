import { Card, Typography, Space } from 'antd'
import style from 'styles/CategoryCard.module.scss'
import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import Link from 'next/link'

const { Title } = Typography

export interface CategoryCardProps {
  cardBg: string
  categoryName: string
}

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <Link
        href={{
          pathname: `/menu/${`category`.toLowerCase()}`,
          query: { keyword: `${props.categoryName}` },
        }}
      ><Card
    
      className={style.card}
      style={{ backgroundImage: `url(${props.cardBg})` }}
    >
      <Title level={3} className={style.card__title}>
        {props.categoryName}
      </Title>
      
        <a href="" className={style.card__plus}>
          <Space>
            <PlusCircleOutlined /> More
          </Space>
        </a>
      
    </Card></Link>
  )
}
