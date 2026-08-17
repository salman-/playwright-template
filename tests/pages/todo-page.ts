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
  }

}

export default ToDoPage;