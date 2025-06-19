import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { getData } from '../utils/storage'

export default function Layout() {
	const [loggedIn, setLoggedIn] = useState(null)

	useEffect(() => {
		getData('user').then(user => setLoggedIn(!!user))
	}, [])

	if (loggedIn === null) return null

	return (
		<Stack
			initialRouteName={loggedIn ? 'index' : 'login'}
			screenOptions={{
				headerShown: false,
			}}
		/>
	)
}
