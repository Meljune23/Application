import { useState } from 'react'
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
import { saveUser } from '../utils/storage'
import { useRouter } from 'expo-router'

export default function Register() {
	const router = useRouter()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function handleRegister() {
		try {
			await saveUser(username, password)
			Alert.alert('Success', 'Account created. You can now log in.')
			router.replace('/login')
		} catch (err) {
			Alert.alert('Register Failed', err.message)
		}
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.card}>
				<Text style={styles.title}>Register</Text>
				<TextInput
					placeholder="Username"
					placeholderTextColor="#999"
					style={styles.input}
					onChangeText={setUsername}
					value={username}
				/>
				<TextInput
					placeholder="Password"
					placeholderTextColor="#999"
					secureTextEntry
					style={styles.input}
					onChangeText={setPassword}
					value={password}
				/>
				<TouchableOpacity style={styles.neonBtn} onPress={handleRegister}>
					<Text style={styles.neonText}>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.neonBtn, { backgroundColor: '#f0f' }]}
					onPress={() => router.replace('/login')}
				>
					<Text style={[styles.neonText, { textShadowColor: '#f0f' }]}>
						Back to Login
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
	primary: '#0ff',
	border: '#2a2a2a',
	subtle: '#888',
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
		color: '#000',
		fontSize: 16,
		fontWeight: '700',
		textShadowColor: COLORS.primary,
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 8,
		fontFamily: 'monospace',
	},
})
