import { useState, useEffect } from 'react'
import {
	View,
	Text,
	TextInput,
	Alert,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { authenticate, getSession } from '../utils/storage'

export default function Login() {
	const router = useRouter()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		getSession().then(session => {
			if (session) router.replace('/')
		})
	}, [])

	async function handleLogin() {
		try {
			await authenticate(username, password)
			router.replace('/')
		} catch (err) {
			Alert.alert('Login Failed', err.message)
		}
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.card}>
				<Text style={styles.title}>Login</Text>
				<TextInput
					style={styles.input}
					placeholder="Username"
					placeholderTextColor="#999999"
					value={username}
					onChangeText={setUsername}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					placeholderTextColor="#999999"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<TouchableOpacity style={styles.neonBtn} onPress={handleLogin}>
					<Text style={styles.neonText}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.neonBtn, { backgroundColor: '#ff00ff' }]}
					onPress={() => router.push('/register')}
				>
					<Text style={[styles.neonText, { textShadowColor: '#ff00ff' }]}>
						Register Instead
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
}

const { width } = Dimensions.get('window')

const COLORS = {
	bg: '#121212',
	card: '#1f1f1f',
	text: '#f1f1f1',
	subtle: '#888888',
	primary: '#00ffff',
	border: '#2a2a2a',
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.bg,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	card: {
		backgroundColor: COLORS.card,
		width: '100%',
		maxWidth: 400,
		padding: 24,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: COLORS.text,
		textAlign: 'center',
		marginBottom: 24,
		fontFamily: 'monospace',
	},
	input: {
		backgroundColor: '#2a2a2a',
		color: COLORS.text,
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 16,
		marginBottom: 16,
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
	},
	neonText: {
		color: '#000000',
		fontSize: 16,
		fontWeight: '700',
		textShadowColor: COLORS.primary,
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 8,
		fontFamily: 'monospace',
	},
})
