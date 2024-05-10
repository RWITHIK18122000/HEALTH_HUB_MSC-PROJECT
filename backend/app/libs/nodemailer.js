const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "kumarsen.bash@gmail.com",
		pass: "hbki hvfg dwkp oxrs",
	},
});

module.exports.sendEmail = async (to, subject, text) => {
	try {
		let info = await transporter.sendMail({
			from: "healthhub@noreply.com",
			to: to,
			subject: subject,
			text: text,
		});

		console.log("Message sent: %s", info.messageId);
		return info;
	} catch (err) {
		console.error("Error sending email:", err);
		throw err;
	}
};
