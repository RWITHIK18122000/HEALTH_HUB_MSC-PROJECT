import { toast } from "react-toastify";

export function getCurrentDate() {
	const today = new Date();
	let day = today.getDate();
	let month = today.getMonth() + 1;
	const year = today.getFullYear();

	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}

	return `${year}-${month}-${day}`;
}

export const APIerrorMessageHandler = (error) => {
	if (error?.response?.data?.message) {
		toast.error(error?.response?.data?.message);
		return;
	}
	console.log(error);
	toast.error("something went wrong!");
};

export function validateFullName(fullName) {
	// Regular expression to match alphabets and spaces
	const regex = /^[A-Za-z ]+$/;
	return regex.test(fullName);
}

export function isOnlyDigits(str) {
	const regex = /^\d+$/;
	return regex.test(str);
}

export function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
}

export function validatePhoneNumber(phoneNumber) {
	const universalRegex = /^\+[1-9]\d{1,14}$/;

	return universalRegex.test(phoneNumber);
}
