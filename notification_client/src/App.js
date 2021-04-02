import React, { useState } from 'react';
import './index.css';
import Setup from './setup';
import Notification from './notification';

const App = () => {
	let hash = window.location.hash;
	hash = hash ? hash.replace('#', '') : null;
	const [title, setUserId] = useState(hash);
	return title ? (
		<Notification title={title} />
	) : (
		<Setup setUserId={setUserId} />
	);
};

export default App;

