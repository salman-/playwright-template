import { expect, Page } from "@playwright/test";

class BasicPage {

    page: Page;

    public constructor(page: Page) {
        this.page = page;
    }
}

export default BasicPage;