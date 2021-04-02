const url = require('url');
const NotificationService = require('../services/notification_service');

class Notification_Controller {
	constructor(redisclient) {
		if (!redisclient) {
			throw new Error(
				'controller expects a typeof redisclient but got ' + typeof redisclient
			);
		}
		this._publisher = redisclient.duplicate();
		this._redisclient = redisclient;
	}

	async addNotification(req, res, next) {
		try {
			const { url } = req.body;
			const index = req.url.lastIndexOf('/');
			const channel = req.url.slice(index + 1);
			const _noticiationService = new NotificationService(
				this._redisclient,
				channel
			);
			const record = await _noticiationService.saveNotification(url, channel);

			res.status(record.status).send(record);
		} catch (error) {
			next(error);
		}
	}

	async getNotications(req, res, next) {
		try {
			const index = req.url.lastIndexOf('/');
			const channel = req.url.slice(index + 1);
			const _noticiationService = new NotificationService(
				this._redisclient,
				channel
			);
			const record = await _noticiationService.getNotifications(channel);
			console.log(record);
			res.status(record.status).send(record);
		} catch (error) {
			res.status(error.status).send(error);
		}
	}
}


module.exports = Notification_Controller;