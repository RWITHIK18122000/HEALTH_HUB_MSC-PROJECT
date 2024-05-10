import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../ui/Button";
import { useMedication } from "../context/medicineContext";
import * as userAPIs from "../apis/user.apis";
import * as helpers from "../utils/helper";
import Header from "../ui/Header";

const SignupForm = () => {
	const [isLoading, setisLoading] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();
	const { user } = useMedication();
	const handleFormSubmit = async (data) => {
		try {
			setisLoading(true);
			const body = {
				fullname: data.Name.trim(),
				email: data.email.trim(),
				number: data.number.trim(),
				age: data.age.trim(),
				gender: data.gender.trim(),
				medical_his: data.medicalHistory.trim(),
				password: data.password.trim(),
			};

			if (!helpers.validateFullName(body.fullname)) {
				toast.error("Name can only contain alphabets.");
				return;
			}

			if (!helpers.validatePhoneNumber(body.number)) {
				toast.error(
					"Invalid phone number. Enter phone number with country code and without spaces."
				);
				return;
			}

			if (body.password.length > 13 || body.password.length < 8) {
				toast.error(
					"Password cannot have characters more than 13 and less than 8"
				);
				return;
			}

			await userAPIs.registerUser(body);

			reset();
			navigate("/login");
		} catch (error) {
			if (error?.response?.data?.message) {
				toast.error(error?.response?.data?.message);
				return;
			}

			toast.error("something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, []);

	return (
		<>
			<Header />
			<div className="signup-form min-h-screen text-white bg-white/10 flex flex-col items-center pt-24 px-9">
				<h2 className="text-3xl sm:text-5xl  tracking-tighter font-bold py-12">
					Sign Up
				</h2>
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
					<input
						type="text"
						name="Name"
						placeholder="Full name"
						{...register("Name", { required: true })}
						required=""
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						{...register("email", { required: true })}
						required=""
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>
					<input
						type="text"
						name="number"
						placeholder="Enter Phone Number With Country Code"
						{...register("number", { required: true })}
						required=""
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						{...register("password", { required: true })}
						required=""
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>

					<input
						type="number"
						name="age"
						placeholder="Age"
						{...register("age", { required: true })}
						required=""
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>
					<select
						name="gender"
						{...register("gender", { required: true })}
						required=""
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10">
						<option value="">Select Gender</option>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</select>
					<textarea
						name="medicalHistory"
						placeholder="Medical History"
						{...register("medicalHistory", { required: true })}
						required=""
						className="w-full h-32 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 py-2 focus:ring-2 focus:bg-white/10"></textarea>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Loading..." : "Sign Up"}
					</Button>
				</form>
				<Link className="my-4 underline" to="/login">
					Login
				</Link>
			</div>
		</>
	);
};

export default SignupForm;
