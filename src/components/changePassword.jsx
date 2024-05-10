import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../ui/Button";
import { useMedication } from "../context/medicineContext";
import * as userAPIs from "../apis/user.apis";

const ChangePassword = () => {
	const [isLoading, setisLoading] = useState(false);
	const { register, handleSubmit } = useForm();
	const { code } = useParams();
	const navigate = useNavigate();
	const { user } = useMedication();

	const handleFormSubmit = async (data) => {
		try {
			setisLoading(true);
			const body = {
				unique_code: code,
				password: data.password.trim(),
				cpassword: data.cpassword.trim(),
			};

			if (body.password.length > 13 || body.password.length < 8) {
				toast.error(
					"Password cannot have characters more than 13 and less than 8"
				);
				return;
			}

			if (body.cpassword !== body.password) {
				toast.error("Passwords do not match!");
				return;
			}

			await userAPIs.changePassoword(body);
			toast.success("Password changed successfully!");
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
	}, [user]);

	return (
		<div className="login-form min-h-screen text-white bg-white/10 flex flex-col items-center pt-24 px-9">
			<h2 className="text-3xl sm:text-5xl tracking-tighter font-bold py-12">
				Change Password
			</h2>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
				<input
					type="password"
					name="password"
					placeholder="password"
					{...register("password", { required: true })}
					className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
				/>
				<input
					type="password"
					name="cpassword"
					placeholder="Confirm Password"
					{...register("cpassword", { required: true })}
					className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
				/>

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Change Password"}
				</Button>
			</form>
		</div>
	);
};

export default ChangePassword;
