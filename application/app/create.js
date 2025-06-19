import { useState } from 'react'
import {
	View,
	TextInput,
	StyleSheet,
	Dimensions,
	Alert,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	Text,
} from 'react-native'
import { getData, saveData, getSession } from '../utils/storage'
import { useRouter } from 'expo-router'

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export default function CreatePost() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const router = useRouter()

	const submit = async () => {
		const user = (await getData('user')) || (await getSession())
		if (!user) return Alert.alert('Not logged in')

		if (!title.trim() || !content.trim()) {
			Alert.alert('Missing Fields', 'Please enter both title and content.')
			return
		}

		const posts = (await getData('posts')) || {}
		const id = uuid()

		const newPost = {
			id,
			title: title.trim(),
			content: content.trim(),
			author: user.username,
			likes: [],
			comments: [],
		}

		posts[id] = newPost
		await saveData('posts', posts)
		router.replace('/')
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.container}
		>
			<View style={styles.card}>
				<TextInput
					placeholder="Post Title"
					placeholderTextColor="#999"
					value={title}
					onChangeText={setTitle}
					style={styles.input}
				/>
				<TextInput
					placeholder="Write something..."
					placeholderTextColor="#999"
					value={content}
					onChangeText={setContent}
					style={[styles.input, styles.textArea]}
					multiline
					numberOfLines={5}
				/>
				<TouchableOpacity style={styles.neonBtn} onPress={submit}>
					<Text style={styles.neonText}>Post</Text>
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
		padding: width * 0.05,
	},
	card: {
		backgroundColor: COLORS.card,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: COLORS.border,
		padding: 24,
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
	textArea: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	neonBtn: {
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 8,
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
