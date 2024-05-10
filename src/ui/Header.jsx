import React from "react";
import { useMedication } from "../context/medicineContext";
import * as storageUtils from "../utils/storage";
import { Link } from "react-router-dom";

const Header = () => {
	const { user } = useMedication();

	const handleLogout = () => {
		storageUtils.logoutUser();
		window.location.href = "/";
	};
	return (
		<>
			<header className="flex items-center justify-between p-2 fixed  bg-black w-full">
				<Link
					to="/"
					className="text-xl sm:text-xl  md:text-3xl font-bold text-white">
					Health<span className="text-accent/80">App</span>
				</Link>
				{user ? (
					<button
						className="mt-3 text-accent/80 underline"
						onClick={handleLogout}>
						Log Out
					</button>
				) : (
					""
				)}
			</header>
			<div className="h-10"></div>
		</>
	);
};

export default Header;
