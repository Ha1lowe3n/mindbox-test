describe('App e2e test', () => {
	it('new task should be added', () => {
		cy.visit('/');

		cy.get('input[type="text"]').type('new task').should('have.value', 'new task');
		cy.contains('+').click();
		cy.contains('new task');
		cy.get('input[type="text"]').should('have.value', '');

		cy.get('[data-testid="task"]').should('have.length', 2);
	});

	it('task should change status', () => {
		cy.get('[data-testid="task"] > input[type="checkbox"]')
			.eq(0)
			.should('not.have.checked')
			.click()
			.should('have.checked');
	});

	it('todolist should change tasks filter', () => {
		cy.get('[data-testid="task"]').should('have.length', 2);
		cy.get('[data-testid="task"]').contains('hello');
		cy.get('[data-testid="task"]').contains('new task');

		// active
		cy.get('button').contains('Active').click();
		cy.get('[data-testid="task"]').should('have.length', 1);
		cy.get('[data-testid="task"]').contains('new task');
		cy.get('[data-testid="task"]').contains('hello').should('not.exist');

		// completed
		cy.get('button').contains('Completed').click();
		cy.get('[data-testid="task"]').should('have.length', 1);
		cy.get('[data-testid="task"]').contains('hello');
		cy.get('[data-testid="task"]').contains('new task').should('not.exist');

		// all
		cy.get('button').contains('All').click();
		cy.get('[data-testid="task"]').should('have.length', 2);
		cy.get('[data-testid="task"]').contains('hello');
		cy.get('[data-testid="task"]').contains('new task');
	});

	it('todolist should clear completed tasks', () => {
		cy.get('button').contains('Clear completed').click();
		cy.get('[data-testid="task"]').should('have.length', 1);
		cy.get('[data-testid="task"]').contains('new task');
		cy.get('[data-testid="task"]').contains('hello').should('not.exist');
	});
});
