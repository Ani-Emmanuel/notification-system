import React, { useEffect, useState } from 'react';
import './index.css';
import socket from 'socket.io-client';
const { REACT_APP_BASE_URL, REACT_APP_SOCKET_URL } = process.env;
const io = socket.connect(`${REACT_APP_SOCKET_URL}/notification`);

const Notification = ({ title }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [oldNotification, setOldNotification] = useState([]);
	const [isconnected, setConnected] = useState(false);
	const [values, setValues] = useState({
		url: ''
	});

	// let isconnected = false;
	let interval = undefined;

	useEffect(() => {
		if (!isconnected) {
			interval = setInterval(monitoSocketConnection, 1000);
		} else {
			clearInterval(interval);
		}
		getOldNotification();
	}, []);

	const monitoSocketConnection = () => {
		if (io.connected) {
			io.emit('online', { title: title });
			getNotifications();
			setConnected(true);
			clearInterval(interval);
		}
	};

	//the code here is will always cause the entire state to reload
	//once a new data is added
	//am currently out of time for reason of not been a 100% and must submit

	const getNotifications = () => {
		io.on('new_notification', (data) => {
			console.log('data in notifiation', data);
			setOldNotification((allNotiications) => {
				return [JSON.parse(data), ...allNotiications];
			});
			io.emit('notification_recieved', JSON.parse(data).to);
		});
	};

	const toggleAddModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const addNotif = (e) => {
		e.preventDefault();
		toggleAddModal();
		clearForm();
	};

	const handleInputChange = (key, val) => {
		setValues({
			...values,
			[key]: val
		});
	};

	const clearForm = () => {
		setValues({});
	};

	//this logic rightly should be abstracted from here, but due i started this
	// and had to submit in a short time. i had to just add this here
	const submit = () => {
		let dataToPost = { ...values, title: title };
		console.log(dataToPost);
		fetch(`${REACT_APP_BASE_URL}/notification/subscribe/${title}`, {
			body: JSON.stringify(dataToPost),
			headers: {
				accept: 'application/json',
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then((res) => res)
			.then((res) => {
				clearForm();
			})
			.catch((error) => {})
			.finally(() => {
				toggleAddModal();
			});
	};

	const getOldNotification = () => {
		fetch(`${REACT_APP_BASE_URL}/notification/subscribe/${title}`, {
			headers: {
				accept: 'application/json'
			},
			method: 'GET'
		})
			.then((res) => res.json())
			.then((res) => {
				setOldNotification([...res.data.reverse()]);
			})
			.catch((error) => {});
	};

	return (
		<div id='notifPage'>
			<div id='title'>
				<div>
					<h2>Notifications</h2>
					<p>Notifications on available food menu</p>
				</div>

				<p onClick={toggleAddModal}>Add new</p>
			</div>

			<section id='notificationList'>
				{oldNotification &&
					oldNotification.map((x, index) => (
						<div className='notif-item' key={index}>
							<div>
								<h4>"url" : {x.url}</h4>
								<p>"topic" : {x.title}</p>
							</div>
						</div>
					))}
			</section>

			{isModalVisible && (
				<div id='modalOverlay' className='d-flex justify-content-centre'>
					<div>
						<h3>
							Add New Notification
							<span onClick={toggleAddModal}>&times;</span>
						</h3>
						<form onSubmit={addNotif}>
							<div className='form-group'>
								<textarea
									rows={4}
									className='form-control'
									required
									onChange={(e) => handleInputChange('url', e.target.value)}
									defaultValue={values.description}
									placeholder='Enter url'
								/>
								<div></div>
							</div>
							<input
								type='button'
								onClick={submit}
								className='btn btn-primary'
								value='Send Notification'
							/>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Notification;
