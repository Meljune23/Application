import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native'
import { useEffect, useState } from 'react'
import { getData, logout } from '../utils/storage'
import { useRouter } from 'expo-router'

export default function Home() {
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState(null)
	const router = useRouter()

	useEffect(() => {
		getData('posts').then(data => {
			if (data) {
				setPosts(Object.values(data))
			}
		})

		getData('user').then(userData => {
			if (userData) {
				setUser(userData)
			}
		})
	}, [])

	const logoutt = async () => {
		await logout()
		router.replace('/login')
	}

	const renderPost = ({ item }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() => router.push(`/post/${item.id}`)}
		>
			<Text style={styles.cardTitle}>{item.title}</Text>
			<Text style={styles.cardAuthor}>By {item.author}</Text>
		</TouchableOpacity>
	)

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<Text style={styles.heading}>
					Welcome Back, {user?.username || 'Guest'}
				</Text>
				<TouchableOpacity
					style={[styles.neonBtn, { backgroundColor: '#ff5555' }]}
					onPress={logoutt}
				>
					<Text style={[styles.neonText, { textShadowColor: '#ff5555' }]}>Logout</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={styles.neonBtn} onPress={() => router.push('/create')}>
				<Text style={styles.neonText}>＋</Text>
			</TouchableOpacity>

			<FlatList
				data={posts}
				keyExtractor={(_, i) => i.toString()}
				renderItem={renderPost}
				contentContainerStyle={styles.list}
				ListEmptyComponent={
					<Text style={styles.empty}>Empty.</Text>
				}
			/>
		</View>
	)
}

const { width } = Dimensions.get('window')

const COLORS = {
	bg: '#121212',
	card: '#1f1f1f',
	text: '#f1f1f1',
	subtle: '#999999',
	primary: '#00ffff',
	accent: '#ff5555',
	border: '#2a2a2a',
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.bg,
		paddingHorizontal: 20,
		paddingTop: 50,
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: '700',
		color: COLORS.text,
		fontFamily: 'monospace',
	},
	neonBtn: {
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		alignItems: 'center',
		marginVertical: 8,
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.9,
		shadowRadius: 10,
		elevation: 10,
        marginBottom: 10,
        opacity: 0.8,
	},
	neonText: {
		color: '#000',
		fontSize: 16,
		fontWeight: '700',
		textShadowColor: COLORS.primary,
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 8,
		fontFamily: 'monospace',
	},
	card: {
		backgroundColor: COLORS.card,
		padding: 16,
		borderRadius: 12,
		marginBottom: 14,
		borderColor: COLORS.border,
		borderWidth: 1,
	},
	cardTitle: {
		color: COLORS.text,
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'monospace',
	},
	cardAuthor: {
		color: COLORS.subtle,
		marginTop: 6,
		fontSize: 14,
		fontFamily: 'monospace',
	},
	list: {
		paddingBottom: 30,
	},
	empty: {
		color: COLORS.subtle,
		textAlign: 'center',
		marginTop: 50,
		fontSize: 16,
		fontFamily: 'monospace',
	},
})
