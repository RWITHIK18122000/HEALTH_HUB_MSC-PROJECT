import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMedication } from "../context/medicineContext";
import Button from "../ui/Button";
import { getCurrentDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";

import * as weightsAPIS from "../apis/weights.apis";
import * as helpers from "../utils/helper";

const WeightTracker = () => {
	const [isLoading, setisLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm();
	const { setWeightData } = useMedication();
	const navigate = useNavigate();

	async function onSubmit(data) {
		setisLoading(true);

		try {
			const newEntry = { date: data.date, weight: data.weight };
			await weightsAPIS.addWeight(newEntry);

			setWeightData((prevData) => [...prevData, newEntry]);

			reset();
			navigate("/dashboard");
		} catch (error) {
			helpers.APIerrorMessageHandler(error);
		} finally {
			setisLoading(false);
		}
	}

	return (
		<div className="max-w-md mx-auto p-6  text-gray-800  rounded-lg shadow-2xl">
			<h2 className="text-2xl sm:text-5xl mt-20 text-white font-semibold mb-6 text-center">
				Weight Tracker
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Date:
						<input
							type="date"
							{...register("date")}
							className="mt-1 bg-white/[7%] outline-none ring-accent/50 transition text-white/60 px-3 focus:ring-2 focus:bg-white/10 h-10 block w-full input-date"
							required
						/>
						min={getCurrentDate()}
					</label>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						<input
							type="number"
							{...register("weight")}
							placeholder="Weight (Kg)"
							className="form-input mt-1  bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10 h-10 block w-full"
							required
						/>
					</label>
				</div>
				<Button width="full" type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Submit"}
				</Button>
			</form>
			{/* <WeightChart weightData={weightData} /> */}
		</div>
	);
};

export default WeightTracker;
