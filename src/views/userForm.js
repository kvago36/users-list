import React from 'react'
import { Form, Button, Input } from 'antd';

const tailLayout = {
  wrapperCol: { offset: 2 },
};

const UserForm = ({ formInstance, title, initialValues, onSubmit }) => {
	return (
		<>
			<h2>{title}</h2>
			<Form initialValues={initialValues} form={formInstance} labelCol={{ span: 2 }} wrapperCol={{ span: 12 }} layout="horizontal" onFinish={onSubmit}>
				<Form.Item
					name="first_name"
					label="Имя"
					rules={[{ required: true, message: 'Введите ваше имя' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="last_name"
					label="Фамилия"
					rules={[{ required: true, message: 'Введите вашу фамилию' }]}
				>
					<Input />
				</Form.Item>
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
					<Input name="email" placeholder="email" autoComplete="off" />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">Сохранить</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default UserForm