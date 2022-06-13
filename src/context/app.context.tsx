import { createContext, ReactNode, useState } from 'react';
import { nanoid } from 'nanoid';

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};
type FilterType = 'all' | 'active' | 'completed';
type AppContextType = {
	tasks: TaskType[];
	currentFilter: FilterType;
	createTask?: (title: string) => void;
	changeFilter?: (filter: FilterType) => void;
	changeTaskIsDone?: (taskId: string) => void;
	clearCompletedTasks?: () => void;
};
type AppContextProviderPropsType = {
	children: ReactNode;
};

export const AppContext = createContext<AppContextType>({
	tasks: [],
	currentFilter: 'all',
});

export const AppContextProvider: React.FC<AppContextProviderPropsType> = ({ children }) => {
	const [tasksState, setTasksState] = useState<TaskType[]>([
		{ id: nanoid(), title: 'hello', isDone: false },
	]);
	const [filter, setFilter] = useState<FilterType>('all');

	const createTask = (title: string) => {
		setTasksState([...tasksState, { id: nanoid(), title, isDone: false }]);
	};

	const changeTaskIsDone = (taskId: string) => {
		setTasksState(
			tasksState.map((task) =>
				task.id === taskId ? { ...task, isDone: !task.isDone } : task,
			),
		);
	};

	const changeFilter = (filter: FilterType) => setFilter(filter);

	const clearCompletedTasks = () => {
		setTasksState(tasksState.filter((task) => !task.isDone));
	};

	return (
		<AppContext.Provider
			value={{
				tasks: tasksState,
				currentFilter: filter,
				createTask,
				changeFilter,
				changeTaskIsDone,
				clearCompletedTasks,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
