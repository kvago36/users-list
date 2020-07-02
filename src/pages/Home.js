import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { List, Avatar, Row, Col, Form, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Layout from '../layout'
import UserForm from '../views/userForm'
import Spinner from '../components/Spinner/Spinner'

import axios from '../axiosConfig'

const Home = () => {
	const [users, setUsers] = useState([])
	const [form] = Form.useForm()

	const addUser = async values => {
		try {
			const response = await axios.post('/users', values)
			const { id, avatart, first_name, last_name, email } = await response.data

			form.resetFields()
			message.success('Пользователь добавлен', 2);
			setUsers(users.concat([{ id, avatart, first_name, last_name, email }]))
		} catch (error) {
			console.error(error)
		}
	}

	const getUsers = async () => {
		try {
			const response = await axios.get('/users?page=2')

			const { data } = await response.data

			setUsers(users.concat(data))
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		(async () => {
			await getUsers()
		})()
	}, [])

	return (
		<Layout>
			<Row>
				<Col span={6}>
					<ListWrapper>
						<InfiniteScroll
							initialLoad={false}
							pageStart={0}
							threshold={150}
							loader={<Spinner />}
							loadMore={getUsers}
							hasMore={true}
							useWindow={false}
						>
							<List
								itemLayout="horizontal"
								dataSource={users}
								renderItem={item => (
									<List.Item>
										<List.Item.Meta
											avatar={<Avatar src={item.avatar} />}
											title={<Link to={`users/${item.id}`}>{item.email}</Link>}
											description={`${item.first_name} ${item.last_name}`}
										/>
									</List.Item>
								)}
							/>
						</InfiniteScroll>
					</ListWrapper>
				</Col>
				<Col span={18}>
					<ContentWrapper>
						<UserForm title="Добавить пользователя" onSubmit={addUser} formInstance={form} />
					</ContentWrapper>
				</Col>
			</Row>
		</Layout>
	);
}

const H2 = styled.h2`

`

const ListWrapper = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
	height: 300px;
	background-color: #fff;
`

const ContentWrapper = styled.div`
	margin-left: 20px;
	padding: 20px 20px 20px 20px;
	border-radius: 4px;
	background-color: #fff;
`

export default Home;