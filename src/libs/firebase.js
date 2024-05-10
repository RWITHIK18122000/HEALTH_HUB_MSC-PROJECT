import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAKn_tULfGuDPCYEwFcpue32B5bKcVP10U",
	authDomain: "baitho-59100.firebaseapp.com",
	projectId: "baitho-59100",
	storageBucket: "baitho-59100.appspot.com",
	messagingSenderId: "448774381681",
	appId: "1:448774381681:web:e60d57906a47a3a9ecfbd0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
