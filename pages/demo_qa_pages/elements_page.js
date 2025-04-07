import { sleep } from "../../aux_function/aux_function";

export class ElementsPage {
    constructor(page) {
        this.page = page;
        //textbox side menu
        this.side_menu_text_box = page.locator('.left-pannel>.accordion>.element-group:nth-child(1)>div>.menu-list>#item-0'); 
        this.text_box_full_name = page.locator('#userName'); 
        this.text_box_email = page.locator('#userEmail'); 
        this.text_box_current_address = page.locator('#currentAddress'); 
        this.text_box_permanent_address = page.locator('#permanentAddress'); 
        this.text_box_submit_button = page.locator('#submit'); 
        this.text_box_submit_button = page.locator('#submit'); 
        this.text_box_posted_name = page.locator('#name'); 
        this.text_box_posted_email = page.locator('#email'); 
        this.text_box_posted_current_address = page.locator('.mb-1#currentAddress'); 
        this.text_box_posted_permanent_address = page.locator('.mb-1#permanentAddress'); 


        this.side_menu_check_box = page.locator('#item-1');  
        this.side_menu_radio_button = page.locator('#item-2');  
        this.side_menu_web_tables = page.locator('#item-3');  
        this.side_menu_buttons = page.locator('#item-4');  
        this.side_menu_links = page.locator('#item-5');  
        this.side_menu_broken_link_images = page.locator('#item-6');  
        this.side_menu_upload_download = page.locator('#item-7');  
        this.side_menu_dynamic_properties = page.locator('#item-8');    
    }

    async fill_up_text_box_form(full_name,email,current_address,permanent_address){
        await this.page.waitForLoadState('domcontentloaded');
        await this.side_menu_text_box.waitFor({ state: 'visible' }); 
        await this.side_menu_text_box.click();
        await this.text_box_full_name.fill(full_name);
        await this.text_box_email.fill(email);
        await this.text_box_current_address.fill(current_address);
        await this.text_box_permanent_address.fill(permanent_address);
        await this.text_box_submit_button.click();
    }

}
