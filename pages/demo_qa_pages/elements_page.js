import { sleep } from "../../aux_function/aux_function";

export class ElementsPage {
    constructor(page) {
        this.page = page;
        //textbox side menu
        this.side_menu_elements = page.locator('.element-group:nth-child(1) .icon'); 
        this.elements_text_box = page.locator('.left-pannel>.accordion>.element-group:nth-child(1)>div>.menu-list>#item-0'); 
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
        // checkbox side menu
        this.elements_check_box = page.locator('.left-pannel>.accordion>.element-group:nth-child(1)>div>.menu-list>#item-1'); 
        this.check_box_home = page.locator('#tree-node>ol>li>.rct-text>label>.rct-checkbox'); 
        this.check_box_home_collapse = page.locator('#tree-node>ol>li>.rct-text>button'); 
        this.check_box_desktop = page.locator('li>ol>li:nth-child(1)>.rct-text>label>.rct-checkbox'); 
        this.check_box_desktop_collapse = page.locator('li>ol>li:nth-child(1)>.rct-text>button'); 
        this.check_box_documents = page.locator('li>ol>li:nth-child(2)>.rct-text>label>.rct-checkbox'); 
        this.check_box_documents_collapse = page.locator('li>ol>li:nth-child(2)>.rct-text>button'); 
        this.check_box_documents_work_space = page.locator('li>ol>li:nth-child(2)>ol>.rct-node:nth-child(1)>.rct-text>label>.rct-checkbox'); 
        this.check_box_documents_office = page.locator('li>ol>li:nth-child(2)>ol>.rct-node:nth-child(2)>.rct-text>label>.rct-checkbox');
        this.check_box_downloads = page.locator('li>ol>li:nth-child(3)>.rct-text>label>.rct-checkbox'); 
        this.check_box_downloads_collapse = page.locator('li>ol>li:nth-child(3)>.rct-text>button'); 
        this.check_box_downloads_word_file = page.locator('li>ol>li:nth-child(3)>ol>.rct-node:nth-child(1)>.rct-text>label>.rct-checkbox'); 
        this.check_box_downloads_excel_file = page.locator('li>ol>li:nth-child(3)>ol>.rct-node:nth-child(2)>.rct-text>label>.rct-checkbox'); 
        

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
        await this.elements_text_box.waitFor({ state: 'visible' }); 
        await this.elements_text_box.click();
        await this.text_box_full_name.fill(full_name);
        await this.text_box_email.fill(email);
        await this.text_box_current_address.fill(current_address);
        await this.text_box_permanent_address.fill(permanent_address);
        await this.text_box_submit_button.click();
    }

}
