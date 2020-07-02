import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Button, Descriptions, message } from 'antd'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons';

import Layout from '../layout'
import UserForm from '../views/userForm'
import NotFound from '../components/NotFound/NotFound'
import Spinner from '../components/Spinner/Spinner'

import axios from '../axiosConfig'

const User = () => {
	const [isEditing, setEditing] = useState(false)
	const [user, setUser] = useState(null)
	const [notFound, setNotFound] = useState(false)
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {
		const exist = id % 2

		if (!exist) {
			setNotFound(true)
		} else {
			getUser()
		}
	}, [])

	const deleteUser = async () => {
		try {
			const response = await axios.delete('/users/2')
			const status = await response.status

			if (status === 204) {
				message.success('Пользователь удален', 1, () => history.push('/'));
			}
		} catch (error) {
			console.error(error)
		}
	}

	const getUser = async () => {
		try {
			const response = await axios.get('/users/2')

			const { data, ad } = await response.data

			setUser({ ...data, ad })
		} catch (error) {
			console.log(error)
		}
	}

	const editUser = async values => {
		const { first_name, last_name, email } = values
		try {
			const response = await axios.put('/users/2', values)
			const status = await response.status

			if (status === 200) {
				setEditing(false)
				setUser({ ...user, first_name, last_name, email })
			}
		} catch (error) {
			console.error(error)
		}

		setEditing(!isEditing)
	}


	const toggleForm = () => setEditing(!isEditing)

	if (notFound) {
		return (
			<Layout>
				<NotFound />
			</Layout>
		)
	}

	if (!user) {
		return (
			<Layout>
				<Spinner />
			</Layout>
		)
	}

	return (
		<Layout>
			<DescriptionsWrapper>
				<h2>Пользователь</h2>
				{
					isEditing ? <UserForm initialValues={user} onSubmit={editUser} /> : (
						<Descriptions>
						<Descriptions.Item span={3} label="First name">{user.first_name}</Descriptions.Item>
						<Descriptions.Item span={3} label="Last name">{user.last_name}</Descriptions.Item>
						<Descriptions.Item span={3} label="Email">{user.email}</Descriptions.Item>
					</Descriptions>
					)
				}
				<ButtonsWrapper>
					<Button type={isEditing ? 'primary' : 'dashed'} style={{ marginRight: '15px' }} onClick={toggleForm} icon={<EditOutlined />} />
					<Button danger onClick={deleteUser}>Удалить пользователя</Button>
				</ButtonsWrapper>
			</DescriptionsWrapper>
		</Layout>
	);
}

const ButtonsWrapper = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	display: flex;
`

const DescriptionsWrapper = styled.div`
	padding: 20px;
	background-color: #fff;
	border-radius: 4px;
	position: relative;
`

export default User;