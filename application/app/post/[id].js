import { useLocalSearchParams } from 'expo-router';
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ScrollView,
	Dimensions,
	Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getData, saveData } from '../../utils/storage';

export default function PostDetail() {
	const { id } = useLocalSearchParams();
	const [post, setPost] = useState(null);
	const [comment, setComment] = useState('');

	useEffect(() => {
		const fetchPost = async () => {
			const posts = await getData('posts');
			if (!posts || !(id in posts)) {
				Alert.alert('Post not found');
				return;
			}
			setPost(posts[id]);
		};
		fetchPost();
	}, []);

	const like = async () => {
		const user = await getData('user');
		const posts = await getData('posts');
		if (!user || !posts || !(id in posts)) return;

		const postToUpdate = posts[id];
		if (!postToUpdate.likes.includes(user.username)) {
			postToUpdate.likes.push(user.username);
		}

		await saveData('posts', posts);
		setPost({ ...postToUpdate });
	};

	const addComment = async () => {
		if (!comment.trim()) return;

		const user = await getData('user');
		const posts = await getData('posts');
		if (!user || !posts || !(id in posts)) return;

		const postToUpdate = posts[id];
		postToUpdate.comments.push({ author: user.username, text: comment });

		await saveData('posts', posts);
		setPost({ ...postToUpdate });
		setComment('');
	};

	if (!post) return null;

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>{post.title}</Text>
				<Text style={styles.content}>{post.content}</Text>
				<Text style={styles.author}>By: {post.author}</Text>

				<View style={styles.button}>
					<Button title={`❤️ Like (${post.likes.length})`} onPress={like} color="#D55" />
				</View>

				<TextInput
					placeholder="Write a comment"
					value={comment}
					onChangeText={setComment}
					style={styles.input}
					placeholderTextColor="#777"
				/>

				<View style={styles.button}>
					<Button title="Add Comment" onPress={addComment} color="#55D" />
				</View>

				<Text style={styles.commentHeader}>Comments:</Text>
				{post.comments.map((c, i) => (
					<View key={i} style={styles.commentCard}>
						<Text style={styles.commentAuthor}>{c.author}</Text>
						<Text style={styles.commentText}>{c.text}</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const { width } = Dimensions.get('window');

const COLORS = {
	bg: '#121212',
	card: '#1f1f1f',
	text: '#f1f1f1',
	subtle: '#999',
	primary: '#0ff',
	accent: '#f55',
	border: '#2a2a2a',
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: COLORS.bg,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
		paddingHorizontal: 20,
	},
	card: {
		backgroundColor: COLORS.card,
		padding: 24,
		borderRadius: 16,
		width: '100%',
		maxWidth: 600,
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.4,
		shadowRadius: 10,
		elevation: 8,
		borderColor: COLORS.border,
		borderWidth: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: COLORS.text,
		marginBottom: 10,
		fontFamily: 'monospace',
	},
	content: {
		fontSize: 16,
		color: COLORS.text,
		marginBottom: 12,
		fontFamily: 'monospace',
	},
	author: {
		fontSize: 14,
		fontStyle: 'italic',
		color: COLORS.subtle,
		marginBottom: 20,
		fontFamily: 'monospace',
	},
	input: {
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 10,
		padding: 12,
		backgroundColor: '#2a2a2a',
		color: COLORS.text,
		fontFamily: 'monospace',
		marginBottom: 10,
	},
	button: {
		marginVertical: 10,
	},
	commentHeader: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.text,
		fontFamily: 'monospace',
	},
	commentCard: {
		backgroundColor: '#2a2a2a',
		borderRadius: 10,
		padding: 12,
		marginTop: 10,
		borderColor: COLORS.border,
		borderWidth: 1,
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 6,
	},
	commentAuthor: {
		color: COLORS.primary,
		fontWeight: '600',
		fontFamily: 'monospace',
		marginBottom: 4,
	},
	commentText: {
		color: COLORS.text,
		fontSize: 14,
		fontFamily: 'monospace',
	},
});
