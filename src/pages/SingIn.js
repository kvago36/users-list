import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router' 
import { observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useStores } from '../hooks/use-stores'

import axios from '../axiosConfig'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = observer(() => {
  const [ isLoading, setloading ] = useState(false)
  const [ authorization, setAuthorization ] = useState(false)
  const { userStore } = useStores()

  const onRedirect = () => {
    userStore.signIn({ email: 'eve.holt@reqres.in', token: 'QpwL5tke4Pnpja7X4' })
    setAuthorization(true)
  }

  const onFinish = async values => {
    const { email, password } = values

    setloading(true)

    message
    .loading('Загрузка...')

    try {
      const response = await axios.post('/login', { email, password })

      const { token, error } = await response.data

      message.destroy()

      if (error) {
        message.error('Ошибка', 3);
        return;
      }

      message.success('Добро пожаловать', 2);
      userStore.signIn({ email, token })
      setTimeout(() => setAuthorization(true), 200)
    } catch (error) {
      message.error('Ошибка', 3);
      console.error(error)
    } finally {
      setloading(false)
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  if (authorization) {
    return <Redirect to='' />
  }

  return (
    <Wrapper>
      <Form
        {...layout}
        size="middle"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { 
              required: true,
              message: 'Введите ваш email'
            },
            {
              type: 'email',
              message: 'Неправильный формат email',
            },
          ]}
        >
          <Input name="email" prefix={<UserOutlined style={{ color: '#b5b5b5' }} />} placeholder="email" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password name="password" prefix={<LockOutlined style={{ color: '#b5b5b5' }} />} placeholder="пароль" autoComplete="new-password" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button disabled={isLoading} type="primary" htmlType="submit">Войти</Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="dashed" htmlType="button" onClick={onRedirect}>Redirect to Home page</Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  background: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Login