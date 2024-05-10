const KEYS = {
	USER_TOKEN: "health_hub@token",
	USER: "health_hub@user",
};

export const getToken = () => {
	return localStorage.getItem(KEYS.USER_TOKEN);
};

export const setToken = (token) => {
	return localStorage.setItem(KEYS.USER_TOKEN, token);
};

export const getUser = () => {
	const strData = localStorage.getItem(KEYS.USER);
	return strData ? JSON.parse(strData) : null;
};

export const setUser = (data = {}) => {
	localStorage.setItem(KEYS.USER, JSON.stringify(data));
};

export const logoutUser = () => {
	localStorage.removeItem(KEYS.USER);
	localStorage.removeItem(KEYS.USER_TOKEN);
};
