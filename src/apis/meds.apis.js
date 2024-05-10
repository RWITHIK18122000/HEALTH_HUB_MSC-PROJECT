import axios from "../libs/axios";

import * as storageUtils from "../utils/storage";

export const addMedication = async (
	body = {
		med_name: "",
		dosage: "",
		freq: "",
		schedules: "",
	}
) => {
	const token = storageUtils.getToken();

	const { data } = await axios.post("meds/user", body, {
		headers: {
			Authorization: token,
		},
	});

	return data;
};

export const getUserMedications = async () => {
	const token = storageUtils.getToken();

	const { data } = await axios.get("meds/user", {
		headers: {
			Authorization: token,
		},
	});

	return data;
};
