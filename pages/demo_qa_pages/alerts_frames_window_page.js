import { sleep } from "../../aux_function/aux_function";

export class AlertsFramesWindowsPage {
    constructor(page) {
        this.page = page;
        //browser windows side menu
        this.side_menu_alert_frames_windows = page.locator('.element-group:nth-child(3) .icon'); 
        this.alert_frames_windows_browser_windows = page.locator('.left-pannel>.accordion>.element-group:nth-child(3)>div>.menu-list>#item-0'); 
        this.browser_windows_new_tab_button = page.locator('#tabButton'); 
        this.browser_windows_new_window_button = page.locator('#windowButton'); 
        this.browser_windows_new_window_message_button = page.locator('#messageWindowButton'); 
        // alerts
        this.alert_frames_windows_alerts = page.locator('.left-pannel>.accordion>.element-group:nth-child(3)>div>.menu-list>#item-1'); 
        this.alerts_alert_click_me = page.locator('#alertButton'); 
        this.alerts_timed_alert_click_me = page.locator('#timerAlertButton'); 
        this.alerts_confirmation_click_me = page.locator('#confirmButton'); 
        this.alerts_confirmation_result_message = page.locator('#confirmResult'); 
        this.alerts_prompt_click_me = page.locator('#promtButton'); 
        this.alerts_prompt_result_message = page.locator('#promptResult');


       
    }

   

}
