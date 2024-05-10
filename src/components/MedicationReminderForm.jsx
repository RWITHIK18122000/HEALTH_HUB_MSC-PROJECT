/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMedication } from "../context/medicineContext";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

import * as medsAPI from "../apis/meds.apis";
import * as helpers from "../utils/helper";

import "react-toastify/dist/ReactToastify.css";

const MedicationReminderForm = () => {
	const [isLoading, setisLoading] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const { addMedicines } = useMedication();
	const navigate = useNavigate();
	const handleFormSubmit = async (data) => {
		try {
			setisLoading(true);

			const body = {
				med_name: data.name,
				dosage: data.dosage,
				freq: data.frequency,
				schedules: data.schedule,
			};

			await medsAPI.addMedication(body);

			reset();
			addMedicines(data);
			navigate("/dashboard");
		} catch (error) {
			helpers.APIerrorMessageHandler(error);
		} finally {
			setisLoading(false);
		}
	};
	return (
		<div className="medication-reminder-form min-h-screen text-white bg-white/10 flex flex-col items-center pt-24 px-9">
			<h2 className="text-3xl sm:text-5xl  tracking-tighter font-bold py-12">
				Add Medication
			</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
				<input
					type="text"
					name="name"
					placeholder="Name"
					{...register("name")}
					className="w-full h-10 rounded  bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10  "
				/>
				<input
					type="text"
					name="dosage"
					placeholder="Dosage"
					{...register("dosage")}
					className="w-full h-10 rounded  bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10 "
				/>
				<input
					type="text"
					name="frequency"
					placeholder="Frequency"
					{...register("frequency")}
					className="w-full h-10 rounded  bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10 "
				/>

				<input
					type="text"
					name="schedule"
					placeholder="Schedule (Example 10:00, 18:00)"
					{...register("schedule")}
					className="w-full h-10 rounded  bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Save Medication"}
				</Button>
			</form>
		</div>
	);
};

export default MedicationReminderForm;
