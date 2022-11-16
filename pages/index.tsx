import type { NextPage } from 'next'
import Link from 'next/link'
import style from '../styles/Home.module.scss'
import { Drawer, Layout, Space } from 'antd'
import { MenuOutlined, ShoppingCartOutlined, ProfileOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, logout } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'
import { useRouter } from 'next/router'

var sectionStyle = {
  width: '100%',
  height: '100vh',
}

const Home: NextPage = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  // const [user, loading, error] = useAuthState(auth)
  // const [name, setName] = useState('')
  // const router = useRouter()

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     try {
  //       const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
  //       const doc = await getDocs(q)
  //       const data = doc.docs[0].data()
  //       setName(data.name)
  //     } catch (err) {
  //       console.error(err)
  //       alert('An error occured while fetching user data')
  //     }
  //   }
  //   // if (loading) return;
  //   if (!user) {
  //     fetchUserName()
  //     router.push('/login')
  //   }
  // }, [user, loading])
  return (
    <Layout style={sectionStyle} className={style.layout}>
      <div className={style.menu}>
        <a onClick={showDrawer} className={style.menu__btn}>
          <Space>
            <MenuOutlined />
          </Space>
        </a>
        <Drawer
          className={style.menu__drawer}
          placement="left"
          onClose={onClose}
          open={open}
          width="300px"
        >
          {/* <div className="dashboard__container">
            Logged in as
            <div>{name}</div>
            <div>{user?.email}</div>
            <button className="dashboard__btn" onClick={logout}>
              Logout
            </button>
          </div> */}
          <Link href="/menu">
            <a className={style.menu__drawer__link}>
              <ProfileOutlined /> Menu
            </a>
          </Link>
          <Link href="/cart">
            <a className={style.menu__drawer__link}>
              <ShoppingCartOutlined /> Shop cart
            </a>
          </Link>
        </Drawer>
      </div>
    </Layout>
  )
}

export default Home
