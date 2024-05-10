/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

import * as storageUtils from "../utils/storage";

import { getAppointments } from "../apis/appointments.apis";
import { getUserMedications } from "../apis/meds.apis";
import { getUserWeights } from "../apis/weights.apis";
import { APIerrorMessageHandler } from "../utils/helper";

async function getUserData() {
	const [meds, apps, weights] = await Promise.all([
		getUserMedications(),
		getAppointments(),
		getUserWeights(),
	]);

	return {
		meds: meds.map((v) => ({
			name: v.med_name,
			dosage: v.dosage,
			frequency: v.freq,
			schedule: v.schedules,
		})),

		apps: apps.map((v) => ({
			checkupType: v.type,
			scheduledDate: v.date,
			completed: v.is_completed,
		})),

		weights: weights.map((v) => ({
			date: v.date.split("T")[0],
			weight: v.weight_kg,
		})),
	};
}

const MedicationContext = createContext();

export const MedicationProvider = ({ children }) => {
	const [medicines, setMedicines] = useState([
		{
			name: "Medicine A",
			dosage: "1 pill",
			frequency: "daily",
			schedule: "09:00",
		},
		{
			name: "Medicine B",
			dosage: "2 pills",
			frequency: "twice a day",
			schedule: "10:00, 18:00",
		},
	]);
	const [weightData, setWeightData] = useState([
		{
			date: "2023-04-01",
			weight: 40,
		},
		{
			date: "2023-04-07",
			weight: 60,
		},
		{
			date: "2023-04-09",
			weight: 50,
		},
	]);
	const [schedule, setSchedule] = useState([
		{
			checkupType: "Health checkup",
			scheduledDate: "2024-05-09",
			completed: false,
		},
	]);

	const [user, setUser] = useState(storageUtils.getUser());

	const addSchedule = (newAppointment) => {
		setSchedule((prevAppointment) => [...prevAppointment, newAppointment]);
	};
	const addMedicines = (newMedicines) => {
		setMedicines((prevMedicines) => [...prevMedicines, newMedicines]);
	};

	useEffect(() => {
		async function run() {
			try {
				const d = await getUserData();

				setMedicines(d.meds);
				setSchedule(d.apps);
				setWeightData(d.weights);
			} catch (err) {
				// APIerrorMessageHandler(err);
			}
		}

		run();
	}, []);

	return (
		<MedicationContext.Provider
			value={{
				medicines,
				addMedicines,
				weightData,
				setWeightData,
				schedule,
				addSchedule,
				user,
				setUser,
			}}>
			{children}
		</MedicationContext.Provider>
	);
};

export const useMedication = () => {
	const context = useContext(MedicationContext);
	if (!context) {
		throw new Error("useMedication must be used within a MedicationProvider");
	}
	return context;
};
