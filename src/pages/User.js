import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Spinner from '../components/Spinner/Spinner'

import axios from '../axiosConfig'

const NotFound = () => <p>User not found</p>

const User = () => {
	const [user, setUser] = useState(null)
	const [notFound, setNotFound] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		const exist = id % 2

		if (!exist) {
			setNotFound(true)
		} else {
			getUser()
		}
	}, [])

	const getUser = async () => {
		try {
			const response = await axios.post('/users/2')

			const { data, ad } = await response.data

			setUser({ ...data, ad })
		} catch (error) {
			console.log(error)
		}
	}

	if (notFound) {
		return <NotFound />
	}

	if (!user) {
		return <Spinner />
	}

	return (
		<p>{id}</p>
	);
}
 
export default User;