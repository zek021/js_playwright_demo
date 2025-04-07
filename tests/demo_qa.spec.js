import { test, expect } from '@playwright/test';
import { getEnvVariable, sleep } from '../aux_function/aux_function';
import { HomePage } from '../pages/demo_qa_pages/home_page';
import { ElementsPage } from '../pages/demo_qa_pages/elements_page';

// Apply slowMo globally for all tests in this file (100ms delay)
test.use({
    launchOptions: {
        slowMo: 1000,  // Slows down every action by 100ms globally in all tests
    },
});

test.beforeEach(async ({ page }) => {
    globalThis.fe_url = getEnvVariable('DEMO_QA_URL');
    globalThis.demo_qa_user_1 = getEnvVariable('DEMO_QA_USER_1', true);
    //actions
    await page.goto(fe_url);
});

test('JIRA-003 : Verify Text Box Form Submit', async ({ page }) => {  
    const home_page = new HomePage(page)
    const elements_page = new ElementsPage(page)
    // clicks the elements card
    await home_page.elements_card.click();
    // concatenates the first name and last name
    let full_name = demo_qa_user_1['first_name'] + " " + demo_qa_user_1['last_name'];
    // fills up the form
    await elements_page.fill_up_text_box_form(full_name,demo_qa_user_1['email'],demo_qa_user_1['address'],demo_qa_user_1['address']);
    // compare posted record vs what you actual fill up
    expect(((await  elements_page.text_box_posted_name.innerText()).split(":"))[1]).toBe(full_name)
    expect(((await  elements_page.text_box_posted_email.innerText()).split(":"))[1]).toBe(demo_qa_user_1['email'])
    expect(((await  elements_page.text_box_posted_current_address.innerText()).split(":"))[1]).toBe(demo_qa_user_1['address'])
    expect(((await  elements_page.text_box_posted_permanent_address.innerText()).split(":"))[1]).toBe(demo_qa_user_1['address'])
});

