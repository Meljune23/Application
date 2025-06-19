import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

// Save new user
export async function saveUser(username, password) {
  const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || {};
  if (users[username]) throw new Error('User already exists');
  users[username] = { password };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Authenticate user and create session
export async function authenticate(username, password) {
  const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || {};
  if (!users[username]) throw new Error('User not found');
  if (users[username].password !== password) throw new Error('Invalid password');
  const user = { username };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  await AsyncStorage.setItem('user', JSON.stringify(user));
}

// Get session
export async function getSession() {
  return JSON.parse(await AsyncStorage.getItem(SESSION_KEY));
}

// Logout
export async function logout() {
  await AsyncStorage.removeItem(SESSION_KEY);
  await AsyncStorage.removeItem('user');
}

// Generic get/save
export async function getData(key) {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export async function saveData(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}