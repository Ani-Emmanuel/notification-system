const { Router } = require('express');
const _router = Router({ strict: true });
const noticationController = require('../controllers/notification_controller');

const Notification_Router = (redisclient) => {
	let noticationCtrl = new noticationController(redisclient);
	_router.post('/subscribe/topic1', (...args) =>
		noticationCtrl.addNotification(...args)
	);
	_router.post('/subscribe/topic2', (...args) =>
		noticationCtrl.addNotification(...args)
	);
	_router.get('/subscribe/topic1', (...args) =>
		noticationCtrl.getNotications(...args)
	);
	_router.get('/subscribe/topic2', (...args) =>
		noticationCtrl.getNotications(...args)
	);
	return _router;
};

module.exports = Notification_Router;
