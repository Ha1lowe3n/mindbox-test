import clsx from 'clsx';
import React, { ChangeEvent, useContext, useState, KeyboardEvent } from 'react';

import { AppContext } from '../../context/app.context';
import { Task } from '../Task/Task';

import styles from './Todolist.module.scss';

export const Todolist: React.FC = () => {
	const {
		tasks,
		currentFilter,
		changeFilter,
		createTask,
		changeTaskIsDone,
		clearCompletedTasks,
	} = useContext(AppContext);
	const [newTaskTitle, setNewTaskTitle] = useState<string>('');

	const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	};

	const createTaskHandler = () => {
		if (!!newTaskTitle.trim()) {
			createTask!(newTaskTitle);
			setNewTaskTitle('');
		}
	};

	const createTaskHandlerKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			createTaskHandler();
		}
	};

	const filterTasks =
		currentFilter === 'all'
			? tasks
			: currentFilter === 'active'
			? tasks.filter((task) => !task.isDone)
			: tasks.filter((task) => task.isDone);

	return (
		<div className={styles.todolist}>
			<span className={styles.title}>todos</span>
			<div className={styles.tasks}>
				<div className={styles.textField}>
					<input
						type="text"
						value={newTaskTitle}
						onChange={changeNewTaskTitle}
						onKeyDown={createTaskHandlerKeyboard}
						placeholder="What's need to be done?"
					/>
					<button className={styles.button} onClick={createTaskHandler}>
						+
					</button>
				</div>

				{/* здесь можно было бы сделать список li, но я не сделал это намеренно, т.к. делал
				плюс-минус по дизайну картинки в тз, и там сложно выделить какие-либо css свойства
				для списка, чтобы оборачивать таски в отдельный тег, да и семантика неважна, т.к. у
				нас CPA, а не SSR или SSG. Ну и не было пункта делать приложение для людей с
				ограниченными возможностями */}
				{filterTasks.map((task) => (
					<Task
						key={task.id}
						taskId={task.id}
						title={task.title}
						isDone={task.isDone}
						changeTaskIsDone={changeTaskIsDone!}
					/>
				))}

				<div className={styles.bottom}>
					<span className={styles.itemsCount}>
						{tasks.length} {tasks.length > 1 ? 'items' : 'item'} left
					</span>
					<div className={styles.buttonsFilter}>
						<button
							className={clsx(currentFilter === 'all' && styles.active)}
							onClick={() => changeFilter!('all')}
						>
							All
						</button>
						<button
							className={clsx(currentFilter === 'active' && styles.active)}
							onClick={() => changeFilter!('active')}
						>
							Active
						</button>
						<button
							className={clsx(currentFilter === 'completed' && styles.active)}
							onClick={() => changeFilter!('completed')}
						>
							Completed
						</button>
					</div>
					<button onClick={() => clearCompletedTasks!()}>Clear completed</button>
				</div>
			</div>
		</div>
	);
};
