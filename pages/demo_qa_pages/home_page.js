export class HomePage {
    constructor(page) {
        this.page = page;
        this.elements_card = page.locator('.card:nth-child(1)');  
        this.forms_card = page.locator('.card:nth-child(2)');
        this.alerts_frame_window_card = page.locator('.card:nth-child(3)');
        this.widgets_card = page.locator('.card:nth-child(4)');
        this.interactions_card = page.locator('.card:nth-child(5)');
        this.bookstore_card = page.locator('.card:nth-child(6)');
    }

}
