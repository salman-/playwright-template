import { expect, type Page, test } from '@playwright/test';
import ToDoPage from './pages/todo-page';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
];


test.describe('New Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc');
  });
  test('should allow me to add todo items', async ({ page }) => {
    // Given: There is an item already in list
    const toDoPage = new ToDoPage(page);
    await toDoPage.addNewItemToList(TODO_ITEMS[0]);
    await toDoPage.verifyItemsOnList([TODO_ITEMS[0]]);

    // When: A new item is added to the list
    await toDoPage.addNewItemToList(TODO_ITEMS[1]);

    // Then: There are 2 items on list
    await toDoPage.verifyItemsOnList([TODO_ITEMS[0], TODO_ITEMS[1]]);
  });
});

test.describe('Mark all as completed', () => {
  let toDoPage: ToDoPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc');
    toDoPage = new ToDoPage(page);
    await toDoPage.createDefaultTodos(TODO_ITEMS);
    await toDoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test.afterEach(async ({ page }) => {
    await toDoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    // Complete all todos.
    await page.getByLabel('Mark all as complete').check();

    // Ensure all todos have 'completed' class.
    await expect(page.getByTestId('todo-item')).toHaveClass([
      'completed',
      'completed',
      'completed',
    ]);
    await toDoPage.checkNumberOfCompletedTodosInLocalStorage(3);
  });
});
