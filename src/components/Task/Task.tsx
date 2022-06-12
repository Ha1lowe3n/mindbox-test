import React, { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import styles from './Task.module.scss';

interface indexProps {}

export const Task: React.FC<indexProps> = () => {
	const [done, setDone] = useState<boolean>(false);

	console.log(done);

	const changeDone = () => setDone(!done);

	return (
		<div className={styles.task}>
			<div className={styles.checkBox} onClick={changeDone}>
				{done && <div className={styles.checkIcon}></div>}
			</div>
			<span className={clsx(styles.taskTitle, done && styles.checked)}>task</span>
		</div>
	);
};
