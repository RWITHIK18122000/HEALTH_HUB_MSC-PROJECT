import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useMedication } from "../context/medicineContext";

import * as appointmentAPIS from "../apis/appointments.apis";
import * as helpers from "../utils/helper";

const AppointmentForm = () => {
	const [isLoading, setisLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();
	const { addSchedule } = useMedication();

	const handleFormSubmit = async (data) => {
		setisLoading(true);

		try {
			const body = {
				date: data.scheduledDate,
				type: data.checkupType,
			};

			await appointmentAPIS.addAppointment(body);
			addSchedule({ ...data, completed: false });
		} catch (error) {
			helpers.APIerrorMessageHandler(error);
		} finally {
			setisLoading(false);
		}
		reset();
		navigate("/dashboard");
	};

	return (
		<div className="health-checkup-scheduler min-h-screen text-white bg-white/10 flex flex-col items-center pt-24 px-9">
			<h2 className="text-3xl sm:text-5xl tracking-tighter font-bold py-12">
				Health Checkup Scheduler
			</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
				<input
					type="text"
					name="checkupType"
					placeholder="Type of Checkup"
					{...register("checkupType")}
					className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
				/>
				<input
					type="datetime-local"
					name="scheduledDate"
					placeholder="Scheduled Date"
					{...register("scheduledDate")}
					className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Schedule Checkup"}
				</Button>
			</form>
		</div>
	);
};

export default AppointmentForm;
