import React from 'react'
import styled from 'styled-components'
import { Layout, Button } from 'antd';
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { useStores } from '../hooks/use-stores';

const { Header, Content } = Layout;

const headerStyle = {
	padding: '0 18px',
	textAlign: 'end'
}

const layoutStyle = {
	height: '100%'
}

const contentStyle = {
	height: 'calc(100% - 64px)'
}

const LayoutWrapper = observer(({ children }) => {
	const { userStore } = useStores()
	const history = useHistory()

	const logout = () => {
		userStore.singOut()
		history.push('/login')
	}

	return (
		<Layout style={layoutStyle}>
			<Header style={headerStyle}>
				<Button onClick={logout} type="primary">Выход</Button>
			</Header>
			<Content>
				<Wrapper>
					{children}
				</Wrapper>
			</Content>
		</Layout>
	)
})

const Wrapper = styled.div`
	margin: 20px;
	border-radius: 4px;
`

export default LayoutWrapper