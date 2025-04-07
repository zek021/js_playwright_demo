import { sleep } from "../../aux_function/aux_function";

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.all_add_to_cart_button = page.locator('.pricebar button');
        this.all_item_name = page.locator('.inventory_item_name');
        this.all_item_description = page.locator('.inventory_item_desc');        
        this.all_remove_to_cart_button = page.locator('.pricebar button[data-test*="remove-"]');        
    }


    async add_to_cart_item_by_index(index) {
        await this.all_add_to_cart_button.nth(index).click();
        const count = await this.all_remove_to_cart_button.nth(index).count();
    }
    async get_item_name_by_index(index) {
        return this.all_item_name.nth(index).innerText();
    }
    async get_item_description_by_index(index) {
        return this.all_item_description.nth(index).innerText();
    }

    

}
