import Link from 'next/link'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href="/">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>
        <Link href="/menu">
          <span>Menu</span>
        </Link>
      </Breadcrumb.Item>

      {/* <Breadcrumb.Item>
        <Link href="/[...menuId]">
          <span>Category</span>
        </Link>
      </Breadcrumb.Item> */}
    </Breadcrumb>
  )
}

export default BreadCrumb
