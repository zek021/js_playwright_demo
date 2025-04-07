export class Header {
    constructor(page) {
        this.page = page;
        this.user_cart = page.locator('.shopping_cart_link');
        this.app_name_header = page.locator('.app_logo');
        this.page_title_header = page.locator('.title[data-test="title"]');
        this.burger_menu_button = page.locator('#react-burger-menu-btn');
    }
}
