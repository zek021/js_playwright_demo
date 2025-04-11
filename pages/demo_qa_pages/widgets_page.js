import { sleep } from "../../aux_function/aux_function";

export class WidgetsPage {
    constructor(page) {
        this.page = page;
        // date 
        this.side_menu_widgets = page.locator('.element-group:nth-child(4) .icon');
        this.widgets_date_picker = page.locator('.left-pannel>.accordion>.element-group:nth-child(4)>div>.menu-list>#item-2');
        this.date_picker_text_box = page.locator('#datePickerMonthYearInput');
        // slider
        this.widgets_slider = page.locator('.left-pannel>.accordion>.element-group:nth-child(4)>div>.menu-list>#item-3');
        this.slider_slider_element = page.locator('.range-slider');

    }

    /**
     * Selects a specific date (month, day, and year) from a date picker widget on the page.
     * 
     * The method:
     * 1. Matches the input month string (at least 3 characters) to its corresponding month index.
     * 2. Selects the correct month and year using dropdown selectors.
     * 3. Finds the day in the date picker and clicks it.
     * @param {string} month - The month to select (e.g., 'Jan', 'January', 'sep'). Must be at least 3 characters.
     * @param {string|number} day - The day to select (e.g., '1', '21'). Compared as a string.
     * @param {string} year - The full year to select (e.g., '2025').
     * @throws Will throw an error if the month input is invalid or no matching month is found.
     */
    async date_selector(month, day, year) {
        if (month.length < 3) {
            throw new Error('Month input should be atleast 3 char');
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

    async set_slider_value(value) {
        await this.slider_slider_element.evaluate((el, value) => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(el, value);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
    }
}
