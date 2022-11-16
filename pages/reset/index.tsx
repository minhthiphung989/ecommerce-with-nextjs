import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../../firebase";
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox, Divider } from 'antd'
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons'
import styles from '../../styles/Home.module.scss'
import Link from "next/link";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()
  useEffect(() => {
    if (loading) return;
    if (user) router.push("/home");
  }, [user, loading]);
  return (
    <div className={styles.login}>
      {/* <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link href="/register">Register</Link> now.
        </div>
      </div> */}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        
       
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
        
        
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => sendPasswordReset(email)}
            className="login-form-button"
            style={{ margin: '10px 50px' }}
          >
            Send password reset email
          </Button>
        </Form.Item>
        <div style={{textAlign: 'center'}}>
        Don't have an account? <Link href="/">Register</Link> now.
        </div>
      </Form>
    </div>
  );
}
export default Reset;