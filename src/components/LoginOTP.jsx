import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
	RecaptchaVerifier,
	signInWithPhoneNumber,
	getAuth,
} from "firebase/auth";

import Button from "../ui/Button";
import { useMedication } from "../context/medicineContext";
import * as userAPIs from "../apis/user.apis";
import * as storageUtils from "../utils/storage";
import * as helpers from "../utils/helper";
import { auth } from "../libs/firebase";
import Header from "../ui/Header";

const LoginOTP = () => {
	const [isLoading, setisLoading] = useState(false);
	const navigate = useNavigate();
	const { user } = useMedication();
	const [firebaseConfirmResult, setfirebaseConfirmResult] = useState(null);
	const [isOtpOpen, setIsOtpOpen] = useState(false);
	const [number, setnumber] = useState(null);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			setisLoading(true);

			const data = new FormData(e.target);

			const body = {
				number: data.get("number").trim(),
			};

			if (body.number.length > 20 || body.number.length < 6) {
				toast.error(
					"Phone number length cannot be more than 11 digits and no less than 6"
				);
				return;
			}

			await userAPIs.checkUserPhone(body);

			const auth = getAuth();

			window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
				size: "invisible",
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					// console.log(response);
				},
			});

			const appVerifier = window.recaptchaVerifier;

			const resp = await signInWithPhoneNumber(
				auth,
				`${body.number}`,
				appVerifier
			);

			setfirebaseConfirmResult(resp);
			setIsOtpOpen(true);
			setnumber(body.number);

			toast.success("OTP sent successfully!");
		} catch (error) {
			if (error.code === "auth/invalid-phone-number") {
				toast.error("Please provide country code in you number.");
				return;
			}

			if (error?.response?.data?.message) {
				toast.error(error?.response?.data?.message);
				return;
			}

			toast.error("something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	const handleOTPSubmit = async (e) => {
		e.preventDefault();
		try {
			setisLoading(true);

			const data = new FormData(e.target);

			const body = {
				otp: data.get("otp").trim(),
			};

			if (!helpers.isOnlyDigits(body.otp)) {
				toast.error("otp must be a number");
				return;
			}

			await firebaseConfirmResult.confirm(body.otp);

			const user = await userAPIs.loginOTP({ number });
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
			console.log(error);
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

	const OTPForm = () => (
		<form
			onSubmit={handleOTPSubmit}
			className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
			<input
				type="number"
				name="otp"
				placeholder="OTP"
				className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
				required
			/>

			<Button id="sign-in-button" type="submit" disabled={isLoading}>
				{isLoading ? "Loading..." : "Login"}
			</Button>
		</form>
	);

	const NumberForm = () => {
		return (
			<form
				onSubmit={handleFormSubmit}
				className="flex flex-col gap-y-5 rounded-lg sm:w-3/4 w-full lg:w-2/4">
				<input
					type="tel"
					name="number"
					placeholder="Enter Phone Number With Country Code"
					className="w-full h-10 rounded bg-white/[7%] outline-none ring-accent/50 transition text-white px-3 focus:ring-2 focus:bg-white/10"
					required
				/>

				<Button id="sign-in-button" type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Request OTP"}
				</Button>
			</form>
		);
	};

	return (
		<>
			<Header />
			<div className="login-form min-h-screen text-white bg-white/10 flex flex-col items-center pt-24 px-9">
				<h2 className="text-3xl sm:text-5xl tracking-tighter font-bold py-12">
					Log in with number
				</h2>
				{isOtpOpen ? <OTPForm /> : <NumberForm />}
				<div id="recaptcha-container" className="justify-center flex"></div>
				<center>
					<Link
						type="submit"
						className="my-2"
						disabled={isLoading}
						to={"/login"}>
						Login With Email
					</Link>
				</center>
			</div>
		</>
	);
};

export default LoginOTP;
