const Mongoose = require('mongoose');

const NotificationSchema = Mongoose.Schema(
	{
		user_id: { type: String },
		url: { type: String, required: true },
		title: { type: String, required: true }
	},
	{ timestamps: true }
);


module.exports = Mongoose.model("notification", NotificationSchema);
