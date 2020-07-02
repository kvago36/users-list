import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Button, Descriptions, message } from 'antd'

import Layout from '../layout'
import NotFound from '../components/NotFound/NotFound'
import Spinner from '../components/Spinner/Spinner'

import axios from '../axiosConfig'


const User = () => {
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
			<Descriptions title="Пользователь">
				<Descriptions.Item label="id">{user.id}</Descriptions.Item>
				<Descriptions.Item label="First name">{user.first_name}</Descriptions.Item>
				<Descriptions.Item label="Last name">{user.last_name}</Descriptions.Item>
				<Descriptions.Item label="Email">{user.email}</Descriptions.Item>
			</Descriptions>
			<Button onClick={deleteUser} danger>Удалить пользователя</Button>
		</Layout>
	);
}
 
export default User;