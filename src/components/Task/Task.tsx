import React from 'react';
import clsx from 'clsx';

import styles from './Task.module.scss';

type TaskPropsType = {
	taskId: string;
	title: string;
	isDone: boolean;
	changeTaskIsDone: (taskId: string) => void;
};

export const Task: React.FC<TaskPropsType> = ({ title, taskId, isDone, changeTaskIsDone }) => {
	const changeDone = () => changeTaskIsDone(taskId);

	return (
		<div className={styles.task} data-testid="task">
			<input
				type="checkbox"
				checked={isDone}
				className={styles.checkBox}
				onChange={changeDone}
				data-testid="select isDone"
			/>
			{isDone && <div className={styles.checkIcon}></div>}
			<span className={clsx(styles.taskTitle, isDone && styles.checked)}>{title}</span>
		</div>
	);
};
