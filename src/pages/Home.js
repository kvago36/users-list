import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { List, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Spinner from '../components/Spinner/Spinner'

import axios from '../axiosConfig'

const Home = () => {
	const [users, setUsers] = useState([])
	const [isLoading, setLoading] = useState(false)

	const getUsers = async () => {
		try {
			const response = await axios.get('/users?page=2')

      const { data } = await response.data

			setUsers(users.concat(data))
			setLoading(true)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		(async () => {
			await getUsers()
		})()
	}, [])

	return (
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
	);
}

const ListWrapper = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
`

export default Home;