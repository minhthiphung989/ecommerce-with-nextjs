import React, { useEffect, useState } from 'react'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import { Form, Input, Button, Checkbox, Divider } from 'antd'
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) router.push('/checkout')
  }, [user, loading])
  return (
    <div className={styles.login}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>LOGIN</h2>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={signInWithGoogle}
            className="login-form-button"
            style={{ margin: '10px 50px' }}
          >
            Log in with Google <GoogleOutlined />
          </Button>
        </Form.Item>
        <Divider>OR</Divider>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked"  noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" href="/reset">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item style={{display:'flex', justifyContent: 'space-around'}}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => logInWithEmailAndPassword(email, password)}
            className="login-form-button"
          >
            Log in
          </Button>
            Or <Link href="/register"> Register now!</Link>
        </Form.Item>
      </Form>
      {/* <div className={styles.login__container}>
      <h2>LOGIN</h2>
        <input
          type="text"
          className={styles.login__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.login__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className={styles.login__btn}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google <GoogleOutlined />
        </button>
        <div>
          <Link href="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link href="/register">Register</Link> now.
        </div>
      </div> */}
    </div>
  )
}
export default Login
