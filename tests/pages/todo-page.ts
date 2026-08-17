import { expect, Page } from "@playwright/test";
import BasicPage from "./basic-page";

class ToDoPage extends BasicPage {

  public constructor(page: Page) {
    super(page);
  }

  async addNewItemToList(item: string) {
    const newTodo = this.page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(item);
    await newTodo.press('Enter');
    // Needs to be done box should be empty
    await expect(newTodo).toBeEmpty();
  }

  async verifyItemsOnList(expectedItemsOnList: string[]) {
    await expect(this.page.getByTestId('todo-title')).toHaveText(expectedItemsOnList);
    await this.checkNumberOfTodosInLocalStorage(expectedItemsOnList.length);
  }

  async checkNumberOfTodosInLocalStorage(expected: number) {
    return await this.page.waitForFunction((e) => {
      return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
  }

  async checkNumberOfCompletedTodosInLocalStorage(

    expected: number
  ) {
    return await this.page.waitForFunction((e) => {
      return (
        JSON.parse(localStorage['react-todos']).filter(
          (todo: any) => todo.completed
        ).length === e
      );
    }, expected);
  }

  async checkTodosInLocalStorage(title: string) {
    return await this.page.waitForFunction((t) => {
      return JSON.parse(localStorage['react-todos'])
        .map((todo: any) => todo.title)
        .includes(t);
    }, title);
  }

  async createDefaultTodos(TODO_ITEMS: readonly string[]) {
    const newTodo = this.page.getByPlaceholder('What needs to be done?');

    for (const item of TODO_ITEMS) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }
  }
}

export default ToDoPage;