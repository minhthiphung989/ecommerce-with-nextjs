import { Badge, Button, Col, Divider, Input, Row, Steps, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form } from 'react-final-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import Cards from '../../components/Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../../components/CreditCard'
import Styles from '../../components/Styles'
import { auth } from '../../firebase'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearCartTypeAction } from '../../store/reducer/reducer'
import { FieldInput, StepBtnContainer } from './style'
import { QrcodeOutlined } from '@ant-design/icons'
import { QrReader, QrReaderProps } from 'react-qr-reader'
// import QrReader from 'react-qr-reader'
const { Title, Text } = Typography
const { Step } = Steps
export interface IAppProps {}

export default function App(props: IAppProps) {
  let cart = useAppSelector((state: RootState) => state.cart.cart)
  const dispatch = useAppDispatch()
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const router = useRouter()
  const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')

  const handleScan = async (scanData: any) => {
    setLoadingScan(true)
    console.log(`loaded data data`, scanData)
    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData)
      setData(scanData)
      setStartScan(false)
      setLoadingScan(false)
      // setPrecScan(scanData);
    }
  }
  const handleError = (err: any) => {
    console.error(err)
  }
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
  const steps = [
    {
      title: 'First',
    },
    {
      title: 'Second',
    },
    {
      title: 'Last',
    },
  ]
  return (
    <div>
      <Row>
        <Col span={18}>
          <Styles>
            <Form
              onSubmit={onSubmit}
              initialValues={{ email: user?.email }}
              render={({ handleSubmit, form, submitting, pristine, values, active }: any) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Steps type="navigation" current={current}>
                      {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                      ))}
                    </Steps>
                    <div
                      className="steps-content"
                      style={{ justifyContent: 'center', padding: '0 100px' }}
                    >
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
                    <div
                      className="steps-content"
                      style={{ justifyContent: 'center', padding: '0 100px' }}
                    >
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
                    <StepBtnContainer className="steps-action">
                      {current > 0 && (
                        <Button className="step-btn btn-pre" onClick={() => prev()}>
                          pre
                        </Button>
                      )}
                      <Button
                        className="step-btn btn-reset"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        reset
                      </Button>
                      {current === steps.length - 1 && (
                        <Button
                          className="step-btn btn-done"
                          htmlType="submit"
                          disabled={submitting}
                        >
                          done
                        </Button>
                      )}
                      {current < steps.length - 1 && (
                        <Button className="step-btn btn-next" onClick={() => next()}>
                          next
                        </Button>
                      )}
                    </StepBtnContainer>
                    <h2>Values</h2>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </form>
                )
              }}
            />
          </Styles>
        </Col>
        <Col span={6} style={{ background: '#F8FAFB', padding: '0 50px', height: '100vh' }}>
          <Row style={{ paddingTop: '62px' }}>
            <Title level={2}>Shopping Cart</Title>
          </Row>
          <Divider />
          {cart.map((item: any) => (
            <Row gutter={24}>
              <Col span={8}>
                <Badge count={item.quantity}>
                  <Image
                    src={item.imageProduct}
                    height={90}
                    width={90}
                    style={{ borderRadius: '5px' }}
                  />
                </Badge>
              </Col>
              <Col span={16}>
                <Title level={3}>{item.productName}</Title>
                <Text disabled>{'$' + item.price}</Text>
              </Col>
            </Row>
          ))}
          <Row gutter={24}>
            <Col span={8}>
              <Badge count={2}>
                <Image
                  style={{ borderRadius: '5px' }}
                  src={
                    'https://nhaxinh.com/wp-content/uploads/sb-instagram-feed-images/311112105_1123570475218547_559743346419505712_nlow.jpg'
                  }
                  height={90}
                  width={90}
                />
              </Badge>
            </Col>
            <Col span={16}>
              <Title level={3}>Sofa</Title>
              <Text disabled>$9598</Text>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Badge count={2}>
                <Image
                  style={{ borderRadius: '5px' }}
                  src={
                    'https://nhaxinh.com/wp-content/uploads/sb-instagram-feed-images/311112105_1123570475218547_559743346419505712_nlow.jpg'
                  }
                  height={90}
                  width={90}
                />
              </Badge>
            </Col>
            <Col span={16}>
              <Title level={3}>Sofa</Title>
              <Text disabled>$9598</Text>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Badge count={2}>
                <Image
                  style={{ borderRadius: '5px' }}
                  src={
                    'https://nhaxinh.com/wp-content/uploads/sb-instagram-feed-images/311112105_1123570475218547_559743346419505712_nlow.jpg'
                  }
                  height={90}
                  width={90}
                />
              </Badge>
            </Col>
            <Col span={16}>
              <Title level={3}>Sofa</Title>
              <Text disabled>$9598</Text>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Input></Input>
            {/* <Button
              icon={<QrcodeOutlined style={{ color: 'black' }} />}
              onClick={() => {
                setStartScan(!startScan)
              }}
            /> */}
            <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
            {startScan && (
              <div>
                {/* <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select> */}
                <h1>scan</h1>
                <QrReader
                      constraints={{ facingMode: selected }}
                      scanDelay={1000}
                      // onError={handleError}
                      onResult={handleScan}
                      containerStyle={{ width: "300px" }}
                    />
          
              </div>
            )}
            
          </Row>
          <Divider />
          <Row>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
              <Text>Sub total</Text>
              <Text>Shipping</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', textAlign: 'end' }}>
              <Text>$123,045</Text>
              <Text>Freeship</Text>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
              <Text>Total</Text>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', textAlign: 'end' }}>
              <Text>$123,045</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
