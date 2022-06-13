import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import { AppContext } from '../../context/app.context';

const changeTaskIsDone = jest.fn();

const AppWithContext = () => (
	<AppContext.Provider
		value={{
			tasks: [{ id: '123', title: 'task', isDone: false }],
			currentFilter: 'all',
			changeTaskIsDone,
		}}
	>
		<App />
	</AppContext.Provider>
);

test('changeTaskIsDone function called with click on select', () => {
	render(<AppWithContext />);

	const selectIsDone = screen.getByTestId('select isDone');

	expect(selectIsDone).toBeInTheDocument();

	userEvent.click(selectIsDone);
	expect(changeTaskIsDone).toBeCalledTimes(1);
});
