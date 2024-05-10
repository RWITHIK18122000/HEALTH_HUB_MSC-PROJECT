const express = require("express");
const cors = require("cors");
const configs = require("./configs");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", routes);

app.listen(configs.PORT, () => {
	console.log("Backend is running on the port: " + configs.PORT);
});
