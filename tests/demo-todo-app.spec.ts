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

