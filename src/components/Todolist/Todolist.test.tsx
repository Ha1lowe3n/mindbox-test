import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import { AppContext } from '../../context/app.context';

const createTask = jest.fn();
const changeFilter = jest.fn();
const changeTaskIsDone = jest.fn();
const clearCompletedTasks = jest.fn();

const AppWithContext = () => (
	<AppContext.Provider
		value={{
			tasks: [],
			currentFilter: 'all',
			createTask,
			changeFilter,
			changeTaskIsDone,
			clearCompletedTasks,
		}}
	>
		<App />
	</AppContext.Provider>
);

test('createTask function called with click button', () => {
	render(<AppWithContext />);

	const inputForCreateTask = screen.getByPlaceholderText(/What's need to be done?/i);
	const btnForCreateTask = screen.getByText('+');

	expect(inputForCreateTask).toBeInTheDocument();
	expect(btnForCreateTask).toBeInTheDocument();

	userEvent.type(inputForCreateTask, 'new task');
	expect(inputForCreateTask).toHaveValue('new task');

	userEvent.click(btnForCreateTask);
	expect(createTask).toBeCalledTimes(1);
	expect(inputForCreateTask).toHaveValue('');
});

test('createTask function called with click key Enter', () => {
	render(<AppWithContext />);

	const inputForCreateTask = screen.getByPlaceholderText(/What's need to be done?/i);

	expect(inputForCreateTask).toBeInTheDocument();

	userEvent.type(inputForCreateTask, 'new task');
	expect(inputForCreateTask).toHaveValue('new task');

	fireEvent.keyDown(inputForCreateTask, { key: 'Enter' });
	expect(createTask).toBeCalledTimes(1);
	expect(inputForCreateTask).toHaveValue('');
});

test('changeFilter function called with click on buttons filter', () => {
	render(<AppWithContext />);

	const btnAll = screen.getByText('All');
	const btnActive = screen.getByText('Active');
	const btnCompleted = screen.getByText('Completed');

	expect(btnAll).toBeInTheDocument();
	expect(btnActive).toBeInTheDocument();
	expect(btnCompleted).toBeInTheDocument();

	userEvent.click(btnAll);
	expect(changeFilter).toBeCalledTimes(1);
	userEvent.click(btnActive);
	expect(changeFilter).toBeCalledTimes(2);
	userEvent.click(btnCompleted);
	expect(changeFilter).toBeCalledTimes(3);
});

test('clearCompletedTasks function called with click on button "Clear completed"', () => {
	render(<AppWithContext />);

	const btnClear = screen.getByText('Clear completed');

	expect(btnClear).toBeInTheDocument();

	userEvent.click(btnClear);
	expect(clearCompletedTasks).toBeCalledTimes(1);
});
