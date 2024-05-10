import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import { useMedication } from "../context/medicineContext";
import * as userAPIs from "../apis/user.apis";
import * as storageUtils from "../utils/storage";
import * as helpers from "../utils/helper";
import Header from "../ui/Header";

const LoginForm = () => {
	const [isLoading, setisLoading] = useState(false);
	const { register, handleSubmit, getValues } = useForm();
	const navigate = useNavigate();
	const { user } = useMedication();

	const handleFormSubmit = async (data) => {
		try {
			setisLoading(true);
			const body = {
				email: data.email.trim(),
				password: data.password.trim(),
			};

			const user = await userAPIs.login(body);
			const userData = {
				Name: user.fullname,
				age: user.age,
				email: user.email,
				gender: user.gender === 1 ? "male" : "female",
				medicalHistory: user.medical_his,
				token: user.token,
			};
			storageUtils.setToken(user.token);
			storageUtils.setUser(userData);
			window.location.href = "/dashboard";
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

	const handleForgotPassword = async () => {
		try {
			const data = getValues();
			const body = {
				email: data.email?.trim(),
			};
			if (!helpers.validateEmail(body.email)) {
				toast.error("Please enter a valid email");
				return;
			}

			setisLoading(true);
			await userAPIs.requestForgetPassword(body.email);
			toast.success("Please check your email!");
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
		<>
			<Header />
			<div className="login-form min-h-screen text-white bg-white/10 flex flex-col items-center pt-24 px-9">
				<h2 className="text-3xl sm:text-5xl tracking-tighter font-bold py-12">
					Log In
				</h2>
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						{...register("email", { required: true })}
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						{...register("password", { required: true })}
						className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					/>

					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Loading..." : "Login"}
					</Button>

					<center>
						<Link type="submit" disabled={isLoading} to={"/login-otp"}>
							Login With Number
						</Link>
					</center>
				</form>
				<button
					onClick={handleForgotPassword}
					disabled={isLoading}
					className="mt-3 text-accent/80 underline">
					{isLoading ? "Loading..." : "Forgot Password?"}
				</button>
				<Link className="my-4 underline" to="/register">
					Register
				</Link>
			</div>
		</>
	);
};

export default LoginForm;
