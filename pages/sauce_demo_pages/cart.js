export class CartPage {
    constructor(page) {
        this.page = page;
        this.all_remove_button = page.locator('.pricebar button');  
        this.all_item_name = page.locator('.inventory_item_name');
        this.all_item_description = page.locator('.inventory_item_desc');
        this.user_cart = page.locator('.shopping_cart_link');
        this.app_name_header = page.locator('.app_logo');
        this.page_title_header = page.locator('.title[data-test="title"]');
        this.continue_shopping_button = page.locator('#continue-shopping');
    }

    async remove_from_cart_item_by_index(index) {
        await this.all_add_to_cart_button.nth(index).click();
    }
    async get_item_name_by_index(index) {
        await this.all_item_name.nth(index).innerText();
    }
    async get_item_description_by_index(index) {
        await this.all_item_description.nth(index).innerText();
    }

    

}
