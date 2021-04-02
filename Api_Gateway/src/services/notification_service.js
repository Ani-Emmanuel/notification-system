const { json } = require('express');
const Notification_Model = require('../models/notification_model');

class Notification {
	constructor(redisclient, topic) {
		this._publisher = redisclient.duplicate();
		this.subsciber = redisclient.duplicate();

		this.subsciber.subscribe(topic);
		let jsonData;

		this.subsciber.on('message', (channel, message) => {
			switch (channel) {
				case 'topic1':
					jsonData = JSON.parse(message);
					this.saveNotification(jsonData.url, jsonData.topic);
					break;

				case 'topic2':
					jsonData = JSON.parse(message);
					this.saveNotification(jsonData.url, jsonData.topic);
					break;

				default:
					break;
			}
		});
	}

	async saveNotification(url, topic) {
		try {
			if (url && topic) {
				const payload = {
					url: url,
					title: topic
				};
				const data = await Notification_Model.create(payload);
				console.log(data);
				//Publish a message for notification service here
				if (data) {
					delete data._id;
					this._publisher.publish(topic.toString(), JSON.stringify(data));
					return { success: true, data: data, status: 201 };
				}
			} else {
				return {
					success: false,
					error: new Error('incomplete message'),
					status: 400
				};
			}
		} catch (error) {
			//log error here later
			return { success: false, error: error, status: 500 };
		}
	}

	async getNotifications(channel) {
		try {
			console.log(channel);
			const data = await Notification_Model.find(
				{ title: channel },
				{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
			);
			if (data) {
				console.log(data);
				return { success: true, data: data, status: 200 };
			}
		} catch (error) {
			return { success: false, error: error, status: 500 };
		}
	}
}

module.exports = Notification;
