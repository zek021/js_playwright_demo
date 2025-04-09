import { test, expect } from '@playwright/test';
import { getEnvVariable, sleep } from '../aux_function/aux_function';
import { HomePage } from '../pages/demo_qa_pages/home_page';
import { ElementsPage } from '../pages/demo_qa_pages/elements_page';
import { AlertsFramesWindowsPage } from '../pages/demo_qa_pages/alerts_frames_window_page';

// Apply slowMo globally for all tests in this file (100ms delay)
test.use({
    launchOptions: {
        slowMo: 100,  // Slows down every action by 100ms globally in all tests
    },
});

test.beforeEach(async ({ page }) => {
    globalThis.fe_url = getEnvVariable('DEMO_QA_URL');
    globalThis.demo_qa_user_1 = getEnvVariable('DEMO_QA_USER_1', true);
    //actions
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(fe_url);
});

test('JIRA-003 : Verify Text Box Form Submit @JIRA-003', async ({ page }) => {
    const home_page = new HomePage(page)
    const elements_page = new ElementsPage(page)
    // clicks the elements card
    await home_page.elements_card.click();
    // concatenates the first name and last name
    let full_name = demo_qa_user_1['first_name'] + " " + demo_qa_user_1['last_name'];
    // fills up the form
    await elements_page.fill_up_text_box_form(full_name, demo_qa_user_1['email'], demo_qa_user_1['address'], demo_qa_user_1['address']);
    // compare posted record vs what you actual fill up
    expect(((await elements_page.text_box_posted_name.innerText()).split(":"))[1]).toBe(full_name)
    expect(((await elements_page.text_box_posted_email.innerText()).split(":"))[1]).toBe(demo_qa_user_1['email'])
    expect(((await elements_page.text_box_posted_current_address.innerText()).split(":"))[1]).toBe(demo_qa_user_1['address'])
    expect(((await elements_page.text_box_posted_permanent_address.innerText()).split(":"))[1]).toBe(demo_qa_user_1['address'])
});

test('JIRA-004 : Verify Check Box @JIRA-004', async ({ page }) => {
    const home_page = new HomePage(page)
    const elements_page = new ElementsPage(page)
    // ticks check box
    await home_page.elements_card.click();
    await elements_page.elements_check_box.click();
    await elements_page.check_box_home.click();
    await elements_page.check_box_home_collapse.click();
    await elements_page.check_box_desktop.click();
    await elements_page.check_box_desktop_collapse.click();
    await elements_page.check_box_documents_collapse.click();
    await elements_page.check_box_downloads_collapse.click();
    await elements_page.check_box_downloads_excel_file.click();
    await elements_page.check_box_downloads_word_file.click();
    // checked that the status of the check box is checked
    expect((await elements_page.check_box_documents_office.isChecked())).toBeTruthy();
    expect((await elements_page.check_box_documents_work_space.isChecked())).toBeTruthy();
    // checked that the status of the check box is uncheked
    expect((await elements_page.check_box_downloads_excel_file.isChecked())).toBeFalsy();
    expect((await elements_page.check_box_downloads_word_file.isChecked())).toBeFalsy()

});

test('JIRA-005 : Browser Windows Handling @JIRA-005 @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_browser_windows.click();
    let [newtab] = await Promise.all([
        page.waitForEvent('popup'),
        alerts_frame_window.browser_windows_new_tab_button.click()
    ]);
    await newtab.setViewportSize({ width: 1920, height: 1080 });
    const newtab_text = await newtab.locator('#sampleHeading').innerText();
    expect(newtab_text).toBe('This is a sample page');
    await page.bringToFront();

    let [newwindow] = await Promise.all([
        page.waitForEvent('popup'),
        alerts_frame_window.browser_windows_new_window_button.click()
    ]);
    await newwindow.setViewportSize({ width: 1920, height: 1080 });
    const newwindow_text = await newwindow.locator('#sampleHeading').innerText();
    expect(newwindow_text).toBe('This is a sample page');
    await page.bringToFront();

    let [newwindowmessage] = await Promise.all([
        page.waitForEvent('popup'),
        alerts_frame_window.browser_windows_new_window_message_button.click()
    ]);
    await newwindowmessage.setViewportSize({ width: 1920, height: 1080 });
    const newwindowmessage_text = await newwindowmessage.locator('body').innerText();
    expect(newwindowmessage_text).toBe('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
    await newtab.close();
    await newwindow.close();
    await newwindowmessage.close();

});

test('JIRA-006 : Alert Handling @JIRA-006 @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_alerts.click();
    //  dialog box handler and assertion
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toBe('You clicked a button')
        await dialog.accept();
    })
    await alerts_frame_window.alerts_alert_click_me.click();
});

test('JIRA-007: Delayed Alert Handling @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_alerts.click();
    //  dialog box handler and assertion
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toBe('This alert appeared after 5 seconds')
        await dialog.accept();
    })
    await alerts_frame_window.alerts_timed_alert_click_me.click();
    await sleep(7000);
});

test('JIRA-008: Alert Confirmation Handling (Ok) @JIRA-008 @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_alerts.click();
    //  dialog box handler and assertion
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe('Do you confirm action?')
        await dialog.accept();
    })
    await alerts_frame_window.alerts_confirmation_click_me.click();
    let result_message = await alerts_frame_window.alerts_confirmation_result_message.innerText();
    expect(result_message).toBe('You selected Ok');
});

test('JIRA-008: Alert Confirmation Handling (Cancel) @JIRA-008 @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_alerts.click();
    //  dialog box handler and assertion
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe('Do you confirm action?')
        await dialog.dismiss();
    })
    await alerts_frame_window.alerts_confirmation_click_me.click();
    let result_message = await alerts_frame_window.alerts_confirmation_result_message.innerText();
    expect(result_message).toBe('You selected Cancel');
});

test('JIRA-009: Prompt Handling @JIRA-009 @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_alerts.click();
    //  dialog box handler and assertion
    let name = 'John Doe'
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt')
        expect(dialog.message()).toBe('Please enter your name')
        await dialog.accept(name);
    })
    await alerts_frame_window.alerts_prompt_click_me.click();
    let result_message = await alerts_frame_window.alerts_prompt_result_message.innerText();
    expect(result_message).toBe('You entered '+ name);
});

test('JIRA-010: Nested iFrame Handling @JIRA-010 @smoke', async ({ page }) => {
    const home_page = new HomePage(page);
    await home_page.alerts_frame_window_card.click();
    const alerts_frame_window = new AlertsFramesWindowsPage(page);
    await alerts_frame_window.alert_frames_windows_alerts.click();
    await alerts_frame_window.alert_frames_windows_nested_iframes.click();
    // handling iframe using page.frameLocator (This is implemented inside the POM)
    const message = await alerts_frame_window.nested_iframe_child_frame_element.innerText();
    expect(message).toBe('Child Iframe');
    
});
