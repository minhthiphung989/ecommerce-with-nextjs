import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { Button, Col, Row, Steps, Typography } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import Cards from '../../components/Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../../components/CreditCard'
import Styles from '../../components/Styles'
import { auth, db, logout } from '../../firebase'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearCartTypeAction } from '../../store/reducer/reducer'
import styles from '../../styles/CartPage.module.scss'
import { FieldInput } from './style'
const { Title, Text } = Typography
export interface ShopCartProps {}
const { Step } = Steps
const MailSvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M483.556 453.86H53.276C23.9 453.86 0 429.959 0 400.583V111.417C0 82.041 23.9 58.14 53.276 58.14h405.447c29.376 0 53.276 23.9 53.276 53.276v222.807c0 7.855-6.367 14.222-14.222 14.222s-14.222-6.367-14.222-14.222V111.417c0-13.692-11.14-24.832-24.832-24.832H53.276c-13.692 0-24.832 11.14-24.832 24.832v289.166c0 13.692 11.14 24.832 24.832 24.832h430.279c7.855 0 14.222 6.367 14.222 14.222s-6.366 14.223-14.221 14.223z"
    />
    <path
      style={{
        fill: "#cff09e",
      }}
      d="M497.778 111.417 256 294.542 14.222 111.417c0-21.569 17.485-39.054 39.054-39.054h405.447c21.57 0 39.055 17.484 39.055 39.054z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M256 308.764c-3.024 0-6.047-.961-8.587-2.884L5.635 122.755A14.224 14.224 0 0 1 0 111.417C0 82.041 23.9 58.14 53.276 58.14h405.447c29.376 0 53.276 23.9 53.276 53.276 0 4.453-2.085 8.649-5.635 11.338L264.587 305.88a14.203 14.203 0 0 1-8.587 2.884zM29.288 104.987 256 276.7l226.712-171.713c-2.84-10.586-12.518-18.402-23.989-18.402H53.276c-11.468 0-21.148 7.816-23.988 18.402zM483.544 453.662c-2.992 0-6.007-.94-8.576-2.886l-99.556-75.405c-6.262-4.742-7.494-13.663-2.751-19.924 4.743-6.262 13.663-7.494 19.924-2.751l99.556 75.405c6.262 4.742 7.494 13.663 2.751 19.924a14.199 14.199 0 0 1-11.348 5.637zM34.524 449.065a14.2 14.2 0 0 1-11.348-5.636c-4.742-6.261-3.511-15.182 2.751-19.924l93.487-70.808c6.261-4.74 15.181-3.511 19.924 2.751 4.742 6.261 3.511 15.182-2.751 19.924L43.102 446.18a14.165 14.165 0 0 1-8.578 2.885z"
    />
  </svg>
)

const MailIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MailSvg} {...props} />
);
const UserSvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 50"
    style={{
      enableBackground: "new 0 0 512 512",
      
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M209.483 213.485c-58.858 0-106.742-47.886-106.742-106.743S150.624 0 209.483 0c58.858 0 106.742 47.884 106.742 106.742s-47.886 106.743-106.742 106.743zm0-186.072c-43.742 0-79.329 35.587-79.329 79.329s35.587 79.33 79.329 79.33 79.329-35.588 79.329-79.33-35.587-79.329-79.329-79.329zM331.66 512c-58.858 0-106.742-47.884-106.742-106.742s47.884-106.743 106.742-106.743S438.402 346.4 438.402 405.258 390.518 512 331.66 512zm0-186.072c-43.742 0-79.329 35.588-79.329 79.33s35.587 79.329 79.329 79.329 79.329-35.587 79.329-79.329-35.587-79.33-79.329-79.33z"
    />
    <path
      style={{
        fill: "#cff09e",
      }}
      d="M238.625 405.258c0-49.067 37.992-89.233 86.159-92.756-11.621-33.084-37.077-59.654-69.431-72.774l-45.869 79.448-45.869-79.448c-44.74 18.142-76.308 61.994-76.308 113.242v144.524h232.34c-45.704-5.896-81.022-44.929-81.022-92.236z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M319.645 511.201H87.305c-7.57 0-13.707-6.138-13.707-13.707V352.971c0-55.604 33.311-105.041 84.865-125.945 6.337-2.566 13.601-.074 17.021 5.85l33.999 58.888 33.999-58.888a13.706 13.706 0 0 1 17.021-5.85c36.153 14.659 64.297 44.159 77.214 80.932a13.709 13.709 0 0 1-11.932 18.213c-41.187 3.013-73.451 37.752-73.451 79.086 0 39.753 29.693 73.562 69.068 78.642 7.169.925 12.388 7.259 11.925 14.473-.468 7.215-6.453 12.829-13.682 12.829zm-218.634-27.413h158.444c-21.318-19.643-34.538-47.764-34.538-78.53 0-49.226 34.01-91.502 80.261-103.385a108.662 108.662 0 0 0-44.248-44.395l-39.578 68.551a13.705 13.705 0 0 1-23.74 0l-39.583-68.561c-34.99 18.782-57.017 55.101-57.017 95.501v130.819z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M331.66 450.034c-7.57 0-13.707-6.138-13.707-13.707v-62.138c0-7.569 6.137-13.707 13.707-13.707 7.57 0 13.707 6.138 13.707 13.707v62.138c0 7.569-6.137 13.707-13.707 13.707z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M362.729 418.965h-62.138c-7.57 0-13.707-6.138-13.707-13.707s6.136-13.707 13.707-13.707h62.138c7.57 0 13.707 6.138 13.707 13.707s-6.137 13.707-13.707 13.707z"
    />
  </svg>
);
const UserIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UserSvg} {...props} />
);
const PaySvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M418.913 235.839H77.57c-8.569 0-15.515-6.946-15.515-15.515V103.951c0-8.569 6.946-15.515 15.515-15.515h356.86c8.569 0 15.515 6.946 15.515 15.515s-6.946 15.515-15.515 15.515H93.085v85.343h325.828c8.569 0 15.515 6.946 15.515 15.515s-6.946 15.515-15.515 15.515z"
    />
    <path
      style={{
        fill: "#cff09e",
      }}
      d="M108.599 26.368H403.4v77.591H108.599z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M403.401 119.466H108.599c-8.569 0-15.515-6.946-15.515-15.515V26.368c0-8.569 6.946-15.515 15.515-15.515h294.804c8.569 0 15.515 6.946 15.515 15.515v77.583c-.002 8.569-6.948 15.515-15.517 15.515zm-279.287-31.03h263.774V41.883H124.114v46.553zM192.88 436.04h-19.602c-8.569 0-15.515-6.946-15.515-15.515s6.946-15.515 15.515-15.515h19.602c8.569 0 15.515 6.946 15.515 15.515s-6.947 15.515-15.515 15.515zM265.8 436.04h-19.602c-8.569 0-15.515-6.946-15.515-15.515s6.946-15.515 15.515-15.515H265.8c8.569 0 15.515 6.946 15.515 15.515s-6.946 15.515-15.515 15.515zM338.722 436.04H319.12c-8.569 0-15.515-6.946-15.515-15.515s6.946-15.515 15.515-15.515h19.602c8.569 0 15.515 6.946 15.515 15.515s-6.946 15.515-15.515 15.515z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M465.457 501.147H15.515C6.946 501.147 0 494.201 0 485.632V259.116c0-8.569 6.946-15.515 15.515-15.515h480.97c8.569 0 15.515 6.946 15.515 15.515V405.72c0 8.569-6.946 15.515-15.515 15.515s-15.515-6.946-15.515-15.515V274.631H31.03v195.486h434.426c8.569 0 15.515 6.946 15.515 15.515.001 8.569-6.946 15.515-15.514 15.515z"
    />
    <path
      style={{
        fill: "#cff09e",
      }}
      d="M46.542 181.526h418.921v77.591H46.542z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M465.457 274.631H46.543c-8.569 0-15.515-6.946-15.515-15.515v-77.583c0-8.569 6.946-15.515 15.515-15.515h418.915c8.569 0 15.515 6.946 15.515 15.515v77.583c-.001 8.569-6.948 15.515-15.516 15.515zm-403.399-31.03h387.885v-46.553H62.058v46.553z"
    />
  </svg>
);
const PayIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PaySvg} {...props} />
);
const PreviousSvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512.001 512.001"
    style={{
      enableBackground: "new 0 0 512.001 512.001",
      width:100,
      height:100
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#cff09e",
      }}
      d="M162.987 144.418 13.667 256l149.32 111.58z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="m466.897 256 43.862-95.787a13.668 13.668 0 0 0-1.639-14.084 13.676 13.676 0 0 0-13.247-5.05l-255.656 46.81c-7.424 1.36-12.341 8.48-10.981 15.905 1.36 7.424 8.475 12.344 15.905 10.981l229.842-42.083-31.889 69.641h-72.863c-7.547 0-13.667 6.119-13.667 13.667s6.12 13.667 13.667 13.667h72.863l31.889 69.641-298.328-54.624V144.418a13.666 13.666 0 0 0-21.848-10.947L5.486 245.051a13.671 13.671 0 0 0 0 21.898l149.32 111.582a13.661 13.661 0 0 0 14.303 1.269 13.669 13.669 0 0 0 7.544-12.218v-55.109l319.218 58.449a13.67 13.67 0 0 0 13.249-5.05 13.67 13.67 0 0 0 1.639-14.084L466.897 256zM149.32 340.307 36.499 255.999l112.821-84.307v168.615z"
    />
  </svg>
)
const PreviousIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PreviousSvg} {...props} />
);
const NextSvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512.001 512.001"
    style={{
      enableBackground: "new 0 0 512.001 512.001",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#cff09e",
      }}
      d="M349.014 144.42 498.334 256l-149.32 111.581z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M506.515 245.053 357.193 133.471a13.67 13.67 0 0 0-21.849 10.947v140.266L37.019 339.307l31.889-69.641h72.863c7.547 0 13.667-6.119 13.667-13.667s-6.12-13.667-13.667-13.667H68.907l-31.889-69.641 229.844 42.083c7.41 1.36 14.546-3.556 15.905-10.981 1.358-7.425-3.559-14.546-10.983-15.905L16.129 141.079a13.67 13.67 0 0 0-13.247 5.05 13.67 13.67 0 0 0-1.639 14.084L45.105 256 1.242 351.788a13.668 13.668 0 0 0 14.888 19.134l319.217-58.449v55.109a13.666 13.666 0 0 0 21.847 10.949l149.321-111.582a13.67 13.67 0 0 0 0-21.896zm-143.836 95.255V171.693l112.823 84.308-112.823 84.307z"
    />
  </svg>
)
const NextIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={NextSvg} {...props} />
);
const ResetSvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M256 415.494c-64.27 0-116.555-52.287-116.555-116.555 0-7.824 6.342-14.166 14.166-14.166 7.824 0 14.166 6.342 14.166 14.166 0 48.646 39.577 88.223 88.223 88.223s88.223-39.577 88.223-88.223c0-7.824 6.342-14.166 14.166-14.166s14.166 6.342 14.166 14.166c0 64.27-52.287 116.555-116.555 116.555z"
    />
    <path
      style={{
        fill: "#cff09e",
      }}
      d="m213.09 157.28 65.114-63.357v-70.15c0-8.524-10.292-12.81-16.342-6.805L120.469 157.28l141.393 140.312c6.05 6.005 16.342 1.718 16.342-6.805v-70.15L213.09 157.28z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M292.37 88.993v-65.22C292.37 10.664 281.683 0 268.547 0c-6.254 0-12.171 2.455-16.663 6.912L110.489 147.224a14.166 14.166 0 0 0 0 20.11l141.395 140.312c4.491 4.457 10.409 6.912 16.663 6.912h.001a23.877 23.877 0 0 0 16.348-6.451c4.821-4.503 7.474-10.654 7.474-17.322v-70.15c0-3.825-1.546-7.487-4.287-10.153l-54.679-53.204 43.086-41.923c92.252 10.226 164.239 88.648 164.239 183.582 0 101.859-82.869 184.728-184.728 184.728S71.272 400.799 71.272 298.94c0-7.824-6.342-14.166-14.166-14.166S42.94 291.116 42.94 298.94C42.94 416.422 138.518 512 256 512s213.06-95.578 213.06-213.06c0-105.086-76.473-192.639-176.69-209.947zm-28.332-1.051-60.826 59.185a14.163 14.163 0 0 0 0 20.306l60.826 59.185v53.176L140.579 157.28 264.038 34.766v53.176z"
    />
  </svg>
)
const ResetIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ResetSvg} {...props} />
);
const DoneSvg = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      style={{
        fill: "#cff09e",
      }}
      d="m115.139 267.756 121.578 104.858c11.079 9.555 27.485 9.555 38.563 0l121.578-104.858a46.69 46.69 0 0 0 16.196-35.353c0-39.953-46.922-61.448-77.177-35.353l-60.597 52.262c-11.079 9.555-27.485 9.555-38.563 0L176.12 197.05c-30.255-26.095-77.177-4.6-77.177 35.353a46.694 46.694 0 0 0 16.196 35.353z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M255.999 395.485a45.232 45.232 0 0 1-29.539-10.98L104.882 279.649a62.343 62.343 0 0 1-21.642-47.247c0-34.453 28.107-62.483 62.652-62.483 14.931 0 28.931 5.268 40.487 15.236l60.597 52.262a13.818 13.818 0 0 0 18.048 0l60.597-52.262c11.556-9.967 25.556-15.236 40.487-15.236 34.547 0 62.652 28.03 62.652 62.483a62.344 62.344 0 0 1-21.642 47.247l-121.58 104.858a45.242 45.242 0 0 1-29.539 10.978zM145.891 201.331c-15.357 0-31.241 11.622-31.241 31.072 0 9.02 3.917 17.57 10.747 23.461l121.58 104.858a13.822 13.822 0 0 0 18.048.002l121.58-104.858a30.954 30.954 0 0 0 10.747-23.461c0-19.45-15.885-31.072-31.241-31.072-7.294 0-14.199 2.632-19.973 7.611l-60.597 52.262c-8.209 7.078-18.699 10.978-29.539 10.978s-21.331-3.898-29.539-10.978l-60.597-52.262c-5.776-4.981-12.682-7.613-19.975-7.613z"
    />
    <path
      style={{
        fill: "#507c5c",
      }}
      d="M257.017 512c-141.158 0-256-114.842-256-256s114.842-256 256-256C385.162 0 494.285 95.678 510.85 222.555c1.123 8.6-4.939 16.483-13.541 17.606-8.589 1.114-16.483-4.939-17.606-13.541C465.175 115.333 369.44 31.411 257.017 31.411 133.177 31.411 32.428 132.16 32.428 256s100.749 224.589 224.589 224.589c88.898 0 169.569-52.551 205.521-133.879 3.505-7.934 12.778-11.523 20.714-8.015 7.934 3.507 11.522 12.781 8.015 20.714C450.29 452.105 358.342 512 257.017 512z"
    />
  </svg>
)
const DoneIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DoneSvg} {...props} />
);
export default function ShopCart(props: ShopCartProps) {
  let cart = useAppSelector((state: RootState) => state.cart.cart)
  const dispatch = useAppDispatch()
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const router = useRouter()
  const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms))
  const [current, setCurrent] = useState(0)
  
  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const onSubmit = async (values: any) => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))

    dispatch(
      clearCartTypeAction.fulfilled({
        productName: '',
        price: 0,
        imageProduct: '',
        productId: 0,
        quantity: 0,
      })
    )
    router.push('/menu')
  }
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
        const doc = await getDocs(q)
        const data = doc.docs[0].data()
        setName(data.name)
      } catch (err) {
        console.error(err)
        alert('An error occurred while fetching user data')
      }
    }
    if (loading) return
    if (!user) {
      fetchUserName()
      // router.push('/login')
    }
  }, [user, loading])

  console.log(user)
  const resetCart = () => {
    dispatch(
      clearCartTypeAction.fulfilled({
        productName: '',
        price: 0,
        imageProduct: '',
        productId: 0,
        quantity: 0,
      })
    )
    router.push('/menu')
  }

  const getTotalPrice = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
  }
  const steps = [
    {
      title: 'First',
      icon: <MailIcon/>,
    },
    {
      title: 'Second',
      icon: <UserIcon/>,
    },
    {
      title: 'Last',
      icon: <PayIcon/>,
    },
  ]
  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <Row style={{ width: '80%', margin: '0 auto', paddingTop: '2rem' }}>
            <Col span={10}>
              {cart.map((item: any) => (
                <Row gutter={32} style={{ border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>
                  <Col span={6}>
                    <Image src={item.imageProduct} height={150} width={150} />
                  </Col>
                  <Col span={12}>
                    <Title level={3}>{item.productName}</Title>
                    <Text disabled>
                      {item.quantity} x {'$' + item.price}
                    </Text>
                  </Col>
                  <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={4}>{'$' + item.quantity * item.price}</Title>
                  </Col>
                </Row>
              ))}
              <Row justify="end">
                <Title level={3}>Total: $ {getTotalPrice()}</Title>
              </Row>
            </Col>
            <Col span={14}>
              <Styles>
                <Form
                  onSubmit={onSubmit}
                  initialValues={{email: user?.email}}
                  render={({ handleSubmit, form, submitting, pristine, values, active }: any) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Steps current={current} style={{color: 'green'}}>
                          {steps.map((item) => (
                            <Step key={item.title} style={{backgroundColor: 'green !important'}} icon={item.icon}/>
                          ))}
                        </Steps>
                        <div className="steps-content" style={{ justifyContent: 'center' }}>
                          {current == 0 && (
                            <div style={{ width: '100%' }}>
                              <p style={{ marginRight: 10 }}>
                                {' '}
                                Already have account?{' '}
                                <Link href={'/login'}>
                                  <a style={{ color: 'green' }}>Login</a>
                                </Link>
                              </p>
                              <FieldInput
                                name="email"
                                component="input"
                                type="text"
                                placeholder="Email"
                              />
                            </div>
                          )}
                        </div>
                        <div className="steps-content" style={{ justifyContent: 'center' }}>
                          {current == 1 && (
                            <div>
                              <FieldInput
                                name="fullName"
                                component="input"
                                type="text"
                                placeholder="Name"
                                style={{ width: '100%', margin: '10px 0' }}
                              />
                              <FieldInput
                                name="phone"
                                component="input"
                                type="number"
                                placeholder="Phone number"
                                style={{ width: '100%', margin: '10px 0' }}
                              />
                              <FieldInput
                                name="address"
                                component="input"
                                type="text"
                                placeholder="Address"
                                style={{ width: '100%', margin: '10px 0' }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="steps-content" style={{ justifyContent: 'center' }}>
                          {current == 2 && (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <Cards
                                number={values.number || ''}
                                name={values.nameCard || ''}
                                expiry={values.expiry || ''}
                                cvc={values.cvc || ''}
                                focused={active}
                              />
                              <div>
                                <FieldInput
                                  name="number"
                                  component="input"
                                  type="text"
                                  pattern="[\d| ]{16,22}"
                                  placeholder="Card Number"
                                  format={formatCreditCardNumber}
                                  style={{ width: '100%', margin: '10px 0' }}
                                />
                              </div>
                              <div>
                                <FieldInput
                                  style={{ width: '100%', margin: '10px 0' }}
                                  name="nameCard"
                                  component="input"
                                  type="text"
                                  placeholder="Name"
                                />
                              </div>
                              <div style={{ display: 'flex' }}>
                                <FieldInput
                                  name="expiry"
                                  component="input"
                                  type="text"
                                  pattern="\d\d/\d\d"
                                  placeholder="Valid Thru"
                                  format={formatExpirationDate}
                                  style={{ width: '48%', margin: '10px 8px 10px 0' }}
                                />
                                <FieldInput
                                  name="cvc"
                                  component="input"
                                  type="text"
                                  pattern="\d{3,4}"
                                  placeholder="CVC"
                                  format={formatCVC}
                                  style={{ width: '48%', margin: '10px 0 10px 7px' }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="steps-action" style={{ justifyContent: 'center' }}>
                          {current > 0 && (
                            <Button icon={<PreviousIcon />} shape="circle" style={{right:155 }}onClick={() => prev()}/>
                              
                            
                          )}
                          {current < steps.length - 1 && (
                            <Button icon={<NextIcon />} shape="circle"  style={{left:200 }} onClick={() => next()}/>
                          )}
                          {current === steps.length - 1 && (
                            <Button htmlType="submit" icon={<DoneIcon/>} style={{left:200 }} disabled={submitting}/>
                              
                          )}

                          <Button
                            style={{ right:50 }}
                            icon={<ResetIcon />} shape="circle"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                            />
                        </div>
                        <h2>Values</h2>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                      </form>
                    )
                  }}
                />
              </Styles>
              <button className="dashboard__btn" onClick={logout}>
                Logout
              </button>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}
