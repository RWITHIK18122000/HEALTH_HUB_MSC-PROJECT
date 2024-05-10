import axios from "../libs/axios";

import * as storageUtils from "../utils/storage";

export const addAppointment = async (
	body = {
		date: "",
		type: "",
	}
) => {
	const token = storageUtils.getToken();

	const { data } = await axios.post("appointments/user", body, {
		headers: {
			Authorization: token,
		},
	});

	return data;
};

export const getAppointments = async () => {
	const token = storageUtils.getToken();

	const { data } = await axios.get("appointments/user", {
		headers: {
			Authorization: token,
		},
	});

	return data;
};
