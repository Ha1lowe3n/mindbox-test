import React from 'react';

import './App.css';
import { Todolist } from './components';

function App() {
	return (
		<div className="container">
			<div className="todolists">
				<Todolist />
			</div>
		</div>
	);
}

export default App;
