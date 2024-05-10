import { Link, Navigate } from "react-router-dom";
import Button from "../ui/Button";
import * as storageUtils from "../utils/storage";
import Header from "../ui/Header";

const buttonData = [
	{ name: "Register", path: "/register" },
	{ name: "Login", path: "/Login" },
];

function Homepage() {
	const userData = storageUtils.getUser();

	if (userData) {
		return <Navigate to={"/dashboard"} />;
	}

	return (
		<div>
			<Header />
			<div className="pb-8 bg-white/[7%] flex flex-col items-center pt-24 md:pt-56 ">
				<h1 className="text-4xl font-bold tracking-tighter text-white md:text-6xl">
					Welcome to Medication Adherence App
				</h1>
				<p className="text-white/60 py-9 ">
					This application helps you manage your medication schedule, stay on
					track with your health checkups, and maintain a healthy lifestyle.
				</p>
				<ul className="space-x-3  ">
					{buttonData.map((btn) => (
						<Link to={btn.path} key={btn.name}>
							<Button>{btn.name}</Button>
						</Link>
					))}
				</ul>
			</div>
			<div className="bg-gradient-to-br from-gray-900 to-black">
				<div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
					<div className="h-32 md:h-40"></div>

					<p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
						Register Now
					</p>
					<div className="h-10"></div>
					<p className="max-w-2xl text-xl text-gray-400 md:text-2xl">
						One-stop access to all your health services and records.
					</p>

					<div className="h-32 md:h-40"></div>

					<div className="grid gap-8 md:grid-cols-2">
						<div className="flex flex-col justify-center">
							<h2 className="text-4xl font-bold">Health A-Z</h2>
							<div className="h-6"></div>

							<div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
								<div>
									<p className="font-semibold text-gray-400">
										Reach Your Goals
									</p>
									<div className="h-4"></div>
									<p className="text-gray-400">Track Weight, Stay Motivated</p>
								</div>
								<div>
									<p className="font-semibold text-gray-400">
										It&apos;s easy to understand
									</p>
									<div className="h-4"></div>
									<p className="text-gray-400">
										Very simple and easy to use application
									</p>
								</div>
							</div>
						</div>
						<div>
							<div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
						</div>
					</div>

					<div className="h-32 md:h-40"></div>

					<p className="text-4xl">
						<span className="text-gray-400">
							Empower your well-being with our app,
						</span>

						<span className="text-gray-600">
							{" "}
							helping you manage meds, schedule checkups, and live a healthier
							you
						</span>
					</p>

					<div className="h-32 md:h-40"></div>

					<div className="grid gap-4 md:grid-cols-3">
						<div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black">
							<p className="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14">
								1
							</p>
							<div className="h-6"></div>
							<p className="text-3xl">Personalised Recommendation</p>
						</div>
						<div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black">
							<p className="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14">
								2
							</p>
							<div className="h-6"></div>
							<p className="text-3xl">Medication Reminder System</p>
						</div>
						<div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black">
							<p className="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14">
								3
							</p>
							<div className="h-6"></div>
							<p className="text-3xl">Manage Health Appointments</p>
						</div>
					</div>

					<div className="h-40"></div>

					<div className="grid gap-8 md:grid-cols-3">
						<div className="flex flex-col justify-center md:col-span-2">
							<p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600">
								Be Aware
							</p>
							<h2 className="text-4xl font-bold">
								Healthier You With HealthApp
							</h2>
							<div className="h-6"></div>
							<p className="text-xl text-gray-400 md:pr-10">
								Empower your well-being. Manage meds, visualize weight trends, &
								schedule checkups
							</p>
						</div>
						<div>
							<div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
						</div>
					</div>

					<div className="h-10 md:h-40"></div>

					<div className="grid gap-4 md:grid-cols-4">
						<ul className="space-y-1 text-gray-400">
							<li className="pb-4 text-gray-400">Social networks</li>
							<li>
								<a href="#" className="hover:underline">
									Twitter
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Linkedin
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Facebook
								</a>
							</li>
						</ul>
						<ul className="space-y-1 text-gray-400">
							<li className="pb-4 text-gray-400">Locations</li>
							<li>
								<a href="#" className="hover:underline">
									Paris
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									New York
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									London
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Singapour
								</a>
							</li>
						</ul>
						<ul className="space-y-1 text-gray-400">
							<li className="pb-4 text-gray-400">Company</li>
							<li>
								<a href="#" className="hover:underline">
									The team
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									About us
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Our vision
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Join us
								</a>
							</li>
						</ul>
						<ul className="space-y-1 text-gray-400">
							<li className="pb-4 text-gray-400">
								Subscribe to our news channel
							</li>
							<li>
								<a
									href="/"
									target="_blank"
									className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black">
									Subscribe
								</a>
							</li>
						</ul>
					</div>
					<div className="h-12"></div>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
