import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/sauce_demo_pages/login';
import { InventoryPage } from '../pages/sauce_demo_pages/inventory';
import { Header } from '../pages/sauce_demo_pages/header';
import { CartPage } from '../pages/sauce_demo_pages/cart';
import { getEnvVariable, sleep } from '../aux_function/aux_function';

// Apply slowMo globally for all tests in this file (100ms delay)
test.use({
    launchOptions: {
        slowMo: 100,  // Slows down every action by 100ms globally in all tests
    },
});

test.beforeEach(async ({ page }) => {
    globalThis.fe_url = getEnvVariable('SAUCE_DEMO_URL');
    globalThis.user_1 = getEnvVariable('SAUCE_DEMO_USER_1', true);
    const Login = new LoginPage(page);
    //actions
    await page.goto(fe_url);
    await Login.login(user_1['username'], user_1['password']);
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

});

test('JIRA-001 : Verify Item Added to Cart is Present in the Users Cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const header = new Header(page);
    let item_count = await inventory.all_add_to_cart_button.count();
    let inventory_item_name = new Array(item_count);
    let inventory_item_description = new Array(item_count);
    let cart_item_name = new Array(item_count);
    let cart_item_description = new Array(item_count);
 
    for (let i = 0; i < item_count; i++) {
        // Code to be executed for each iteration
        inventory.add_to_cart_item_by_index(i);
        inventory_item_name.push(await inventory.get_item_name_by_index(i));
        inventory_item_description.push(await inventory.get_item_description_by_index(i))
        await sleep(150);
    }
    await header.user_cart.click();

    for (let i = 0; i < item_count; i++) {
        // Code to be executed for each iteration
        cart_item_name.push(await inventory.get_item_name_by_index(i));
        cart_item_description.push(await inventory.get_item_description_by_index(i))
        expect(inventory_item_name[i]).toBe(cart_item_name[i]);
        expect(inventory_item_description[i]).toBe(cart_item_description[i]);
    }
});

test('JIRA-002 : Verify add to cart button change when item is added to card', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const header = new Header(page);  
    let item_count = await inventory.all_add_to_cart_button.count();
    for (let i = 0; i < item_count; i++) {
        // Extract the Text and the text styles
        let add_to_cart_button_text = await inventory.all_add_to_cart_button.nth(i).innerText();
        let add_to_cart_button_font_style = await inventory.all_add_to_cart_button.nth(i).evaluate(el => window.getComputedStyle(el).fontFamily);
        let add_to_cart_button_font_color = await inventory.all_add_to_cart_button.nth(i).evaluate(el => window.getComputedStyle(el).color);
        let add_to_cart_button_font_size = await inventory.all_add_to_cart_button.nth(i).evaluate(el => window.getComputedStyle(el).fontSize);
        // Asserts the text and text style (actual vs expected)
        expect(add_to_cart_button_text).toBe('Add to cart')
        expect(add_to_cart_button_font_style).toBe('"DM Sans", sans-serif')
        expect(add_to_cart_button_font_color).toBe('rgb(19, 35, 34)');
        expect(add_to_cart_button_font_size).toBe('16px');
        // clicks the add to cart button to add the item to cart
        inventory.add_to_cart_item_by_index(i);
        // Extract the text and the text styles after clicking the add to cart button
        let remove_to_cart_button_text = await inventory.all_remove_to_cart_button.nth(i).innerText();
        let remove_to_cart_button_font_style = await inventory.all_remove_to_cart_button.nth(i).evaluate(el => window.getComputedStyle(el).fontFamily);
        let remove_to_cart_button_font_color = await inventory.all_remove_to_cart_button.nth(i).evaluate(el => window.getComputedStyle(el).color);
        let remove_to_cart_button_font_size = await inventory.all_remove_to_cart_button.nth(i).evaluate(el => window.getComputedStyle(el).fontSize);
        // Asserts the text and text style (actual vs expected)
        expect(remove_to_cart_button_text).toBe('Remove');
        expect(remove_to_cart_button_font_style).toBe('"DM Sans", sans-serif');
        expect(remove_to_cart_button_font_color).toBe('rgb(226, 35, 26)');
        expect(remove_to_cart_button_font_size).toBe('16px');
        await sleep(150);
    }
});
