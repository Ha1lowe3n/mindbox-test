import React, { ChangeEvent, useState } from 'react';

import styles from './Todolist.module.scss';

interface indexProps {}

export const Todolist: React.FC<indexProps> = () => {
	const [newTaskTitle, setNewTaskTitle] = useState<string>('');

	const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	};

	return (
		<div className={styles.todolist}>
			<span className={styles.title}>todolist</span>
			<div className={styles.tasks}>
				<div className={styles.textField}>
					<input
						type="text"
						value={newTaskTitle}
						onChange={changeNewTaskTitle}
						placeholder="What's need to be done?"
						// className={styles.textField}
					/>
				</div>
			</div>
		</div>
	);
};
