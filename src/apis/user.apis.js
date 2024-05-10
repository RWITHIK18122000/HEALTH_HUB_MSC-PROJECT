import axios from "../libs/axios";

export const registerUser = async (
	body = {
		fullname: "",
		email: "",
		password: "",
		age: "",
		gender: "",
		medical_his: "",
	}
) => {
	await axios.post("/users/register", body);

	return true;
};

export const login = async (
	body = {
		email: "",
		password: "",
	}
) => {
	const { data } = await axios.post("/users/login", body);

	return data;
};
export const loginOTP = async (
	body = {
		number: "",
	}
) => {
	const { data } = await axios.post("/users/login-otp", body);

	return data;
};

export const requestForgetPassword = async (email) => {
	const { data } = await axios.post("/users/forgot-password", { email });

	return data;
};
export const changePassoword = async (
	body = {
		unique_code: "",
		password: "",
	}
) => {
	const { data } = await axios.post("/users/change-password", body);

	return data;
};
export const checkUserPhone = async (
	body = {
		number: "",
	}
) => {
	const { data } = await axios.post("/users/user-phone-exists", body);

	return data;
};
