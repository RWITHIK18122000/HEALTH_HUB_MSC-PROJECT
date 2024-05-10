import axios from "../libs/axios";

import * as storageUtils from "../utils/storage";

export const addWeight = async (
	body = {
		date: "",
		weight: "",
	}
) => {
	const token = storageUtils.getToken();

	const { data } = await axios.post("weights/user", body, {
		headers: {
			Authorization: token,
		},
	});

	return data;
};

export const getUserWeights = async () => {
	const token = storageUtils.getToken();

	const { data } = await axios.get("weights/user", {
		headers: {
			Authorization: token,
		},
	});

	return data;
};
