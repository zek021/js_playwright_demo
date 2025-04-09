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

   

}
