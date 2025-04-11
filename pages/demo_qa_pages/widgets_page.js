import { sleep } from "../../aux_function/aux_function";

export class WidgetsPage {
    constructor(page) {
        this.page = page;
        //browser windows side menu
        this.side_menu_widgets = page.locator('.element-group:nth-child(4) .icon');
        this.widgets_date_picker = page.locator('.left-pannel>.accordion>.element-group:nth-child(4)>div>.menu-list>#item-2');
        this.date_picker_text_box = page.locator('#datePickerMonthYearInput');

        this.browser_windows_new_window_message_button = page.locator('#messageWindowButton');
        // alerts
        this.alert_frames_windows_alerts = page.locator('.left-pannel>.accordion>.element-group:nth-child(3)>div>.menu-list>#item-1');
        this.alerts_alert_click_me = page.locator('#alertButton');
        this.alerts_timed_alert_click_me = page.locator('#timerAlertButton');
        this.alerts_confirmation_click_me = page.locator('#confirmButton');
        this.alerts_confirmation_result_message = page.locator('#confirmResult');
        this.alerts_prompt_click_me = page.locator('#promtButton');
        this.alerts_prompt_result_message = page.locator('#promptResult');

        // iframe
        this.alert_frames_windows_nested_iframes = page.locator('.left-pannel>.accordion>.element-group:nth-child(3)>div>.menu-list>#item-3');
        this.nested_iframe_parent_frame = page.frameLocator('#frame1');
        this.nested_iframe_child_frame = this.nested_iframe_parent_frame.frameLocator("iframe[srcdoc='<p>Child Iframe</p>']")
        this.nested_iframe_child_frame_element = this.nested_iframe_child_frame.locator('body>p');

        // modal
        this.alert_frames_windows_modal_dialog = page.locator('.left-pannel>.accordion>.element-group:nth-child(3)>div>.menu-list>#item-4');
        this.modal_dialog_click_small_modal = page.locator('#showSmallModal');
        this.small_modal_close_button = page.locator('#closeSmallModal');
        this.small_modal_text = page.locator('.modal-body');



    }

    async date_selector(month, day, year) {
        if (month.length < 3) {
            return "Month input should be at least 3 characters.";
        } else {
            const months = [
                'january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'
            ];

            const lowerInput = month.toLowerCase();
            let selectedIndex = -1;

            // Find the month index that matches the input
            for (let i = 0; i < months.length; i++) {
                if (months[i].startsWith(lowerInput)) {
                    selectedIndex = i;
                    break;
                }
            }
            if (selectedIndex === -1) {
                throw new Error('No month matching found. use the first 3 letter of the month or the whole month name');
            }
            // select by index
            await this.page.locator('.react-datepicker__month-select').selectOption({ index: selectedIndex });
        }
        await this.page.locator('.react-datepicker__year-select').selectOption({ value: year });
        const ref_day = await this.page.locator('.react-datepicker__week:nth-child(1)>.react-datepicker__day:nth-child(7)').innerText();
        if (day <= ref_day) {
            for (let i = 1; i < 8; i++) {
                var selected_day = await this.page.locator(`.react-datepicker__week:nth-child(1)>.react-datepicker__day:nth-child(${i})`).innerText();
                if (day === selected_day) {
                    await this.page.locator(`.react-datepicker__week:nth-child(1)>.react-datepicker__day:nth-child(${i})`).click();
                    break;
                }
            }
        } else { 
            let x=2;
            while(selected_day !== day) {
                for (let i = 1; i < 8; i++) {
                    selected_day = await this.page.locator(`.react-datepicker__week:nth-child(${x})>.react-datepicker__day:nth-child(${i})`).innerText();
                    if (day === selected_day) {
                        await this.page.locator(`.react-datepicker__week:nth-child(${x})>.react-datepicker__day:nth-child(${i})`).click();
                        break;
                    }   
                }
                x++;    
            }
        }
    }
}
